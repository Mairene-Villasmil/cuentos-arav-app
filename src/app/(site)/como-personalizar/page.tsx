import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cómo personalizar — Cuentos ARAV",
  description: "Qué se puede personalizar en cada libro y cómo es el proceso, paso a paso.",
};

export default function HowToCustomizePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Cómo personalizar</h1>
      <p className="mt-2 text-muted-foreground">
        Cada libro personalizado se arma a mano, con atención a cada detalle
        que nos cuentes.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold">¿Qué podés personalizar?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Nombre y edad del protagonista</li>
            <li>Color de piel, ojos y cabello</li>
            <li>Un objeto o mascota especial que aparezca en la historia</li>
            <li>Una dedicatoria al final del libro</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold">¿Cómo es el proceso?</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Elegís un libro habilitado para personalización</li>
            <li>Dejás una seña para reservar tu lugar en producción</li>
            <li>Nos escribís los detalles de personalización</li>
            <li>Te mostramos un preview antes de imprimir</li>
          </ol>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-br from-primary/90 to-primary p-8 text-center text-primary-foreground shadow-lg">
        <h2 className="font-heading text-xl font-semibold">¿Lista para empezar?</h2>
        <p className="mt-1 text-primary-foreground/90">
          Elegí un libro personalizable del catálogo y contanos su historia.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-5 rounded-full px-8">
          <Link href="/libros">Ver libros personalizables</Link>
        </Button>
      </div>
    </div>
  );
}
