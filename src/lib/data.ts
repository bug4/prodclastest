// Data access layer — server-only fetching cu Supabase
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Collection, Promotion, ProductWithCollection, Article, Work, Thickness } from "./types";

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
  configuratorOnly?: boolean;
}): Promise<ProductWithCollection[]> {
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  if (opts?.featured) query = query.eq("is_featured", true);
  if (opts?.configuratorOnly) query = query.eq("show_in_configurator", true);

  // Sortare
  if (opts?.sortByPrice) {
    query = query.order("price_mdl", { ascending: opts.sortByPrice === "asc" });
  } else {
    query = query.order("sort_order");
  }

  if (opts?.limit && (!opts?.thickness || opts.thickness === "toate")) {
    // limit-ul il aplicam in DB doar daca nu filtram pe thickness
    // (altfel poate sa taie produse care ar trece de filtru)
    query = query.limit(opts.limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getProducts", error);
    return [];
  }

  let products = (data ?? []).map((p) => ({ ...p, collection: null })) as ProductWithCollection[];

  // Filtrare pe thickness in JS (include si additional_thicknesses)
  if (opts?.thickness && opts.thickness !== "toate") {
    const t = opts.thickness;
    products = products.filter((p) => {
      if (p.thickness === t) return true;
      if (Array.isArray(p.additional_thicknesses) && p.additional_thicknesses.includes(t as Thickness)) return true;
      return false;
    });
    // Aplicam limit dupa filtrare daca era setat
    if (opts.limit) products = products.slice(0, opts.limit);
  }

  return products;
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