import { prisma } from "@/lib/prisma";
import { StoreSettingsForm } from "@/components/admin/store-settings-form";

export default async function AdminSettingsPage() {
  let settings = await prisma.storeSettings.findFirst();
  if (!settings) {
    settings = await prisma.storeSettings.create({
      data: { customDepositDefault: 5000, supportEmail: "hola@cuentosarav.com" },
    });
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Configuración</h1>
      <div className="mt-6">
        <StoreSettingsForm
          id={settings.id}
          customDepositDefault={settings.customDepositDefault}
          supportEmail={settings.supportEmail}
        />
      </div>
    </div>
  );
}
