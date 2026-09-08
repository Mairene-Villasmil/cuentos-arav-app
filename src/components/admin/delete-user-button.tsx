"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions/admin";

export function DeleteUserButton({ id, email }: { id: string; email: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">¿Eliminar {email}?</span>
        <Button
          size="sm"
          variant="destructive"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const result = await deleteUser(id);
              if (result?.error) {
                toast.error(result.error);
                setConfirming(false);
                return;
              }
              toast.success("Usuario eliminado");
            })
          }
        >
          Confirmar
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
          Cancelar
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setConfirming(true)}>
      Eliminar
    </Button>
  );
}
