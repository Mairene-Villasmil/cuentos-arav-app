import type { Metadata } from "next";
import { Sparkles, Palette, MessageCircle, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo funciona — Cuentos ARAV",
  description: "Desde elegir el cuento hasta recibirlo en tu casa: así es el camino de una compra en Cuentos ARAV.",
};

const steps = [
  {
    icon: Sparkles,
    title: "1. Elegí un cuento",
    text: "Recorré el catálogo y encontrá la historia ideal según la edad e intereses de tu hijo.",
  },
  {
    icon: Palette,
    title: "2. Decidí el formato",
    text: "Podés comprar la edición estándar con pago directo, o pedir una versión personalizada.",
  },
  {
    icon: MessageCircle,
    title: "3. Conversemos los detalles",
    text: "Si elegís personalizado, te contactamos para definir nombre, apariencia y pequeños detalles de la historia.",
  },
  {
    icon: Truck,
    title: "4. Producción y envío",
    text: "Ilustramos, imprimimos y te enviamos el libro. Vas a poder seguir el estado de tu pedido desde tu cuenta.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Cómo funciona</h1>
      <p className="mt-2 text-muted-foreground">
        Desde elegir el cuento hasta recibirlo en tu casa, así es el camino en Cuentos ARAV.
      </p>

      <div className="mt-10 space-y-6">
        {steps.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
