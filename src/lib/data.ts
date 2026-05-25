// Data access layer — server-only fetching cu Supabase
import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Collection, Promotion, ProductWithCollection, Article } from "./types";

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
  collectionSlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<ProductWithCollection[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*, collection:collections(name, slug)")
    .order("sort_order");

  if (opts?.featured) query = query.eq("is_featured", true);
  if (opts?.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) {
    console.error("getProducts", error);
    return [];
  }

  let result = (data ?? []) as ProductWithCollection[];
  if (opts?.collectionSlug && opts.collectionSlug !== "toate") {
    result = result.filter((p) => p.collection?.slug === opts.collectionSlug);
  }
  return result;
}

export async function getProductBySlug(slug: string): Promise<ProductWithCollection | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, collection:collections(name, slug)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getProductBySlug", error);
    return null;
  }
  return data as ProductWithCollection | null;
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
