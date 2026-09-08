import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { PAYMENT_STATUS_LABELS } from "@/lib/labels";
import { PayButton } from "@/components/site/pay-button";

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/login?redirect=/pedido/${id}`);

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { book: true } } },
  });

  if (!order) notFound();
  if (order.userId !== session.user.id && session.user.role !== "admin") notFound();

  const statusMeta = {
    paid: { icon: CheckCircle2, color: "text-menta", title: "¡Pago confirmado!" },
    under_review: { icon: Clock, color: "text-amarillo", title: "Estamos confirmando tu pago" },
    pending_payment: { icon: Clock, color: "text-muted-foreground", title: "Pago pendiente" },
    rejected: { icon: XCircle, color: "text-destructive", title: "El pago no se pudo procesar" },
  }[order.paymentStatus];

  const Icon = statusMeta.icon;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <Icon className={`mx-auto size-14 ${statusMeta.color}`} />
      <h1 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
        {statusMeta.title}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pedido #{order.id} · {PAYMENT_STATUS_LABELS[order.paymentStatus]}
      </p>

      <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6 text-left shadow-sm">
        <ul className="space-y-1 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.book.title} × {item.quantity}</span>
              <span>{formatPrice(item.unitPriceSnapshot * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border/70 pt-3 font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Si el pago quedó pendiente o hay algún problema, te contactamos por WhatsApp.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {(order.paymentStatus === "pending_payment" || order.paymentStatus === "rejected") && (
          <PayButton orderId={order.id} />
        )}
        <Button asChild size="lg" variant="outline" className="rounded-full px-8">
          <Link href="/mi-cuenta">Ir a mi cuenta</Link>
        </Button>
      </div>
    </div>
  );
}
