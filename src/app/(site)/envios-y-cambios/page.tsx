import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos y cambios — Cuentos ARAV",
  description: "Tiempos de producción, envío y política de cambios de Cuentos ARAV.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Envíos y cambios</h1>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">Tiempos de producción</h2>
          <p className="mt-2">
            Los libros de edición estándar se despachan dentro de los 3 a 5
            días hábiles de confirmado el pago. Los libros personalizados
            tienen un tiempo de producción estimado que te confirmamos por
            WhatsApp una vez definidos los detalles de la personalización
            (generalmente entre 1 y 3 semanas, según la demanda).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">Envío</h2>
          <p className="mt-2">
            Coordinamos el envío por correo o mensajería según tu ubicación,
            y te pasamos el código de seguimiento cuando esté disponible. El
            costo de envío se informa antes de confirmar el pedido.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">Cambios y devoluciones</h2>
          <p className="mt-2">
            Si tu libro estándar llega dañado o con un error de impresión, te
            lo cambiamos sin cargo dentro de los 10 días de recibido —
            escribinos con fotos del problema.
          </p>
          <p className="mt-2">
            Los libros personalizados están hechos a medida, así que no
            aplican cambios por arrepentimiento, solo por errores de
            producción atribuibles a nosotros.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">¿Alguna duda?</h2>
          <p className="mt-2">
            Escribinos desde <a href="/contacto" className="text-primary hover:underline">contacto</a> o
            por WhatsApp y te ayudamos con cualquier problema con tu pedido.
          </p>
        </section>
      </div>
    </div>
  );
}
