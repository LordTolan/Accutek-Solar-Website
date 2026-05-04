import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { COMPANY } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Loader2, ShieldCheck, LogIn } from "lucide-react";

function errorDetail(d) {
  if (d == null) return "Something went wrong.";
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return d?.msg || String(d);
}

export default function AdminLoginPage() {
  const { login, status } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") || "/admin/leads";

  useEffect(() => {
    if (status === "authenticated") navigate(from, { replace: true });
  }, [status, from, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Signed in.");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = errorDetail(err?.response?.data?.detail) || "Login failed.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      data-testid="admin-login-page"
      className="min-h-screen bg-forest text-bone flex items-center justify-center py-24 px-6"
    >
      <div className="w-full max-w-md bg-bone text-ink p-8 lg:p-10 border border-line">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={COMPANY.logos.icon}
            alt="Accutek Solar"
            className="h-10 w-10 object-contain"
          />
          <div>
            <div className="font-display text-lg font-extrabold tracking-tight">
              {COMPANY.name}
            </div>
            <div className="label-tag text-amberDark">Admin access</div>
          </div>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tighter leading-tight">
          Sign in to review leads.
        </h1>
        <p className="mt-2 text-sm text-ink2 leading-relaxed">
          This area is for Accutek staff only. Customers looking for their job
          portal should use the{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://client.housecallpro.com/customer_portal/request-link?token=d2cca52d5dc74361b2c484f1306b70df", "_blank");
            }}
            className="text-forest underline underline-offset-2"
          >
            customer portal
          </a>
          .
        </p>

        <form onSubmit={submit} data-testid="admin-login-form" className="mt-8 space-y-5">
          <div>
            <Label className="label-tag text-ink2">Email</Label>
            <Input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@accuteksolar.com"
              data-testid="admin-login-email"
              className="mt-2 rounded-sm"
            />
          </div>
          <div>
            <Label className="label-tag text-ink2">Password</Label>
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="admin-login-password"
              className="mt-2 rounded-sm"
            />
          </div>
          {error && (
            <div
              data-testid="admin-login-error"
              className="border border-destructive bg-destructive/10 text-destructive text-sm p-3 rounded-sm"
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            data-testid="admin-login-submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-forest text-bone px-6 py-3 rounded-sm hover:bg-amber hover:text-ink transition-colors font-medium text-sm disabled:opacity-60 min-h-[48px]"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Sign in
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-line flex items-start gap-2 text-xs text-ink2">
          <ShieldCheck className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
          <p>
            Sessions expire after 8 hours. 5 failed attempts triggers a 15-minute lockout.
          </p>
        </div>
      </div>
    </main>
  );
}
