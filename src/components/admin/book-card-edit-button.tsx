"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import type { Book } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookForm } from "@/components/admin/book-form";

export function BookCardEditButton({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label={`Editar ${book.title}`}
        className="flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <Pencil className="size-3.5" />
      </button>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Editar libro</DialogTitle>
        </DialogHeader>
        <BookForm book={book} onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
