import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mpPayment } from "@/lib/mercadopago";

function extractPaymentId(req: NextRequest, body: unknown): string | null {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("data.id") || url.searchParams.get("id");
  if (fromQuery) return fromQuery;

  if (body && typeof body === "object" && "data" in body) {
    const data = (body as { data?: { id?: string } }).data;
    if (data?.id) return String(data.id);
  }
  return null;
}

function mapStatus(mpStatus: string | undefined) {
  switch (mpStatus) {
    case "approved":
      return "paid" as const;
    case "rejected":
    case "cancelled":
      return "rejected" as const;
    default:
      return "under_review" as const;
  }
}

export async function POST(req: NextRequest) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // algunos webhooks llegan sin body, solo con query params
  }

  const paymentId = extractPaymentId(req, body);

  if (!paymentId || !mpPayment) {
    return NextResponse.json({ received: true });
  }

  try {
    const payment = await mpPayment.get({ id: paymentId });
    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ received: true });

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: mapStatus(payment.status),
        mercadoPagoId: String(payment.id),
      },
    });
  } catch (error) {
    console.error("Error procesando webhook de Mercado Pago", error);
  }

  return NextResponse.json({ received: true });
}
