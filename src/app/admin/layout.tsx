import { createClient } from "@/lib/supabase/server";
import { signOut } from "./auth.actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: { default: "Admin", template: "%s · Admin · Prodclas" },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Daca nu e logat (e.g. pe pagina /admin/login), randam doar children fara sidebar
  if (!user) {
    return <>{children}</>;
  }

  const signOutForm = (
    <form action={signOut}>
      <button
        type="submit"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors text-bg-paper/80"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Ieșire
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidebar userEmail={user.email ?? ""} signOutForm={signOutForm} />

      {/* Main content - cu padding-top pe mobil ca sa nu intre sub topbar */}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-5 sm:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
