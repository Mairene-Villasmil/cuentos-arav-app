"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/password";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!token) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Enlace inválido. Pedí uno nuevo desde{" "}
        <Link href="/recuperar-contrasena" className="text-primary hover:underline">
          recuperar contraseña
        </Link>
        .
      </p>
    );
  }

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const password = String(formData.get("password"));
    const result = await resetPassword(token, password);
    setPending(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    router.push("/login");
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="password">Nueva contraseña</Label>
        <Input id="password" name="password" type="password" minLength={8} required className="mt-1" />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={pending} className="w-full rounded-full">
        {pending ? "Guardando..." : "Guardar nueva contraseña"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold">Elegí una nueva contraseña</h1>
      <div className="mt-8">
        <Suspense>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
