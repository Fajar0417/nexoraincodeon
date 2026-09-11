import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortfolioForm, type PortfolioFormValues } from "../../portfolio-form";
import { updatePortfolio } from "../../actions";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("portfolios")
    .select(
      "title, slug, category, client_name, description, cover_image_url, tech_stack, project_url, is_featured, status"
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const boundUpdate = updatePortfolio.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Edit portfolio
      </h1>
      <p className="mt-2 text-sm text-ink-fg-muted">
        Ubah detail project ini. Kosongkan slug lama kalau mau ganti URL-nya.
      </p>
      <PortfolioForm
        action={boundUpdate}
        defaultValues={data as PortfolioFormValues}
        submitLabel="Simpan perubahan"
      />
    </div>
  );
}
