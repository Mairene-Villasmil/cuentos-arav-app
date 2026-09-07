import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { CreateBookForm } from "@/components/admin/create-book-form";
import { deleteBook } from "@/actions/admin";
import { Button } from "@/components/ui/button";

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Libros</h1>

      <div className="mt-6">
        <CreateBookForm />
      </div>

      <div className="mt-8 space-y-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
          >
            <div>
              <p className="font-medium">{book.title}</p>
              <p className="text-xs text-muted-foreground">
                {book.collection ?? "Sin colección"} ·{" "}
                {book.standardEnabled && book.standardPrice
                  ? formatPrice(book.standardPrice)
                  : "Sin precio estándar"}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteBook(book.id);
              }}
            >
              <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                Eliminar
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
