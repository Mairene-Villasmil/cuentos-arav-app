"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createPaymentLink } from "@/actions/payment";

export function PayButton({ orderId }: { orderId: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    const result = await createPaymentLink(orderId);
    setPending(false);

    if (result.success && result.url) {
      window.location.href = result.url;
      return;
    }

    if (result.error === "not_configured") {
      toast.error("El pago online todavía no está disponible. Te contactamos por WhatsApp.");
      return;
    }

    toast.error(result.error ?? "No se pudo iniciar el pago.");
  }

  return (
    <Button size="lg" className="rounded-full px-8" disabled={pending} onClick={handleClick}>
      {pending ? "Redirigiendo..." : "Pagar con Mercado Pago"}
    </Button>
  );
}
