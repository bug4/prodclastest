import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata = { title: "Editează articol" };

type Props = { params: Promise<{ id: string }> };

export default async function ArticolEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  if (!article) notFound();

  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Conținut · editare</div>
        <h1 className="font-serif text-5xl font-light tracking-tight">{article.title}</h1>
      </header>
      <ArticleForm article={article} />
    </>
  );
}
