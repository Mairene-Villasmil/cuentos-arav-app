import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const UPLOADS_BUCKET = "uploads";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Falta configurar SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno."
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
