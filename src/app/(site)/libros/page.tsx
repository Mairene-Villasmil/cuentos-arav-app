import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { BookCard } from "@/components/site/book-card";
import { CatalogFilters } from "@/components/site/catalog-filters";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ coleccion?: string; edad?: string; tipo?: string }>;
}) {
  const { coleccion, edad, tipo } = await searchParams;
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  const where: Prisma.BookWhereInput = {};
  if (coleccion) where.collection = coleccion;
  if (edad) where.ageRange = edad;
  if (tipo === "standard") where.standardEnabled = true;
  if (tipo === "custom") where.customEnabled = true;

  const [books, collectionRows, ageRows] = await Promise.all([
    prisma.book.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.book.findMany({
      where: { collection: { not: null } },
      distinct: ["collection"],
      select: { collection: true },
    }),
    prisma.book.findMany({
      where: { ageRange: { not: null } },
      distinct: ["ageRange"],
      select: { ageRange: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Nuestros libros</h1>
        <p className="mt-2 text-muted-foreground">
          Historias en acuarela para cada etapa. Elegí una edición estándar o
          personalizala con el nombre de tu hijo.
        </p>
      </div>

      <div className="mb-8">
        <CatalogFilters
          action="/libros"
          current={{ collection: coleccion, ageRange: edad, type: tipo }}
          collections={collectionRows
            .map((c) => c.collection)
            .filter((c): c is string => Boolean(c))}
          ageRanges={ageRows
            .map((a) => a.ageRange)
            .filter((a): a is string => Boolean(a))}
        />
      </div>

      {books.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No encontramos libros con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
