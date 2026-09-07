import { ContactForm } from "@/components/site/contact-form";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Contacto</h1>
      <p className="mt-2 text-muted-foreground">
        ¿Tenés dudas sobre un pedido o querés armar un libro personalizado?
        Escribinos y te respondemos pronto.
      </p>
      <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
