import { supabaseAdmin, UPLOADS_BUCKET } from "../src/lib/supabase-admin";

async function main() {
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) throw listError;

  if (buckets.some((b) => b.name === UPLOADS_BUCKET)) {
    console.log(`Bucket "${UPLOADS_BUCKET}" ya existe.`);
    return;
  }

  const { error } = await supabaseAdmin.storage.createBucket(UPLOADS_BUCKET, {
    public: true,
    fileSizeLimit: "5MB",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
  });
  if (error) throw error;

  console.log(`Bucket "${UPLOADS_BUCKET}" creado.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
