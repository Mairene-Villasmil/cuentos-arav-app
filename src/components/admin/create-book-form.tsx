"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createBook } from "@/actions/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CreateBookForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const title = String(formData.get("title") ?? "");
    try {
      await createBook({
        title,
        slug: slugify(title),
        description: String(formData.get("description") ?? ""),
        collection: String(formData.get("collection") ?? "") || undefined,
        ageRange: String(formData.get("ageRange") ?? "") || undefined,
        standardEnabled: formData.get("standardEnabled") === "on",
        standardPrice: formData.get("standardPrice")
          ? Number(formData.get("standardPrice"))
          : undefined,
        customEnabled: formData.get("customEnabled") === "on",
        customDepositOverride: formData.get("customDepositOverride")
          ? Number(formData.get("customDepositOverride"))
          : undefined,
        isNew: formData.get("isNew") === "on",
        isSpecialEdition: formData.get("isSpecialEdition") === "on",
      });
      toast.success("Libro creado");
      router.refresh();
    } catch {
      toast.error("No se pudo crear el libro");
    }
    setPending(false);
  }

  return (
    <form action={handleSubmit} className="grid gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" required className="mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" required rows={3} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="collection">Colección</Label>
        <Input id="collection" name="collection" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="ageRange">Edad recomendada</Label>
        <Input id="ageRange" name="ageRange" placeholder="3-6 años" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="standardPrice">Precio estándar</Label>
        <Input id="standardPrice" name="standardPrice" type="number" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="customDepositOverride">Seña personalizado</Label>
        <Input id="customDepositOverride" name="customDepositOverride" type="number" className="mt-1" />
      </div>

      <div className="flex flex-wrap gap-4 sm:col-span-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="standardEnabled" /> Habilitar estándar
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="customEnabled" /> Habilitar personalizado
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isNew" /> Marcar como nuevo
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isSpecialEdition" /> Edición especial
        </label>
      </div>

      <Button type="submit" disabled={pending} className="rounded-full sm:col-span-2 sm:w-fit">
        {pending ? "Creando..." : "Crear libro"}
      </Button>
    </form>
  );
}
