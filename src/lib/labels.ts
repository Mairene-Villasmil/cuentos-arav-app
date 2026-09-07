export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending_payment: "Pago pendiente",
  under_review: "En revisión",
  paid: "Pagado",
  rejected: "Rechazado",
};

export const CUSTOM_REQUEST_STATUSES = [
  "nuevo",
  "en_charla",
  "aprobado",
  "en_produccion",
  "listo",
  "enviado",
  "cerrado",
] as const;

export const CUSTOM_STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  en_charla: "En charla",
  aprobado: "Aprobado",
  en_produccion: "En producción",
  listo: "Listo",
  enviado: "Enviado",
  cerrado: "Cerrado",
};
