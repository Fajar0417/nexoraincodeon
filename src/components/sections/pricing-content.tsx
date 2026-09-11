import { createClient } from "@/lib/supabase/server";
import { PricingTabs, type PlanCard } from "@/app/(public)/pricing/pricing-tabs";

type PricingRow = PlanCard & { service_slug: string | null };

async function getPricingPlans(): Promise<PricingRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pricing_plans")
      .select(
        "id, name, service_slug, description, price, price_label, duration_label, features, extra_note, is_popular, sort_order"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as PricingRow[];
  } catch {
    return [];
  }
}

export async function PricingContent() {
  const plans = await getPricingPlans();

  const plansByService: Record<string, PlanCard[]> = {};
  for (const plan of plans) {
    if (!plan.service_slug) continue;
    if (!plansByService[plan.service_slug]) plansByService[plan.service_slug] = [];
    plansByService[plan.service_slug].push(plan);
  }

  return (
    <>
      <section className="blueprint-grid border-b border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-label text-sm text-accent">harga</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
            Paket yang jelas, tanpa biaya tersembunyi.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-fg-muted">
            Pilih layanan yang kamu butuhkan, lalu bandingkan paketnya —
            titik awal diskusi, bukan harga mati.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <PricingTabs plansByService={plansByService} />
      </section>
    </>
  );
}
