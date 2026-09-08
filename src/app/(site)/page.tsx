import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getFavoritedBookIds } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/site/book-card";
import { FavoriteButton } from "@/components/site/favorite-button";
import { formatPrice } from "@/lib/format";
import { Sparkles, Palette, Truck } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  const [spotlight, featured, collections] = await Promise.all([
    prisma.book.findFirst({ where: { isFeatured: true } }),
    prisma.book.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.book.findMany({
      where: { collection: { not: null } },
      distinct: ["collection"],
      select: { collection: true },
    }),
  ]);

  const spotlightBook = spotlight ?? featured[0] ?? null;
  const favoritedIds = await getFavoritedBookIds(session?.user.id);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-celeste/50 blur-3xl" />
        <div className="absolute -right-16 top-40 size-64 rounded-full bg-menta/50 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
          <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Cuentos donde tu hijo es el{" "}
            <span className="italic text-primary">protagonista</span>
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground sm:text-lg">
            Libros infantiles con estética alegre y acuarela, personalizables
            con el nombre y la historia de cada niño. Premium, confiables y
            llenos de magia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/libros">Ver catálogo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="/como-personalizar">Cómo personalizar</Link>
            </Button>
          </div>
        </div>
      </section>

      {spotlightBook && (
        <section className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href={`/libros/${spotlightBook.slug}`}
            className="group grid gap-0 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-lg sm:grid-cols-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto">
              <Image
                src={spotlightBook.coverImage}
                alt={spotlightBook.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3 z-10">
                <FavoriteButton
                  bookId={spotlightBook.id}
                  initialFavorited={favoritedIds.has(spotlightBook.id)}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 p-8 sm:p-12">
              <span className="w-fit rounded-full bg-amarillo/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                Destacado de la semana
              </span>
              <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                {spotlightBook.title}
              </h2>
              <p className="text-muted-foreground">{spotlightBook.description}</p>
              {spotlightBook.standardEnabled && spotlightBook.standardPrice && (
                <span className="font-heading text-xl font-semibold text-primary">
                  {formatPrice(spotlightBook.standardPrice)}
                </span>
              )}
              <span className="mt-2 w-fit text-sm font-medium text-primary group-hover:underline">
                Ver libro →
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Elegí el cuento",
              text: "Explorá nuestro catálogo de historias en acuarela para cada edad.",
            },
            {
              icon: Palette,
              title: "Personalizalo",
              text: "Contanos el nombre, la edad y los detalles que hacen único a tu hijo.",
            },
            {
              icon: Truck,
              title: "Recibilo en casa",
              text: "Preparamos e imprimimos tu edición y te la enviamos con cuidado.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
              Recién llegados
            </h2>
            <Link href="/libros" className="text-sm font-medium text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isAdmin={isAdmin}
                isFavorited={favoritedIds.has(book.id)}
              />
            ))}
          </div>
        </section>
      )}

      {collections.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">
            Colecciones
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-primary/90 to-primary p-10 text-center text-primary-foreground shadow-lg sm:p-16">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            ¿Querés un cuento único para tu hijo?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-primary-foreground/90">
            Contanos su historia y armamos una edición personalizada, ilustrada
            especialmente para él o ella.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 rounded-full px-8">
            <Link href="/contacto">Empezar personalización</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
