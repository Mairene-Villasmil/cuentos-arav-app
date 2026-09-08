import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — Cuentos ARAV",
  description: "Cómo tratamos tus datos personales en Cuentos ARAV.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Política de privacidad</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última actualización: septiembre de 2026.</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">1. Qué datos recolectamos</h2>
          <p className="mt-2">
            Cuando creás una cuenta o hacés un pedido guardamos tu nombre,
            email y el historial de pedidos y personalizaciones asociado a tu
            cuenta. Si nos escribís por el formulario de contacto, guardamos
            el mensaje, tu nombre y tu email.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">2. Fotos de referencia</h2>
          <p className="mt-2">
            En los pedidos personalizados podés subir fotos de referencia
            para ayudarnos con la ilustración. Esas fotos se usan
            exclusivamente para producir tu pedido y no se comparten con
            terceros ni se usan con otro fin.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">3. Para qué usamos tus datos</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Procesar tu pedido y coordinar la personalización.</li>
            <li>Enviarte confirmaciones y novedades sobre tu pedido.</li>
            <li>Contactarte por WhatsApp o email ante consultas.</li>
          </ul>
          <p className="mt-2">
            No vendemos ni compartimos tus datos personales con terceros con
            fines comerciales.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">4. Dónde se almacenan los datos</h2>
          <p className="mt-2">
            Tus datos se almacenan en servicios de terceros con estándares de
            seguridad de la industria: base de datos (Supabase), envío de
            emails transaccionales (Resend) y procesamiento de pagos
            (Mercado Pago). Ninguno de ellos usa tus datos con fines propios
            de marketing.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">5. Tus derechos</h2>
          <p className="mt-2">
            Podés pedirnos en cualquier momento que eliminemos tu cuenta y
            tus datos personales escribiéndonos por{" "}
            <a href="/contacto" className="text-primary hover:underline">contacto</a>. Vamos a
            conservar los registros de pedidos que la ley exija por temas
            impositivos o contables.
          </p>
        </section>
      </div>
    </div>
  );
}
