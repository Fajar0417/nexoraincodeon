"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type ContactFormState = {
  error?: string;
  success?: boolean;
};

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  company_name: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, "Ceritakan kebutuhan kamu minimal 10 karakter"),
});

export async function submitConsultation(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company_name: formData.get("company_name"),
    service_interest: formData.get("service_interest"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("consultation_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    company_name: parsed.data.company_name || null,
    service_interest: parsed.data.service_interest || null,
    message: parsed.data.message,
  });

  if (error) {
    return { error: "Gagal mengirim pesan. Coba lagi beberapa saat." };
  }

  return { success: true };
}
