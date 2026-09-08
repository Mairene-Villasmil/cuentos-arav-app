const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function WhatsappButton() {
  if (!WHATSAPP_NUMBER) return null;

  const message = encodeURIComponent(
    "¡Hola! Quiero consultar por un libro de Cuentos ARAV."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.23 0 4.32.87 5.9 2.45a8.23 8.23 0 0 1 2.43 5.85c0 4.57-3.72 8.29-8.3 8.29a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.22 8.22 0 0 1-1.27-4.4c0-4.58 3.72-8.3 8.25-8.3ZM8.53 6.9c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.17 1.75 2.78 4.31 3.79 2.13.84 2.56.67 3.03.63.46-.04 1.5-.61 1.71-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3-.25-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.13-.17.25-.65.82-.8 1-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.4-.79-1.91-.2-.5-.41-.43-.57-.44Z" />
      </svg>
    </a>
  );
}
