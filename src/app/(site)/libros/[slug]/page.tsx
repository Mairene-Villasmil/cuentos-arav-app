import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { AddToCartForm } from "@/components/site/add-to-cart-form";
import { EditBookInlineButton } from "@/components/admin/edit-book-inline-button";
import { FavoriteButton } from "@/components/site/favorite-button";
import { getFavoritedBookIds } from "@/lib/favorites";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await prisma.book.findUnique({ where: { slug } });
  if (!book) return {};

  return {
    title: `${book.title} — Cuentos ARAV`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.coverImage],
    },
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const book = await prisma.book.findUnique({ where: { slug } });

  if (!book) notFound();

  const favoritedIds = await getFavoritedBookIds(session?.user.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-sm">
            <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
            <div className="absolute right-3 top-3 z-10">
              <FavoriteButton bookId={book.id} initialFavorited={favoritedIds.has(book.id)} />
            </div>
          </div>

          {book.previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {book.previewImages.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
                >
                  <Image src={src} alt={`Preview ${i + 1}`} fill className="object-cover" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="rotate-[-20deg] text-xs font-semibold uppercase tracking-widest text-white/80">
                      Preview
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {book.isNew && <Badge className="bg-amarillo text-foreground hover:bg-amarillo">Nuevo</Badge>}
              {book.isSpecialEdition && (
                <Badge className="bg-menta text-accent-foreground hover:bg-menta">Edición especial</Badge>
              )}
              {book.collection && <Badge variant="outline">{book.collection}</Badge>}
            </div>
            {session?.user.role === "admin" && <EditBookInlineButton book={book} />}
          </div>

          <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            {book.title}
          </h1>
          {book.ageRange && (
            <p className="mt-1 text-sm text-muted-foreground">Edad recomendada: {book.ageRange}</p>
          )}

          <p className="mt-4 text-muted-foreground">{book.description}</p>

          <div className="mt-8">
            <AddToCartForm book={book} />
          </div>
        </div>
      </div>
    </div>
  );
}
