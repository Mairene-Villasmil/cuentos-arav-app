import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [bookCount, pendingOrders, paidOrders, openRequests] = await Promise.all([
    prisma.book.count(),
    prisma.order.count({ where: { paymentStatus: { in: ["pending_payment", "under_review"] } } }),
    prisma.order.count({ where: { paymentStatus: "paid" } }),
    prisma.customRequest.count({ where: { status: { notIn: ["cerrado", "enviado"] } } }),
  ]);

  const stats = [
    { label: "Libros publicados", value: bookCount },
    { label: "Pedidos por confirmar", value: pendingOrders },
    { label: "Pedidos pagados", value: paidOrders },
    { label: "Personalizaciones abiertas", value: openRequests },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Panel</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-heading text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
