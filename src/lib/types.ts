// Types pentru tabelele Supabase
// Cand schimbi schema, regenereaza cu: npx supabase gen types typescript ...

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection_id: string | null;
  price_mdl: number;
  origin: string | null;
  size: string | null;
  finish: string | null;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProductWithCollection = Product & {
  collection: Pick<Collection, "name" | "slug"> | null;
};

export type Promotion = {
  id: string;
  slug: string;
  title: string;
  tag: string | null;
  discount_label: string | null;
  description: string | null;
  valid_until: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  source: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  metadata: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
};
