import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookForm } from "@/components/admin/book-form";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Editar libro</h1>
      <div className="mt-6">
        <BookForm book={book} />
      </div>
    </div>
  );
}
