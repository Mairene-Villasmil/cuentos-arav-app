import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/libros",
    "/colecciones",
    "/ediciones-especiales",
    "/como-funciona",
    "/como-personalizar",
    "/sobre-nosotros",
    "/contacto",
    "/terminos-y-condiciones",
    "/privacidad",
    "/envios-y-cambios",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const books = await prisma.book.findMany({ select: { slug: true, createdAt: true } });
  const bookRoutes = books.map((book) => ({
    url: `${baseUrl}/libros/${book.slug}`,
    lastModified: book.createdAt,
  }));

  return [...staticRoutes, ...bookRoutes];
}
