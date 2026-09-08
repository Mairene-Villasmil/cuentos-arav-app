"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/actions/password";

export function ChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await changePassword({
      currentPassword: String(formData.get("currentPassword")),
      newPassword: String(formData.get("newPassword")),
    });
    setPending(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    toast.success("Contraseña actualizada");
    (document.getElementById("change-password-form") as HTMLFormElement)?.reset();
  }

  return (
    <form id="change-password-form" action={handleSubmit} className="max-w-sm space-y-4">
      <div>
        <Label htmlFor="currentPassword">Contraseña actual</Label>
        <Input id="currentPassword" name="currentPassword" type="password" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="newPassword">Nueva contraseña</Label>
        <Input id="newPassword" name="newPassword" type="password" minLength={8} required className="mt-1" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={pending} variant="outline" className="rounded-full">
        {pending ? "Guardando..." : "Cambiar contraseña"}
      </Button>
    </form>
  );
}
