import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones — Cuentos ARAV",
  description: "Condiciones de compra, personalización y uso del sitio de Cuentos ARAV.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Términos y condiciones</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última actualización: septiembre de 2026.</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">1. Sobre estos términos</h2>
          <p className="mt-2">
            Al comprar o personalizar un libro en Cuentos ARAV aceptás estas
            condiciones. Si tenés dudas antes de comprar, escribinos por{" "}
            <a href="/contacto" className="text-primary hover:underline">contacto</a> o WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">2. Productos estándar y personalizados</h2>
          <p className="mt-2">
            Los libros de edición estándar tienen precio fijo y se procesan
            directamente al confirmar el pago. Los libros personalizados
            requieren una seña para reservar el lugar en producción; el saldo
            y los detalles finales se coordinan por contacto directo
            (WhatsApp o email) antes de imprimir.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">3. Pagos</h2>
          <p className="mt-2">
            Aceptamos pago online a través de Mercado Pago y, según el caso,
            coordinación de pago por WhatsApp/transferencia. El pedido se
            considera confirmado una vez que el pago fue acreditado.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">4. Producción y previews</h2>
          <p className="mt-2">
            Para pedidos personalizados, te mostramos un preview antes de
            imprimir. Las modificaciones razonables sobre ese preview no
            tienen costo adicional; cambios sustanciales luego de aprobado el
            preview pueden implicar un cargo extra o demora en el plazo de entrega.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">5. Cancelaciones</h2>
          <p className="mt-2">
            Los pedidos estándar pueden cancelarse antes de iniciar el envío
            para reembolso completo. Las señas de pedidos personalizados no
            son reembolsables una vez que empezó el proceso de ilustración,
            salvo excepciones que evaluamos caso a caso.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">6. Propiedad de las ilustraciones</h2>
          <p className="mt-2">
            Las ilustraciones y el diseño de cada libro son propiedad de
            Cuentos ARAV. La compra de un libro personalizado no incluye
            derechos de reproducción o reventa de las ilustraciones.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">7. Contacto</h2>
          <p className="mt-2">
            Ante cualquier duda sobre estos términos, escribinos desde la
            página de <a href="/contacto" className="text-primary hover:underline">contacto</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
