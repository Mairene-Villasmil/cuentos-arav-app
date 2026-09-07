"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CUSTOM_REQUEST_STATUSES, CUSTOM_STATUS_LABELS } from "@/lib/labels";
import { updateCustomRequestStatus } from "@/actions/admin";
import type { CustomRequestStatus } from "@prisma/client";

export function CustomRequestStatusSelect({
  id,
  status,
}: {
  id: string;
  status: CustomRequestStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const value = e.target.value as CustomRequestStatus;
        startTransition(async () => {
          await updateCustomRequestStatus(id, value);
          toast.success("Estado actualizado");
        });
      }}
      className="rounded-xl border border-border bg-background px-3 py-1.5 text-sm"
    >
      {CUSTOM_REQUEST_STATUSES.map((s) => (
        <option key={s} value={s}>
          {CUSTOM_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
