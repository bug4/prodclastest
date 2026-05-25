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
  sortByPrice?: "asc" | "desc";
}): Promise<ProductWithCollection[]> {
  const supabase = await createClient();

  // Daca filtram pe collection slug, gasim mai intai collection_id
  let collectionId: string | undefined;
  if (opts?.collectionSlug && opts.collectionSlug !== "toate") {
    const { data: col } = await supabase
      .from("collections")
      .select("id")
      .eq("slug", opts.collectionSlug)
      .maybeSingle();
    if (col) collectionId = col.id;
    else return []; // colectie inexistenta
  }

  let query = supabase
    .from("products")
    .select("*, collection:collections(name, slug)");

  if (opts?.featured) query = query.eq("is_featured", true);
  if (collectionId) query = query.eq("collection_id", collectionId);

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

  return (data ?? []) as ProductWithCollection[];
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
