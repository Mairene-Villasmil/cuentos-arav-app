"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/actions/password";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    await requestPasswordReset(String(formData.get("email")));
    setPending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12 text-center">
        <h1 className="font-heading text-2xl font-semibold">Revisá tu email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Si existe una cuenta con ese email, te enviamos un enlace para
          restablecer tu contraseña. Puede tardar unos minutos en llegar.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold">Recuperar contraseña</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Ingresá tu email y te mandamos un enlace para elegir una nueva contraseña.
      </p>

      <form action={handleSubmit} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="mt-1" />
        </div>
        <Button type="submit" disabled={pending} className="w-full rounded-full">
          {pending ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Volver a iniciar sesión
        </Link>
      </p>
    </div>
  );
}
