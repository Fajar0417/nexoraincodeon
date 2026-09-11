"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

export async function updateMessageStatus(id: string, status: "new" | "contacted" | "closed") {
  const supabase = await requireAdmin();
  await supabase.from("consultation_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("consultation_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
