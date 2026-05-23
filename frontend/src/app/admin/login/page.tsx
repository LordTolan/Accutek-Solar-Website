"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sun, LockKeyhole } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@accuteksolar.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await api.login(email, password);
      router.push("/admin");
    } catch (e: any) { setErr(e.message || "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <section className="min-h-[80vh] grid place-items-center py-16" data-testid="admin-login-page">
      <div className="w-full max-w-md bg-card rounded-3xl border border-border/60 shadow-ambient p-8 md:p-10">
        <div className="flex items-center gap-2 text-secondary">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary text-primary-foreground"><Sun className="w-5 h-5" /></span>
          <span className="font-heading text-xl font-extrabold">Accutek Admin</span>
        </div>
        <h1 className="mt-7 font-heading text-3xl font-black">Welcome back.</h1>
        <p className="mt-2 text-foreground/70 text-sm">Sign in to view leads and manage your pipeline.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary focus-ring" required data-testid="login-email" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary focus-ring" required data-testid="login-password" />
          </div>
          {err && <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3" data-testid="login-error">{err}</div>}
          <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-bold disabled:opacity-50 hover:-translate-y-0.5 transition focus-ring" data-testid="login-submit">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LockKeyhole className="w-4 h-4" />}
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
