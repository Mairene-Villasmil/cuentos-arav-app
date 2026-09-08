"use server";

import { randomUUID } from "crypto";
import { auth } from "@/auth";
import { supabaseAdmin, UPLOADS_BUCKET } from "@/lib/supabase-admin";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export async function uploadImage(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Necesitás iniciar sesión." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No se recibió ningún archivo." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "La imagen no puede pesar más de 5MB." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Formato no soportado. Usá PNG, JPG, WEBP o GIF." };
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${session.user.id}/${randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(UPLOADS_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) {
    console.error("Error subiendo imagen", error);
    return { error: "No se pudo subir la imagen. Intentá de nuevo." };
  }

  const { data } = supabaseAdmin.storage.from(UPLOADS_BUCKET).getPublicUrl(path);

  return { success: true, url: data.publicUrl };
}
