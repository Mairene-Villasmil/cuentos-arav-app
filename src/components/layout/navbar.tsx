"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Session } from "next-auth";

const links = [
  { href: "/libros", label: "Libros" },
  { href: "/colecciones", label: "Colecciones" },
  { href: "/ediciones-especiales", label: "Ediciones especiales" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/como-personalizar", label: "Cómo personalizar" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-heading text-2xl font-semibold text-foreground">
          Cuentos <span className="text-primary">ARAV</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user.role === "admin" && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full text-primary"
              title="Panel admin"
            >
              <Link href="/admin" aria-label="Panel admin">
                <LayoutDashboard className="size-5" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild className="relative rounded-full">
            <Link href="/carrito" aria-label="Carrito">
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href={session ? "/mi-cuenta" : "/login"} aria-label="Mi cuenta">
              <User className="size-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menú"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/70 bg-background px-4 py-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {session?.user.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
            >
              Panel admin
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
