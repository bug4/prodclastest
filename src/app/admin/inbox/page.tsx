import { createClient } from "@/lib/supabase/server";
import { InboxRow } from "@/components/admin/InboxRow";

export const metadata = { title: "Inbox" };

export default async function AdminInbox() {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const unreadCount = (submissions ?? []).filter((s: any) => !s.is_read).length;

  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          Mesaje primite · {unreadCount} necitite
        </div>
        <h1 className="font-serif text-5xl font-light tracking-tight">Inbox</h1>
      </header>

      <div className="bg-bg-paper rounded-2xl border border-line overflow-hidden">
        {(submissions ?? []).length === 0 ? (
          <div className="p-10 text-center text-ink-muted">Niciun mesaj încă.</div>
        ) : (
          (submissions ?? []).map((s: any) => <InboxRow key={s.id} submission={s} />)
        )}
      </div>
    </>
  );
}
