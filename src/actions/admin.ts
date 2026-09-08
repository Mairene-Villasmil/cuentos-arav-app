"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (session?.user.role !== "admin") {
    throw new Error("No autorizado");
  }
  return session;
}

export type BookFormInput = {
  title: string;
  slug: string;
  description: string;
  collection?: string;
  ageRange?: string;
  standardEnabled: boolean;
  standardPrice?: number;
  customEnabled: boolean;
  customDepositOverride?: number;
  isNew: boolean;
  isSpecialEdition: boolean;
  coverImage?: string;
  previewImages?: string[];
};

export async function createBook(data: BookFormInput) {
  await requireAdmin();
  await prisma.book.create({
    data: {
      ...data,
      coverImage: data.coverImage || "/book-placeholder.svg",
      previewImages: data.previewImages?.length ? data.previewImages : ["/book-placeholder.svg"],
    },
  });
  revalidatePath("/admin/libros");
  revalidatePath("/libros");
}

export async function updateBook(id: string, data: BookFormInput) {
  await requireAdmin();
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) throw new Error("Libro no encontrado");

  await prisma.book.update({
    where: { id },
    data: {
      ...data,
      coverImage: data.coverImage || book.coverImage,
      previewImages: data.previewImages?.length ? data.previewImages : book.previewImages,
    },
  });
  revalidatePath("/admin/libros");
  revalidatePath("/libros");
  revalidatePath(`/libros/${data.slug}`);
}

export async function deleteBook(id: string) {
  await requireAdmin();
  await prisma.book.delete({ where: { id } });
  revalidatePath("/admin/libros");
  revalidatePath("/libros");
}

export async function markOrderPaid(id: string) {
  await requireAdmin();
  await prisma.order.update({ where: { id }, data: { paymentStatus: "paid" } });
  revalidatePath("/admin/pedidos");
}

export async function rejectOrderPayment(id: string) {
  await requireAdmin();
  await prisma.order.update({ where: { id }, data: { paymentStatus: "rejected" } });
  revalidatePath("/admin/pedidos");
}

export async function updateCustomRequestStatus(
  id: string,
  status:
    | "nuevo"
    | "en_charla"
    | "aprobado"
    | "en_produccion"
    | "listo"
    | "enviado"
    | "cerrado"
) {
  await requireAdmin();
  await prisma.customRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/solicitudes");
}

export async function updateStoreSettings(data: {
  id: string;
  customDepositDefault: number;
  supportEmail: string;
}) {
  await requireAdmin();
  await prisma.storeSettings.update({
    where: { id: data.id },
    data: {
      customDepositDefault: data.customDepositDefault,
      supportEmail: data.supportEmail,
    },
  });
  revalidatePath("/admin/configuracion");
}
