"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductFormData = {
  slug: string;
  name: string;
  collection_id: string | null;
  price_mdl: number;
  origin: string | null;
  size: string | null;
  finish: string | null;
  description: string | null;
  in_stock: boolean;
  is_featured: boolean;
};

function parseForm(formData: FormData): ProductFormData & { id?: string } {
  return {
    id: (formData.get("id") as string) || undefined,
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    collection_id: (formData.get("collection_id") as string) || null,
    price_mdl: Number(formData.get("price_mdl")) || 0,
    origin: String(formData.get("origin") ?? "").trim() || null,
    size: String(formData.get("size") ?? "").trim() || null,
    finish: String(formData.get("finish") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    in_stock: formData.get("in_stock") === "on",
    is_featured: formData.get("is_featured") === "on",
  };
}

export async function saveProduct(formData: FormData) {
  const supabase = await createClient();
  const { id, ...data } = parseForm(formData);
  const imageFile = formData.get("image") as File | null;

  // Upload imagine daca exista
  let image_url: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${data.slug || crypto.randomUUID()}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filename, imageFile, { contentType: imageFile.type, upsert: false });

    if (uploadError) {
      return { ok: false, message: `Eroare upload: ${uploadError.message}` };
    }

    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(filename);
    image_url = pub.publicUrl;
  }

  const payload = { ...data, ...(image_url ? { image_url } : {}) };

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin/produse");
  revalidatePath("/produse");
  revalidatePath("/");
  redirect("/admin/produse");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/produse");
  revalidatePath("/produse");
  revalidatePath("/");
  redirect("/admin/produse");
}
