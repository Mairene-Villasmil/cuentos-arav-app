import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { DeleteUserButton } from "@/components/admin/delete-user-button";

export default async function AdminUsersPage() {
  const session = await auth();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Usuarios</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {users.length} cuenta{users.length !== 1 ? "s" : ""} registrada{users.length !== 1 ? "s" : ""}.
      </p>

      <div className="mt-6 space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{user.name || "Sin nombre"}</p>
                {user.role === "admin" && (
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">Admin</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                {user._count.orders} pedido{user._count.orders !== 1 ? "s" : ""} · desde{" "}
                {user.createdAt.toLocaleDateString("es-AR")}
              </p>
            </div>

            {user.id !== session?.user.id && (
              <DeleteUserButton id={user.id} email={user.email} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
