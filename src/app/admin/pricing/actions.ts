"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type PricingFormState = {
  error?: string;
};

const pricingSchema = z.object({
  name: z.string().min(2, "Nama paket wajib diisi"),
  service_slug: z.string().min(1, "Pilih layanan untuk paket ini"),
  description: z.string().optional(),
  price: z.string().optional(),
  price_label: z.string().optional(),
  duration_label: z.string().optional(),
  billing_type: z.enum(["one-time", "monthly", "custom"]),
  features: z.string().min(3, "Isi minimal satu fitur"),
  extra_note: z.string().optional(),
  is_popular: z.boolean(),
  sort_order: z.string().optional(),
  is_active: z.boolean(),
});

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) redirect("/admin/login");

  return supabase;
}

function parseFeatures(value: string) {
  return value
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}

function buildPayload(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    service_slug: formData.get("service_slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    price_label: formData.get("price_label"),
    duration_label: formData.get("duration_label"),
    billing_type: formData.get("billing_type"),
    features: formData.get("features"),
    extra_note: formData.get("extra_note"),
    is_popular: formData.get("is_popular") === "on",
    sort_order: formData.get("sort_order"),
    is_active: formData.get("is_active") === "on",
  };

  const parsed = pricingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." } as const;
  }

  const price = parsed.data.price ? Number(parsed.data.price) : null;
  if (parsed.data.price && Number.isNaN(price)) {
    return { error: "Harga harus berupa angka." } as const;
  }

  return {
    data: {
      name: parsed.data.name,
      service_slug: parsed.data.service_slug,
      description: parsed.data.description || null,
      price,
      price_label: parsed.data.price_label || null,
      duration_label: parsed.data.duration_label || "/tahun",
      billing_type: parsed.data.billing_type,
      features: parseFeatures(parsed.data.features),
      extra_note: parsed.data.extra_note || null,
      is_popular: parsed.data.is_popular,
      sort_order: parsed.data.sort_order ? Number(parsed.data.sort_order) : 0,
      is_active: parsed.data.is_active,
    },
  } as const;
}

export async function createPricingPlan(
  _prevState: PricingFormState,
  formData: FormData
): Promise<PricingFormState> {
  const supabase = await requireAdmin();
  const result = buildPayload(formData);

  if ("error" in result) return { error: result.error };

  const { error } = await supabase.from("pricing_plans").insert(result.data);

  if (error) return { error: "Gagal menyimpan paket harga. Coba lagi." };

  revalidatePath("/pricing");
  revalidatePath("/admin/pricing");
  redirect("/admin/pricing");
}

export async function updatePricingPlan(
  id: string,
  _prevState: PricingFormState,
  formData: FormData
): Promise<PricingFormState> {
  const supabase = await requireAdmin();
  const result = buildPayload(formData);

  if ("error" in result) return { error: result.error };

  const { error } = await supabase
    .from("pricing_plans")
    .update(result.data)
    .eq("id", id);

  if (error) return { error: "Gagal menyimpan perubahan. Coba lagi." };

  revalidatePath("/pricing");
  revalidatePath("/admin/pricing");
  redirect("/admin/pricing");
}

export async function deletePricingPlan(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("pricing_plans").delete().eq("id", id);
  revalidatePath("/pricing");
  revalidatePath("/admin/pricing");
}
