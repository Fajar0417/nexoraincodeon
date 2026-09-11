import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PricingForm, type PricingFormValues } from "../../pricing-form";
import { updatePricingPlan } from "../../actions";

export default async function EditPricingPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("pricing_plans")
    .select(
      "name, service_slug, description, price, price_label, duration_label, billing_type, features, extra_note, is_popular, sort_order, is_active"
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const boundUpdate = updatePricingPlan.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Edit paket harga
      </h1>
      <PricingForm
        action={boundUpdate}
        defaultValues={data as PricingFormValues}
        submitLabel="Simpan perubahan"
      />
    </div>
  );
}
