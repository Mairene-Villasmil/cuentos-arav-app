"use server";

import { prisma } from "@/lib/prisma";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!data.name || !data.email || !data.message) {
    return { error: "Completá todos los campos." };
  }

  await prisma.contactMessage.create({ data });

  return { success: true };
}
