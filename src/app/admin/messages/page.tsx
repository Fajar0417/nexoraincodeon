import { createClient } from "@/lib/supabase/server";
import { deleteMessage } from "./actions";
import { StatusSelect } from "./status-select";
import { DeleteButton } from "@/components/admin/delete-button";

type MessageRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  service_interest: string | null;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

async function getMessages(): Promise<MessageRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("consultation_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as MessageRow[]) ?? [];
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Pesan konsultasi
      </h1>
      <p className="mt-2 text-sm text-ink-fg-muted">
        {messages.filter((m) => m.status === "new").length} pesan baru belum ditindaklanjuti.
      </p>

      {messages.length === 0 ? (
        <p className="mt-8 text-sm text-ink-fg-muted">Belum ada pesan masuk.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-lg border border-ink-line bg-ink-panel/60 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-base font-semibold text-ink-fg">
                    {msg.name}
                  </p>
                  <p className="text-xs text-ink-fg-muted">
                    {msg.email}
                    {msg.phone ? ` · ${msg.phone}` : ""}
                    {msg.company_name ? ` · ${msg.company_name}` : ""}
                  </p>
                  {msg.service_interest && (
                    <p className="font-label mt-1 text-xs text-accent">
                      {msg.service_interest}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <StatusSelect id={msg.id} status={msg.status} />
                  <form
                    action={async () => {
                      "use server";
                      await deleteMessage(msg.id);
                    }}
                  >
                    <DeleteButton />
                  </form>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-fg-muted">{msg.message}</p>
              <p className="font-label mt-3 text-[11px] text-ink-fg-muted">
                {new Date(msg.created_at).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
