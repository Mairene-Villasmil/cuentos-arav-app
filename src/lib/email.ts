import { Resend } from "resend";
import { formatPrice } from "./format";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.EMAIL_FROM ?? "Cuentos ARAV <onboarding@resend.dev>";

async function send(params: { to: string; subject: string; html: string }) {
  if (!resend) {
    console.warn("RESEND_API_KEY no configurada; email no enviado:", params.subject);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, ...params });
  } catch (error) {
    console.error("Error enviando email", error);
  }
}

function layout(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; background:#FFFAF2; padding:32px;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #EFE1CD;">
        <h1 style="color:#3A2E2A;font-size:20px;margin:0 0 16px;">${title}</h1>
        <div style="color:#3A2E2A;font-size:14px;line-height:1.6;">${body}</div>
        <p style="margin-top:24px;color:#8A7D70;font-size:12px;">Cuentos ARAV</p>
      </div>
    </div>
  `;
}

export async function sendOrderNotificationToAdmin(params: {
  adminEmail: string;
  orderId: string;
  customerEmail: string;
  total: number;
  items: { title: string; quantity: number; type: string }[];
}) {
  const itemsHtml = params.items
    .map((i) => `<li>${i.title} × ${i.quantity} (${i.type === "standard" ? "estándar" : "personalizado"})</li>`)
    .join("");

  await send({
    to: params.adminEmail,
    subject: `Nuevo pedido de ${params.customerEmail}`,
    html: layout(
      "Nuevo pedido recibido",
      `<p>Cliente: ${params.customerEmail}</p>
       <ul>${itemsHtml}</ul>
       <p><strong>Total: ${formatPrice(params.total)}</strong></p>
       <p>Pedido #${params.orderId}</p>`
    ),
  });
}

export async function sendOrderConfirmationToCustomer(params: {
  customerEmail: string;
  orderId: string;
  total: number;
}) {
  await send({
    to: params.customerEmail,
    subject: "Confirmamos tu pedido en Cuentos ARAV",
    html: layout(
      "¡Gracias por tu pedido!",
      `<p>Recibimos tu pedido #${params.orderId} por un total de <strong>${formatPrice(params.total)}</strong>.</p>
       <p>Te vamos a contactar por WhatsApp para coordinar el pago y, si corresponde, los detalles de personalización.</p>`
    ),
  });
}

export async function sendPasswordResetEmail(params: { to: string; resetUrl: string }) {
  await send({
    to: params.to,
    subject: "Recuperar contraseña — Cuentos ARAV",
    html: layout(
      "Recuperar tu contraseña",
      `<p>Hacé clic en el siguiente enlace para elegir una nueva contraseña. El enlace vence en 1 hora.</p>
       <p><a href="${params.resetUrl}" style="color:#FF8A76;">Restablecer contraseña</a></p>
       <p>Si no pediste esto, podés ignorar este email.</p>`
    ),
  });
}
