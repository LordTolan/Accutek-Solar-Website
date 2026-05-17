"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Loader2, Phone } from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = ["Your details", "About your property", "Your estimate"] as const;

type Answers = {
  service_type: "residential" | "commercial";
  monthly_bill: number;
  homeowner: boolean;
  roof_age: "new" | "good" | "old" | "unsure";
  timeline: "asap" | "3-6m" | "6-12m" | "browsing";
};

export default function QuoteWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Basics
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState<"IN" | "IL" | "">("");
  const [tcpa, setTcpa] = useState(false);

  const [a, setA] = useState<Answers>({
    service_type: "residential",
    monthly_bill: 180,
    homeowner: true,
    roof_age: "good",
    timeline: "3-6m",
  });
  const [estimate, setEstimate] = useState<any>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  const canNext1 = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phone.replace(/\D/g, "").length >= 7 && zip.length >= 4;
  const canNext2 = a.monthly_bill > 0;

  async function runQualify() {
    setSubmitting(true);
    try {
      const res = await api.qualify(a);
      setEstimate(res);
      setStep(2);
    } catch (e: any) { toast.error(e.message || "Failed to score lead"); }
    finally { setSubmitting(false); }
  }

  async function handleSubmit() {
    if (!tcpa) { toast.error("Please consent to be contacted."); return; }
    setSubmitting(true);
    try {
      const res = await api.submitLead({
        name, email, phone, zip_code: zip, state: state || undefined, answers: a, tcpa_consent: true,
      });
      setLeadId(res.lead_id);
      setEstimate({ score: res.score, tier: res.tier, annual_savings: res.annual_savings, twenty_five_year_savings: res.twenty_five_year_savings, system_size_kw: res.system_size_kw, payback_years: res.payback_years });
      toast.success("Your request is in. We'll be in touch within one business day.");
    } catch (e: any) { toast.error(e.message || "Submit failed"); }
    finally { setSubmitting(false); }
  }

  const tierTone = useMemo(() => {
    const t = estimate?.tier;
    if (t === "hot") return { bg: "bg-primary/15", text: "text-foreground", label: "Excellent match" };
    if (t === "warm") return { bg: "bg-yellow-200/50", text: "text-foreground", label: "Good fit" };
    return { bg: "bg-muted", text: "text-foreground", label: "Worth exploring" };
  }, [estimate?.tier]);

  return (
    <div className="bg-card rounded-3xl border border-border/60 shadow-ambient overflow-hidden" data-testid="quote-wizard">
      {/* Progress */}
      <div className="px-6 md:px-10 pt-7 pb-2">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span data-testid="wizard-step-label">Step {step + 1} of {STEPS.length}</span>
          <span className="font-semibold text-foreground">· {STEPS[step]}</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="px-6 md:px-10 py-8">
        {step === 0 && (
          <div className="space-y-5" data-testid="step-1">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full name" value={name} onChange={setName} placeholder="Jane Smith" testId="field-name" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="(812) 555-0144" type="tel" testId="field-phone" />
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@email.com" type="email" testId="field-email" />
              <Field label="ZIP code" value={zip} onChange={setZip} placeholder="47842" testId="field-zip" />
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">State</div>
                <div className="flex gap-2">
                  {(["IN", "IL"] as const).map((s) => (
                    <button key={s} onClick={() => setState(s)} className={`px-5 py-3 rounded-xl border text-sm font-bold transition ${state === s ? "border-primary bg-primary/10" : "border-border"}`} data-testid={`field-state-${s}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Property type</div>
                <div className="flex gap-2">
                  {(["residential", "commercial"] as const).map((s) => (
                    <button key={s} onClick={() => setA({ ...a, service_type: s })} className={`px-5 py-3 rounded-xl border text-sm font-bold capitalize transition ${a.service_type === s ? "border-primary bg-primary/10" : "border-border"}`} data-testid={`field-service-${s}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-7" data-testid="step-2">
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Average monthly electric bill</div>
                <div className="font-heading text-2xl font-extrabold text-primary" data-testid="bill-display">{formatCurrency(a.monthly_bill)}</div>
              </div>
              <input type="range" min={30} max={1000} step={10} value={a.monthly_bill}
                onChange={(e) => setA({ ...a, monthly_bill: parseInt(e.target.value) })}
                className="w-full accent-primary h-2" data-testid="bill-slider" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>$30</span><span>$1000+</span></div>
            </div>

            <Pills label="Are you the homeowner?" value={a.homeowner ? "yes" : "no"} onChange={(v) => setA({ ...a, homeowner: v === "yes" })}
              options={[{ v: "yes", l: "Yes" }, { v: "no", l: "No" }]} testIdPrefix="homeowner" />
            <Pills label="Roof age" value={a.roof_age} onChange={(v: any) => setA({ ...a, roof_age: v })}
              options={[{ v: "new", l: "New (<5y)" }, { v: "good", l: "Good (5–15y)" }, { v: "old", l: "Old (15y+)" }, { v: "unsure", l: "Not sure" }]} testIdPrefix="roof" />
            <Pills label="Timeline to decide" value={a.timeline} onChange={(v: any) => setA({ ...a, timeline: v })}
              options={[{ v: "asap", l: "ASAP" }, { v: "3-6m", l: "3–6 months" }, { v: "6-12m", l: "6–12 months" }, { v: "browsing", l: "Just browsing" }]} testIdPrefix="timeline" />
          </div>
        )}

        {step === 2 && estimate && (
          <div className="space-y-6" data-testid="step-3">
            <div className={`rounded-2xl p-6 md:p-8 ${tierTone.bg} border border-border/60`}>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{tierTone.label}</div>
              <div className="mt-2 flex items-baseline gap-3">
                <div className="font-heading text-5xl md:text-6xl font-black">{formatCurrency(estimate.twenty_five_year_savings)}</div>
                <div className="text-sm text-muted-foreground">est. 25-year savings</div>
              </div>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <Stat label="Annual savings" value={formatCurrency(estimate.annual_savings)} />
                <Stat label="System size" value={`${estimate.system_size_kw} kW`} />
                <Stat label="Payback" value={`${estimate.payback_years} yrs`} />
              </div>
            </div>

            {!leadId ? (
              <>
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" checked={tcpa} onChange={(e) => setTcpa(e.target.checked)} className="mt-1 w-4 h-4 accent-primary" data-testid="tcpa-checkbox" />
                  <span className="text-foreground/80">I consent to be contacted by Accutek Solar at the phone or email above. Standard rates may apply. I understand consent is not required to purchase.</span>
                </label>
                <button onClick={handleSubmit} disabled={submitting || !tcpa} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-bold disabled:opacity-50 hover:-translate-y-0.5 transition focus-ring" data-testid="submit-button">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Submit my request
                </button>
              </>
            ) : (
              <div className="rounded-2xl border border-border/60 p-6 bg-card text-center" data-testid="lead-success">
                <div className="font-heading text-2xl font-extrabold">Thanks, {name.split(" ")[0]}! 🎉</div>
                <p className="mt-2 text-foreground/70">Your request is in. We'll be in touch within one business day.</p>
                <div className="mt-5 flex flex-wrap gap-3 justify-center">
                  <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-bold focus-ring"><Phone className="w-4 h-4" /> Call us now</a>
                  <button onClick={() => router.push("/")} className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-3 font-bold focus-ring">Back to home</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      {!leadId && (
        <div className="px-6 md:px-10 py-5 border-t border-border/60 bg-muted/30 flex items-center justify-between gap-3">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold border border-border disabled:opacity-30 focus-ring" data-testid="prev-button">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < 1 && (
            <button onClick={() => setStep(1)} disabled={!canNext1} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-bold disabled:opacity-50 focus-ring" data-testid="next-button">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {step === 1 && (
            <button onClick={runQualify} disabled={!canNext2 || submitting} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-bold disabled:opacity-50 focus-ring" data-testid="qualify-button">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>See my estimate <ArrowRight className="w-4 h-4" /></>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", testId }: any) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-base focus:border-primary focus-ring transition"
        data-testid={testId} />
    </div>
  );
}

function Pills({ label, value, onChange, options, testIdPrefix }: any) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o: any) => (
          <button key={o.v} onClick={() => onChange(o.v)} data-testid={`${testIdPrefix}-${o.v}`}
            className={`px-5 py-3 rounded-xl border text-sm font-bold transition ${value === o.v ? "border-primary bg-primary/10" : "border-border hover:border-foreground/40"}`}>{o.l}</button>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/60 border border-border/60 p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-heading text-2xl font-extrabold">{value}</div>
    </div>
  );
}
