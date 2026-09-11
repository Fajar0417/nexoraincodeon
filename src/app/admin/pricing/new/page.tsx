import { PricingForm } from "../pricing-form";
import { createPricingPlan } from "../actions";

export default function NewPricingPlanPage() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Tambah paket harga
      </h1>
      <p className="mt-2 text-sm text-ink-fg-muted">
        Pilih layanan yang sesuai, lalu aktifkan paket supaya langsung tampil di halaman pricing.
      </p>
      <PricingForm action={createPricingPlan} submitLabel="Simpan paket" />
    </div>
  );
}
