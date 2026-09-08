import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logout } from "@/actions/session";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?redirect=/admin");
  if (session.user.role !== "admin") redirect("/");

  const [pendingOrders, openRequests] = await Promise.all([
    prisma.order.count({ where: { paymentStatus: { in: ["pending_payment", "under_review"] } } }),
    prisma.customRequest.count({ where: { status: { notIn: ["cerrado", "enviado"] } } }),
  ]);

  const links = [
    { href: "/admin", label: "Panel" },
    { href: "/admin/libros", label: "Libros" },
    { href: "/admin/pedidos", label: "Pedidos", count: pendingOrders },
    { href: "/admin/solicitudes", label: "Personalizaciones", count: openRequests },
    { href: "/admin/usuarios", label: "Usuarios" },
    { href: "/admin/configuracion", label: "Configuración" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border/70 bg-muted/40 p-5 sm:flex">
        <Link href="/" className="font-heading text-lg font-semibold">
          Cuentos <span className="text-primary">ARAV</span>
        </Link>
        <span className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">Admin</span>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-background hover:text-primary"
            >
              {link.label}
              {!!link.count && (
                <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                  {link.count}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm" className="w-full justify-start">
            Cerrar sesión
          </Button>
        </form>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
