import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePricingPlan } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { services } from "@/lib/data/services";

type PricingRow = {
  id: string;
  name: string;
  service_slug: string | null;
  price: number | null;
  price_label: string | null;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
};

async function getAllPlans(): Promise<PricingRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pricing_plans")
    .select("id, name, service_slug, price, price_label, is_popular, is_active, sort_order")
    .order("service_slug", { ascending: true })
    .order("sort_order", { ascending: true });

  return (data as PricingRow[]) ?? [];
}

function serviceTitle(slug: string | null) {
  return services.find((s) => s.slug === slug)?.title ?? "—";
}

export default async function AdminPricingPage() {
  const plans = await getAllPlans();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink-fg">Pricing</h1>
        <Link
          href="/admin/pricing/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
        >
          + Tambah paket
        </Link>
      </div>

      {plans.length === 0 ? (
        <p className="mt-8 text-sm text-ink-fg-muted">Belum ada paket harga.</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-line bg-ink-panel text-ink-fg-muted">
                <th className="px-4 py-3 font-normal">Nama</th>
                <th className="px-4 py-3 font-normal">Layanan</th>
                <th className="px-4 py-3 font-normal">Harga</th>
                <th className="px-4 py-3 font-normal">Populer</th>
                <th className="px-4 py-3 font-normal">Aktif</th>
                <th className="px-4 py-3 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-ink-line last:border-0">
                  <td className="px-4 py-3 text-ink-fg">{plan.name}</td>
                  <td className="px-4 py-3 text-ink-fg-muted">{serviceTitle(plan.service_slug)}</td>
                  <td className="px-4 py-3 text-ink-fg-muted">
                    {plan.price != null
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(plan.price)
                      : (plan.price_label ?? "custom")}
                  </td>
                  <td className="px-4 py-3 text-ink-fg-muted">{plan.is_popular ? "Ya" : "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        plan.is_active
                          ? "bg-accent/20 text-accent"
                          : "bg-ink-panel-raised text-ink-fg-muted"
                      }`}
                    >
                      {plan.is_active ? "aktif" : "nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/pricing/${plan.id}/edit`}
                        className="text-xs text-ink-fg-muted hover:text-ink-fg"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deletePricingPlan(plan.id);
                        }}
                      >
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
