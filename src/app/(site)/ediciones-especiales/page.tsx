import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/site/book-card";

export const metadata: Metadata = {
  title: "Ediciones especiales — Cuentos ARAV",
  description: "Tiradas limitadas con ilustraciones exclusivas y materiales premium, perfectas para regalar.",
};

export default async function SpecialEditionsPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  const books = await prisma.book.findMany({
    where: { isSpecialEdition: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Ediciones especiales</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Tiradas limitadas con ilustraciones exclusivas y materiales premium.
        Perfectas para regalar un cuento inolvidable.
      </p>

      {books.length === 0 ? (
        <p className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Muy pronto vamos a sumar nuevas ediciones especiales.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
