"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { toggleFavorite } from "@/actions/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  bookId,
  initialFavorited,
  className,
}: {
  bookId: string;
  initialFavorited: boolean;
  className?: string;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    setFavorited((f) => !f);
    startTransition(async () => {
      const result = await toggleFavorite(bookId);
      if ("error" in result) {
        setFavorited((f) => !f);
        toast.error("Necesitás iniciar sesión para guardar favoritos.");
        router.push("/login");
        return;
      }
      setFavorited(result.favorited);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:text-primary",
        className
      )}
    >
      <Heart className={cn("size-4", favorited && "fill-primary text-primary")} />
    </button>
  );
}
