"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type PortfolioFormState = {
  error?: string;
};

const portfolioSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh huruf kecil, angka, dan tanda -"),
  category: z.string().min(2, "Kategori wajib diisi"),
  client_name: z.string().optional(),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  tech_stack: z.string().optional(),
  project_url: z.string().url().optional().or(z.literal("")),
  is_featured: z.boolean(),
  status: z.enum(["draft", "published"]),
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

export async function createPortfolio(
  _prevState: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  const supabase = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    client_name: formData.get("client_name"),
    description: formData.get("description"),
    cover_image_url: formData.get("cover_image_url"),
    tech_stack: formData.get("tech_stack"),
    project_url: formData.get("project_url"),
    is_featured: formData.get("is_featured") === "on",
    status: formData.get("status"),
  };

  const parsed = portfolioSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const techStack = parsed.data.tech_stack
    ? parsed.data.tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from("portfolios").insert({
    title: parsed.data.title,
    slug: parsed.data.slug,
    category: parsed.data.category,
    client_name: parsed.data.client_name || null,
    description: parsed.data.description,
    cover_image_url: parsed.data.cover_image_url || null,
    tech_stack: techStack,
    project_url: parsed.data.project_url || null,
    is_featured: parsed.data.is_featured,
    status: parsed.data.status,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Slug sudah dipakai, coba slug lain." };
    }
    return { error: "Gagal menyimpan portfolio. Coba lagi." };
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function updatePortfolio(
  id: string,
  _prevState: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  const supabase = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    client_name: formData.get("client_name"),
    description: formData.get("description"),
    cover_image_url: formData.get("cover_image_url"),
    tech_stack: formData.get("tech_stack"),
    project_url: formData.get("project_url"),
    is_featured: formData.get("is_featured") === "on",
    status: formData.get("status"),
  };

  const parsed = portfolioSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const techStack = parsed.data.tech_stack
    ? parsed.data.tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase
    .from("portfolios")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      category: parsed.data.category,
      client_name: parsed.data.client_name || null,
      description: parsed.data.description,
      cover_image_url: parsed.data.cover_image_url || null,
      tech_stack: techStack,
      project_url: parsed.data.project_url || null,
      is_featured: parsed.data.is_featured,
      status: parsed.data.status,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "Slug sudah dipakai, coba slug lain." };
    }
    return { error: "Gagal menyimpan perubahan. Coba lagi." };
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${parsed.data.slug}`);
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function deletePortfolio(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("portfolios").delete().eq("id", id);
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}
