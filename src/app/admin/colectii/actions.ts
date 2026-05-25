"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveCollection(formData: FormData) {
  const supabase = await createClient();
  const id = (formData.get("id") as string) || undefined;

  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order")) || 0,
  };

  if (id) {
    const { error } = await supabase.from("collections").update(data).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("collections").insert(data);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin/colectii");
  revalidatePath("/produse");
  revalidatePath("/");
  redirect("/admin/colectii");
}

export async function deleteCollection(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/colectii");
  revalidatePath("/produse");
  redirect("/admin/colectii");
}
