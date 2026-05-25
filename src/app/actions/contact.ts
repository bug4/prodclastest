"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FormResult = { ok: boolean; message: string };

export async function submitContact(formData: FormData): Promise<FormResult> {
  const supabase = await createClient();

  const data = {
    source: "contact",
    first_name: String(formData.get("first_name") ?? "").trim() || null,
    last_name: String(formData.get("last_name") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    subject: String(formData.get("subject") ?? "").trim() || null,
    message: String(formData.get("message") ?? "").trim() || null,
  };

  if (!data.email && !data.phone) {
    return { ok: false, message: "Lasă-ne cel puțin un email sau un telefon." };
  }

  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) {
    console.error("submitContact", error);
    return { ok: false, message: "A apărut o eroare. Încearcă din nou sau sună-ne direct." };
  }

  revalidatePath("/admin/inbox");
  return { ok: true, message: "Mesaj trimis. Revenim în 24h." };
}

export async function submitArchitectApplication(formData: FormData): Promise<FormResult> {
  const supabase = await createClient();

  const studio = String(formData.get("studio") ?? "").trim();
  const data = {
    source: "architect",
    first_name: studio || null,
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    message: String(formData.get("project") ?? "").trim() || null,
    metadata: { studio_name: studio },
  };

  if (!data.email) {
    return { ok: false, message: "Email-ul este obligatoriu." };
  }

  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) {
    console.error("submitArchitectApplication", error);
    return { ok: false, message: "Eroare la trimitere. Încearcă din nou." };
  }

  revalidatePath("/admin/inbox");
  return { ok: true, message: "Aplicație trimisă. Te contactăm în 24h." };
}

export async function submitNewsletter(formData: FormData): Promise<FormResult> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !email.includes("@")) {
    return { ok: false, message: "Email invalid." };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    source: "newsletter",
    email,
  });

  if (error) {
    console.error("submitNewsletter", error);
    return { ok: false, message: "Eroare. Încearcă din nou." };
  }

  return { ok: true, message: "Mulțumim! Te-ai abonat cu succes." };
}
