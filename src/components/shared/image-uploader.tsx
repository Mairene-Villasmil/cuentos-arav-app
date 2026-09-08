"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, X, Upload } from "lucide-react";
import { uploadImage } from "@/actions/upload";
import { Label } from "@/components/ui/label";

type Props = {
  name?: string;
  label: string;
  defaultValue?: string | string[];
  multiple?: boolean;
  onChange?: (urls: string[]) => void;
};

export function ImageUploader({ name, label, defaultValue, multiple = false, onChange }: Props) {
  const [urls, setUrls] = useState<string[]>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImage(formData);
      if (result.error) {
        toast.error(result.error);
        continue;
      }
      if (result.url) uploaded.push(result.url);
    }

    setUrls((prev) => {
      const next = multiple ? [...prev, ...uploaded] : uploaded.slice(0, 1);
      onChange?.(next);
      return next;
    });
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(index: number) {
    setUrls((prev) => {
      const next = prev.filter((_, i) => i !== index);
      onChange?.(next);
      return next;
    });
  }

  return (
    <div>
      <Label>{label}</Label>
      {name && <input type="hidden" name={name} value={urls.join(",")} />}

      <div className="mt-1 flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div key={url + i} className="relative size-20 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white"
              aria-label="Quitar imagen"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        {(multiple || urls.length === 0) && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex size-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
          >
            {uploading ? <Loader2 className="size-5 animate-spin" /> : <Upload className="size-5" />}
            <span className="text-[10px]">{uploading ? "Subiendo..." : "Subir"}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
