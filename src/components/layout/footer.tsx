import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-xl font-semibold">
            Cuentos <span className="text-primary">ARAV</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Libros infantiles ilustrados en acuarela, con historias que
            hacen que cada niño sea el protagonista.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/libros" className="hover:text-primary">Catálogo</Link></li>
            <li><Link href="/colecciones" className="hover:text-primary">Colecciones</Link></li>
            <li><Link href="/ediciones-especiales" className="hover:text-primary">Ediciones especiales</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Ayuda</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/como-funciona" className="hover:text-primary">Cómo funciona</Link></li>
            <li><Link href="/como-personalizar" className="hover:text-primary">Cómo personalizar</Link></li>
            <li><Link href="/contacto" className="hover:text-primary">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Nosotros</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/sobre-nosotros" className="hover:text-primary">Sobre nosotros</Link></li>
            <li><Link href="/mi-cuenta" className="hover:text-primary">Mi cuenta</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Cuentos ARAV. Hecho con cariño para pequeños soñadores.
      </div>
    </footer>
  );
}
