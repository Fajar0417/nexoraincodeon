"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type BlogFormState = {
  error?: string;
};

const blogSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh huruf kecil, angka, dan tanda -"),
  excerpt: z.string().optional(),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  tags: z.string().optional(),
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

  return { supabase, userId: user.id };
}

function parseTags(tags?: string) {
  return tags
    ? tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
}

export async function createBlogPost(
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const { supabase, userId } = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    cover_image_url: formData.get("cover_image_url"),
    tags: formData.get("tags"),
    status: formData.get("status"),
  };

  const parsed = blogSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const { error } = await supabase.from("blog_posts").insert({
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt || null,
    content: parsed.data.content,
    cover_image_url: parsed.data.cover_image_url || null,
    tags: parseTags(parsed.data.tags),
    status: parsed.data.status,
    author_id: userId,
    published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Slug sudah dipakai, coba slug lain." };
    }
    return { error: "Gagal menyimpan artikel. Coba lagi." };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const { supabase } = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    cover_image_url: formData.get("cover_image_url"),
    tags: formData.get("tags"),
    status: formData.get("status"),
  };

  const parsed = blogSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("published_at")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content,
      cover_image_url: parsed.data.cover_image_url || null,
      tags: parseTags(parsed.data.tags),
      status: parsed.data.status,
      published_at:
        parsed.data.status === "published"
          ? existing?.published_at ?? new Date().toISOString()
          : null,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "Slug sudah dipakai, coba slug lain." };
    }
    return { error: "Gagal menyimpan perubahan. Coba lagi." };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
