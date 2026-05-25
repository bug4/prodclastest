import { signIn } from "../auth.actions";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Admin Login" };

type Props = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-flex">
            <Logo />
          </div>
          <p className="mt-6 text-sm text-ink-muted tracking-[0.2em] uppercase">Admin Panel</p>
        </div>

        <form action={signIn} className="bg-bg-paper rounded-2xl p-10 shadow-xl border border-line">
          <h1 className="font-serif text-3xl font-light mb-8 tracking-tight">Autentificare</h1>

          <label className="block mb-6">
            <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-transparent border-0 border-b border-line text-ink py-3 focus:outline-none focus:border-brass transition-colors"
            />
          </label>

          <label className="block mb-10">
            <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">Parolă</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-0 border-b border-line text-ink py-3 focus:outline-none focus:border-brass transition-colors"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-ink text-bg-paper py-4 rounded-full text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-brass-deep transition-colors"
          >
            Conectează-te
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}

          <p className="mt-6 text-xs text-ink-muted text-center">
            Creează user-ul în Supabase Dashboard → Authentication → Users
          </p>
        </form>
      </div>
    </div>
  );
}
