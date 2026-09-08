"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { mpPreference, isMercadoPagoConfigured, isMercadoPagoTestMode } from "@/lib/mercadopago";

export async function createPaymentLink(orderId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Necesitás iniciar sesión." };

  if (!isMercadoPagoConfigured || !mpPreference) {
    return { error: "not_configured" as const };
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { book: true } } },
  });

  if (!order || order.userId !== session.user.id) {
    return { error: "Pedido no encontrado." };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const preference = await mpPreference.create({
      body: {
        items: order.items.map((item) => ({
          id: item.id,
          title: `${item.book.title} (${item.type === "standard" ? "estándar" : "personalizado"})`,
          quantity: item.quantity,
          unit_price: item.unitPriceSnapshot,
          currency_id: "ARS",
        })),
        external_reference: order.id,
        back_urls: {
          success: `${baseUrl}/pedido/${order.id}?estado=exito`,
          failure: `${baseUrl}/pedido/${order.id}?estado=fallo`,
          pending: `${baseUrl}/pedido/${order.id}?estado=pendiente`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { preferenceId: preference.id, paymentStatus: "under_review" },
    });

    const url = isMercadoPagoTestMode ? preference.sandbox_init_point : preference.init_point;

    return { success: true, url };
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago", error);
    return { error: "No se pudo iniciar el pago. Intentá de nuevo." };
  }
}
