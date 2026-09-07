"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type State = { error?: string; success?: boolean };

async function action(_prev: State, formData: FormData): Promise<State> {
  return sendContactMessage({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  if (state.success) {
    return (
      <div className="rounded-3xl border border-menta bg-menta/20 p-6 text-center">
        <p className="font-heading text-lg font-semibold">¡Gracias por escribirnos!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Recibimos tu mensaje y te vamos a responder a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="message">Contanos qué estás buscando</Label>
        <Textarea id="message" name="message" required rows={5} className="mt-1" />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="rounded-full px-8">
        {pending ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
