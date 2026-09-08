"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { createOrder } from "@/actions/orders";
import { createPaymentLink } from "@/actions/payment";

export default function CartPage() {
  const [hydrated, setHydrated] = useState(false);
  const { items, removeItem, updateQuantity, clear } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => setHydrated(true), []);

  const total = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  async function handleCheckout() {
    setSubmitting(true);
    const result = await createOrder(
      items.map((i) => ({
        bookId: i.bookId,
        type: i.type,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        customDraft: i.customDraft,
        referenceImages: i.referenceImages,
      }))
    );

    if ("error" in result) {
      setSubmitting(false);
      toast.error(result.error);
      if (result.error.includes("iniciar sesión")) {
        router.push("/login?redirect=/carrito");
      }
      return;
    }

    const paymentLink = await createPaymentLink(result.orderId);
    setSubmitting(false);
    clear();

    if (paymentLink.success && paymentLink.url) {
      window.location.href = paymentLink.url;
      return;
    }

    toast.success("¡Pedido confirmado! Te contactamos por WhatsApp para coordinar el pago.");
    router.push(`/pedido/${result.orderId}`);
  }

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">
          Explorá el catálogo y encontrá el cuento perfecto.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full px-8">
          <Link href="/libros">Ver catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Tu carrito</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.bookId}-${item.type}`}
            className="flex gap-4 rounded-3xl border border-border/70 bg-card p-4 shadow-sm"
          >
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
              <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link href={`/libros/${item.slug}`} className="font-heading font-semibold hover:text-primary">
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {item.type === "standard" ? "Edición estándar" : "Personalizado (seña)"}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.bookId, item.type)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Quitar del carrito"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                {item.type === "standard" ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.bookId, item.type, Math.max(1, item.quantity - 1))
                      }
                      className="flex size-7 items-center justify-center rounded-full border border-border"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.bookId, item.type, item.quantity + 1)}
                      className="flex size-7 items-center justify-center rounded-full border border-border"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">Cantidad: 1</span>
                )}
                <span className="font-semibold">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-heading text-2xl font-semibold">{formatPrice(total)}</p>
        </div>
        <Button size="lg" className="rounded-full px-8" disabled={submitting} onClick={handleCheckout}>
          {submitting ? "Procesando..." : "Confirmar pedido"}
        </Button>
      </div>
    </div>
  );
}
