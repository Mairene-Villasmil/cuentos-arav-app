import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { PAYMENT_STATUS_LABELS, CUSTOM_STATUS_LABELS } from "@/lib/labels";
import { logout } from "@/actions/session";

export default async function MyAccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?redirect=/mi-cuenta");

  const [orders, customRequests] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { book: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.customRequest.findMany({
      where: { userId: session.user.id },
      include: { book: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Mi cuenta</h1>
          <p className="mt-1 text-muted-foreground">{session.user.email}</p>
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline" className="rounded-full">
            Cerrar sesión
          </Button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Tus pedidos</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Todavía no hiciste ningún pedido.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    Pedido del {order.createdAt.toLocaleDateString("es-AR")}
                  </span>
                  <Badge variant="outline">{PAYMENT_STATUS_LABELS[order.paymentStatus]}</Badge>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.book.title} × {item.quantity}{" "}
                        <span className="text-muted-foreground">
                          ({item.type === "standard" ? "estándar" : "personalizado"})
                        </span>
                      </span>
                      <span>{formatPrice(item.unitPriceSnapshot * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-end border-t border-border/70 pt-3 font-semibold">
                  Total: {formatPrice(order.total)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">Tus personalizaciones</h2>
        {customRequests.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No tenés solicitudes de personalización activas.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {customRequests.map((req) => (
              <div key={req.id} className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{req.book.title}</span>
                  <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">
                    {CUSTOM_STATUS_LABELS[req.status]}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{req.personalization}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
