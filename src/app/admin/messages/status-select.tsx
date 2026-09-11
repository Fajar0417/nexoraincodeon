"use client";

import { useTransition } from "react";
import { updateMessageStatus } from "./actions";

type Props = {
  id: string;
  status: "new" | "contacted" | "closed";
};

export function StatusSelect({ id, status }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const value = e.target.value as "new" | "contacted" | "closed";
        startTransition(() => {
          updateMessageStatus(id, value);
        });
      }}
      className="rounded-md border border-ink-line bg-ink-panel px-2 py-1 text-xs text-ink-fg outline-none focus:border-accent"
    >
      <option value="new">Baru</option>
      <option value="contacted">Sudah dihubungi</option>
      <option value="closed">Selesai</option>
    </select>
  );
}
