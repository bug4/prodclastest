// Data access layer — server-only fetching cu Supabase
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Collection, Promotion, ProductWithCollection, Article, Work } from "./types";

export async function getCollections(): Promise<Collection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("sort_order");
  if (error) {
    console.error("getCollections", error);
    return [];
  }
  return data ?? [];
}

export async function getProducts(opts?: {
  thickness?: string;
  featured?: boolean;
  limit?: number;
  sortByPrice?: "asc" | "desc";
}): Promise<ProductWithCollection[]> {
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  if (opts?.featured) query = query.eq("is_featured", true);
  if (opts?.thickness && opts.thickness !== "toate") {
    query = query.eq("thickness", opts.thickness);
  }

  // Sortare
  if (opts?.sortByPrice) {
    query = query.order("price_mdl", { ascending: opts.sortByPrice === "asc" });
  } else {
    query = query.order("sort_order");
  }

  if (opts?.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) {
    console.error("getProducts", error);
    return [];
  }

  return (data ?? []).map((p) => ({ ...p, collection: null })) as ProductWithCollection[];
}

export async function getProductBySlug(slug: string): Promise<ProductWithCollection | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getProductBySlug", error);
    return null;
  }
  return data ? ({ ...data, collection: null } as ProductWithCollection) : null;
}

export async function getPromotions(): Promise<Promotion[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) {
    console.error("getPromotions", error);
    return [];
  }
  return data ?? [];
}

export async function getArticles(opts?: { limit?: number }): Promise<Article[]> {
  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (opts?.limit) query = query.limit(opts.limit);
  const { data, error } = await query;
  if (error) {
    console.error("getArticles", error);
    return [];
  }
  return data ?? [];
}

export async function getWorks(opts?: {
  category?: string;
  limit?: number;
}): Promise<Work[]> {
  const supabase = await createClient();
  let query = supabase
    .from("works")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (opts?.category && opts.category !== "toate") {
    query = query.eq("category", opts.category);
  }
  if (opts?.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) {
    console.error("getWorks", error);
    return [];
  }
  return (data ?? []) as Work[];
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getWorkBySlug", error);
    return null;
  }
  return data as Work | null;
}
