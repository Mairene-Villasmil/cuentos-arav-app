import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const heading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuentos ARAV — Libros infantiles personalizados",
  description:
    "Libros infantiles ilustrados en acuarela, personalizados para que tu hijo sea el protagonista de su propia aventura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
