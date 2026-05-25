"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveArticle(formData: FormData) {
  const supabase = await createClient();
  const id = (formData.get("id") as string) || undefined;
  const imageFile = formData.get("cover") as File | null;
  const isPublished = formData.get("is_published") === "on";

  const data: any = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  };

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `article-${data.slug || crypto.randomUUID()}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filename, imageFile, { contentType: imageFile.type });
    if (uploadError) return { ok: false, message: uploadError.message };
    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(filename);
    data.cover_url = pub.publicUrl;
  }

  if (id) {
    const { error } = await supabase.from("articles").update(data).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("articles").insert(data);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin/articole");
  redirect("/admin/articole");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/articole");
  redirect("/admin/articole");
}
