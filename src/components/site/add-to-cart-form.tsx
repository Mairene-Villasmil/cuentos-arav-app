"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Book } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export function AddToCartForm({ book }: { book: Book }) {
  const [type, setType] = useState<"standard" | "custom">(
    book.standardEnabled ? "standard" : "custom"
  );
  const [customDraft, setCustomDraft] = useState("");
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const depositPrice = book.customDepositOverride ?? 5000;
  const price = type === "standard" ? book.standardPrice ?? 0 : depositPrice;

  function handleAdd() {
    if (type === "custom" && !customDraft.trim()) {
      toast.error("Contanos algún detalle para personalizar el libro.");
      return;
    }

    addItem({
      bookId: book.id,
      slug: book.slug,
      title: book.title,
      coverImage: book.coverImage,
      type,
      quantity: 1,
      unitPrice: price,
      customDraft: type === "custom" ? customDraft : undefined,
    });

    toast.success("Agregado al carrito");
    router.refresh();
  }

  return (
    <div className="space-y-5 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
      {book.standardEnabled && book.customEnabled && (
        <div className="flex gap-2 rounded-full bg-muted p-1">
          <button
            type="button"
            onClick={() => setType("standard")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              type === "standard" ? "bg-primary text-primary-foreground" : "text-foreground/70"
            }`}
          >
            Estándar
          </button>
          <button
            type="button"
            onClick={() => setType("custom")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              type === "custom" ? "bg-primary text-primary-foreground" : "text-foreground/70"
            }`}
          >
            Personalizado
          </button>
        </div>
      )}

      {type === "custom" && (
        <div>
          <Label htmlFor="customDraft">Contanos sobre el protagonista</Label>
          <Textarea
            id="customDraft"
            value={customDraft}
            onChange={(e) => setCustomDraft(e.target.value)}
            placeholder="Nombre, edad, algo especial que quieras incluir en la historia..."
            rows={4}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Este monto es una seña. Coordinamos el resto por contacto directo.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="font-heading text-2xl font-semibold">
          {formatPrice(price)}
        </span>
        <Button size="lg" className="rounded-full px-8" onClick={handleAdd}>
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}
