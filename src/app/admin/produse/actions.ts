"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function uploadImage(file: File, slug: string): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${slug || "product"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(filename, file, { contentType: file.type });
  if (error) return { ok: false, message: error.message };
  const { data: pub } = supabase.storage.from("product-images").getPublicUrl(filename);
  return { ok: true, url: pub.publicUrl };
}

export async function saveProduct(formData: FormData) {
  const supabase = await createClient();

  const id = (formData.get("id") as string) || undefined;
  const slug = String(formData.get("slug") ?? "").trim();

  // Existing gallery URLs (preservate din client) - JSON string cu ordinea actualizata
  let existingGallery: string[] = [];
  try {
    existingGallery = JSON.parse(String(formData.get("existing_gallery") ?? "[]"));
  } catch {
    existingGallery = [];
  }

  const data: Record<string, unknown> = {
    slug,
    name: String(formData.get("name") ?? "").trim(),
    thickness: String(formData.get("thickness") ?? "6mm").trim(),
    price_mdl: Number(formData.get("price_mdl")) || 0,
    origin: String(formData.get("origin") ?? "").trim() || null,
    size: String(formData.get("size") ?? "").trim() || null,
    finish: String(formData.get("finish") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    in_stock: formData.get("in_stock") === "on",
    is_featured: formData.get("is_featured") === "on",
  };

  // Additional thicknesses (din checkboxes). Scot grosimea principala daca cumva e bifata si acolo.
  const mainThickness = String(data.thickness);
  const additional = (formData.getAll("additional_thicknesses") as string[])
    .map((t) => t.trim())
    .filter((t) => t && t !== mainThickness);
  // Deduplicate
  data.additional_thicknesses = Array.from(new Set(additional));

  // Cover image (optional - daca nu e upload, pastreaza cea existenta)
  const coverFile = formData.get("image") as File | null;
  if (coverFile && coverFile.size > 0) {
    const res = await uploadImage(coverFile, slug);
    if (!res.ok) return { ok: false, message: `Cover: ${res.message}` };
    data.image_url = res.url;
  }

  // Gallery images (multiple) - se adauga la cele existente
  const galleryFiles = formData.getAll("gallery") as File[];
  const newGalleryUrls: string[] = [];
  for (const f of galleryFiles) {
    if (f && f.size > 0) {
      const res = await uploadImage(f, slug);
      if (!res.ok) return { ok: false, message: `Galerie: ${res.message}` };
      newGalleryUrls.push(res.url);
    }
  }
  data.gallery_images = [...existingGallery, ...newGalleryUrls];

  if (id) {
    const { error } = await supabase.from("products").update(data).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("products").insert(data);
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