"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import type { Book } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookForm } from "@/components/admin/book-form";

export function EditBookInlineButton({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" className="rounded-full" onClick={() => setOpen(true)}>
        <Pencil className="size-3.5" /> Editar libro
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar libro</DialogTitle>
        </DialogHeader>
        <BookForm book={book} onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
