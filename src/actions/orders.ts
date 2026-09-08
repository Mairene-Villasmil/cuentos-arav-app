"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendOrderNotificationToAdmin, sendOrderConfirmationToCustomer } from "@/lib/email";

type CartItemInput = {
  bookId: string;
  type: "standard" | "custom";
  quantity: number;
  unitPrice: number;
  customDraft?: string;
  referenceImages?: string[];
};

export async function createOrder(
  items: CartItemInput[]
): Promise<{ error: string } | { success: true; orderId: string }> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Necesitás iniciar sesión para completar el pedido." };
  }
  if (items.length === 0) {
    return { error: "Tu carrito está vacío." };
  }

  const total = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      items: {
        create: items.map((i) => ({
          bookId: i.bookId,
          type: i.type,
          quantity: i.quantity,
          unitPriceSnapshot: i.unitPrice,
          customDraft: i.customDraft,
          referenceImages: i.referenceImages ?? [],
        })),
      },
    },
    include: { items: { include: { book: true } } },
  });

  const customItems = items.filter((i) => i.type === "custom");
  if (customItems.length > 0) {
    await prisma.customRequest.createMany({
      data: customItems.map((i) => ({
        orderId: order.id,
        bookId: i.bookId,
        userId: session.user.id,
        depositPaid: i.unitPrice,
        personalization: i.customDraft ?? "",
        referenceImages: i.referenceImages ?? [],
      })),
    });
  }

  const settings = await prisma.storeSettings.findFirst();
  const customerEmail = session.user.email ?? "";

  await Promise.all([
    settings?.supportEmail
      ? sendOrderNotificationToAdmin({
          adminEmail: settings.supportEmail,
          orderId: order.id,
          customerEmail,
          total: order.total,
          items: order.items.map((i) => ({
            title: i.book.title,
            quantity: i.quantity,
            type: i.type,
          })),
        })
      : Promise.resolve(),
    customerEmail
      ? sendOrderConfirmationToCustomer({
          customerEmail,
          orderId: order.id,
          total: order.total,
        })
      : Promise.resolve(),
  ]);

  return { success: true, orderId: order.id };
}
