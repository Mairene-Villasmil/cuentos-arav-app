import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { PAYMENT_STATUS_LABELS } from "@/lib/labels";
import { markOrderPaid, rejectOrderPayment } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { book: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Pedidos</h1>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{order.user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {order.createdAt.toLocaleString("es-AR")}
                </p>
              </div>
              <Badge variant="outline">{PAYMENT_STATUS_LABELS[order.paymentStatus]}</Badge>
            </div>

            <ul className="mt-3 space-y-1 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.book.title} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.unitPriceSnapshot * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
              <span className="font-semibold">Total: {formatPrice(order.total)}</span>
              {order.paymentStatus !== "paid" && order.paymentStatus !== "rejected" && (
                <div className="flex gap-2">
                  <form action={async () => { "use server"; await rejectOrderPayment(order.id); }}>
                    <Button type="submit" size="sm" variant="outline">Rechazar</Button>
                  </form>
                  <form action={async () => { "use server"; await markOrderPaid(order.id); }}>
                    <Button type="submit" size="sm">Marcar pagado</Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-sm text-muted-foreground">Todavía no hay pedidos.</p>
        )}
      </div>
    </div>
  );
}
