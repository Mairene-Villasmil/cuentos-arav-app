"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateStoreSettings } from "@/actions/admin";

export function StoreSettingsForm({
  id,
  customDepositDefault,
  supportEmail,
  mercadoPagoFeePercent,
}: {
  id: string;
  customDepositDefault: number;
  supportEmail: string;
  mercadoPagoFeePercent: number;
}) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    await updateStoreSettings({
      id,
      customDepositDefault: Number(formData.get("customDepositDefault")),
      supportEmail: String(formData.get("supportEmail")),
      mercadoPagoFeePercent: Number(formData.get("mercadoPagoFeePercent")),
    });
    setPending(false);
    toast.success("Configuración actualizada");
  }

  return (
    <form action={handleSubmit} className="max-w-md space-y-4 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
      <div>
        <Label htmlFor="customDepositDefault">Seña por defecto (personalizados)</Label>
        <Input
          id="customDepositDefault"
          name="customDepositDefault"
          type="number"
          defaultValue={customDepositDefault}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="supportEmail">Email de soporte</Label>
        <Input
          id="supportEmail"
          name="supportEmail"
          type="email"
          defaultValue={supportEmail}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="mercadoPagoFeePercent">Comisión de Mercado Pago (%)</Label>
        <Input
          id="mercadoPagoFeePercent"
          name="mercadoPagoFeePercent"
          type="number"
          step="0.01"
          defaultValue={mercadoPagoFeePercent}
          className="mt-1"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Fijate el % real en tu cuenta de Mercado Pago (&ldquo;Tu negocio&rdquo; → &ldquo;Costos&rdquo;).
          Se usa solo para estimar cuánto te queda neto al cargar un libro.
        </p>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  );
}
