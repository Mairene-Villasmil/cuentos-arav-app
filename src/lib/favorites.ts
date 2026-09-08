import { prisma } from "@/lib/prisma";

export async function getFavoritedBookIds(userId: string | undefined) {
  if (!userId) return new Set<string>();

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { bookId: true },
  });

  return new Set(favorites.map((f) => f.bookId));
}
