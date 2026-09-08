import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

export const isMercadoPagoConfigured = !!accessToken;

const client = accessToken ? new MercadoPagoConfig({ accessToken }) : null;

export const mpPreference = client ? new Preference(client) : null;
export const mpPayment = client ? new Payment(client) : null;

export const isMercadoPagoTestMode = accessToken?.startsWith("TEST-") ?? true;
