import Link from "next/link";
import Image from "next/image";
import type { Book } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/libros/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {book.isNew && (
            <Badge className="bg-amarillo text-foreground hover:bg-amarillo">Nuevo</Badge>
          )}
          {book.isSpecialEdition && (
            <Badge className="bg-menta text-accent-foreground hover:bg-menta">Edición especial</Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {book.collection && (
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {book.collection}
          </p>
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {book.title}
        </h3>
        {book.ageRange && (
          <p className="text-xs text-muted-foreground">{book.ageRange}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          {book.standardEnabled && book.standardPrice ? (
            <span className="font-semibold text-foreground">
              {formatPrice(book.standardPrice)}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Solo personalizado</span>
          )}
          {book.customEnabled && (
            <span className="text-xs font-medium text-secondary-foreground">
              Personalizable
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
