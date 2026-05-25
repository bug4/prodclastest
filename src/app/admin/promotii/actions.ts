"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePromotion(formData: FormData) {
  const supabase = await createClient();
  const id = (formData.get("id") as string) || undefined;
  const imageFile = formData.get("image") as File | null;

  const data: any = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    tag: String(formData.get("tag") ?? "").trim() || null,
    discount_label: String(formData.get("discount_label") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    valid_until: String(formData.get("valid_until") ?? "").trim() || null,
    is_active: formData.get("is_active") === "on",
  };

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `promo-${data.slug || crypto.randomUUID()}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filename, imageFile, { contentType: imageFile.type });
    if (uploadError) return { ok: false, message: uploadError.message };

    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(filename);
    data.image_url = pub.publicUrl;
  }

  if (id) {
    const { error } = await supabase.from("promotions").update(data).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("promotions").insert(data);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin/promotii");
  revalidatePath("/promotii");
  redirect("/admin/promotii");
}

export async function deletePromotion(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("promotions").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/promotii");
  revalidatePath("/promotii");
  redirect("/admin/promotii");
}
