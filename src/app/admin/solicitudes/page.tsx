import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CustomRequestStatusSelect } from "@/components/admin/custom-request-status-select";

export default async function AdminCustomRequestsPage() {
  const requests = await prisma.customRequest.findMany({
    include: { book: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Personalizaciones</h1>

      <div className="mt-6 space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{req.book.title}</p>
                <p className="text-xs text-muted-foreground">{req.user.email}</p>
              </div>
              <CustomRequestStatusSelect id={req.id} status={req.status} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{req.personalization}</p>
            {req.referenceImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {req.referenceImages.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative size-16 overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <Image src={src} alt={`Referencia ${i + 1}`} fill className="object-cover" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-sm text-muted-foreground">No hay solicitudes de personalización.</p>
        )}
      </div>
    </div>
  );
}
