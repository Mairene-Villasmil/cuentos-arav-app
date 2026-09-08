import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/site/book-card";
import { getFavoritedBookIds } from "@/lib/favorites";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colecciones — Cuentos ARAV",
  description: "Historias agrupadas por tema, para encontrar la aventura perfecta según los intereses de cada niño.",
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ nombre?: string }>;
}) {
  const { nombre } = await searchParams;
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  if (nombre) {
    const books = await prisma.book.findMany({
      where: { collection: nombre },
      orderBy: { createdAt: "desc" },
    });
    const favoritedIds = await getFavoritedBookIds(session?.user.id);

    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link href="/colecciones" className="text-sm text-primary hover:underline">
          ← Todas las colecciones
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">{nombre}</h1>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isAdmin={isAdmin}
              isFavorited={favoritedIds.has(book.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  const collections = await prisma.book.findMany({
    where: { collection: { not: null } },
    distinct: ["collection"],
    select: { collection: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Colecciones</h1>
      <p className="mt-2 text-muted-foreground">
        Historias agrupadas por tema, para encontrar la aventura perfecta.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map(({ collection }) => (
          <Link
            key={collection}
            href={`/colecciones?nombre=${encodeURIComponent(collection ?? "")}`}
            className="group flex items-center justify-between rounded-3xl border border-border/70 bg-gradient-to-br from-secondary/40 via-card to-accent/30 p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <span className="font-heading text-lg font-semibold">{collection}</span>
            <span className="text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Ver →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
