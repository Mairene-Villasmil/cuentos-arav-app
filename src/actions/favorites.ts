"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function toggleFavorite(bookId: string) {
  const session = await auth();
  if (!session?.user) return { error: "login_required" as const };

  const existing = await prisma.favorite.findUnique({
    where: { userId_bookId: { userId: session.user.id, bookId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
  } else {
    await prisma.favorite.create({ data: { userId: session.user.id, bookId } });
  }

  revalidatePath("/mi-cuenta");
  return { success: true, favorited: !existing };
}
