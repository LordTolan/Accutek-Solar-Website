"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Loader2, Phone, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = ["About you", "Your situation", "Your estimate"] as const;

type Answers = {
  interest_source: "bill_savings" | "backup_power" | "electrical_upgrade" | "ev_charger" | "other";
  monthly_bill: number;
  homeowner_5_7y: boolean;
  interest_areas: ("solar" | "battery" | "electrical" | "combo")[];
  aware_credit_ended: boolean | null;
  timeline: "ready_1_3m" | "exploring" | "gathering_info";
  service_type: "residential" | "commercial";
};

const INTEREST_SOURCES = [
  { v: "bill_savings", l: "Solar bill savings" },
  { v: "backup_power", l: "Backup power" },
  { v: "electrical_upgrade", l: "Electrical upgrade needed" },
  { v: "ev_charger", l: "EV charger" },
  { v: "other", l: "Something else" },
] as const;

const INTEREST_AREAS = [
  { v: "solar", l: "Solar panels" },
  { v: "battery", l: "Battery backup" },
  { v: "electrical", l: "Electrical upgrades (panel)" },
  { v: "combo", l: "A combination" },
] as const;

const TIMELINES = [
  { v: "ready_1_3m", l: "Ready in 1–3 months" },
  { v: "exploring", l: "Exploring" },
  { v: "gathering_info", l: "Just gathering info" },
] as const;

export default function QuoteWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Contact basics
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState<"IN" | "IL" | "">("");
  const [tcpa, setTcpa] = useState(false);

  const [a, setA] = useState<Answers>({
    interest_source: "bill_savings",
    monthly_bill: 180,
    homeowner_5_7y: true,
    interest_areas: ["solar"],
    aware_credit_ended: null,
    timeline: "exploring",
    service_type: "residential",
  });
  const [estimate, setEstimate] = useState<any>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  const canNext1 = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phone.replace(/\D/g, "").length >= 7 && zip.length >= 4;
  const canNext2 = a.monthly_bill > 0 && a.interest_areas.length > 0 && a.aware_credit_ended !== null;

  function toggleArea(v: Answers["interest_areas"][number]) {
    setA((s) => {
      const has = s.interest_areas.includes(v);
      return { ...s, interest_areas: has ? s.interest_areas.filter((x) => x !== v) : [...s.interest_areas, v] };
    });
  }

  async function runQualify() {
    setSubmitting(true);
    try {
      const payload = { ...a, aware_credit_ended: !!a.aware_credit_ended };
      const res = await api.qualify(payload);
      setEstimate(res);
      setStep(2);
    } catch (e: any) { toast.error(e.message || "Failed to score lead"); }
    finally { setSubmitting(false); }
  }

  async function handleSubmit() {
    if (!tcpa) { toast.error("Please consent to be contacted."); return; }
    setSubmitting(true);
    try {
      const payload = { ...a, aware_credit_ended: !!a.aware_credit_ended };
      const res = await api.submitLead({
        name, email, phone, zip_code: zip, state: state || undefined, answers: payload, tcpa_consent: true,
      });
      setLeadId(res.lead_id);
      setEstimate({ score: res.score, tier: res.tier, annual_savings: res.annual_savings, twenty_five_year_savings: res.twenty_five_year_savings, system_size_kw: res.system_size_kw, payback_years: res.payback_years });
      toast.success("Your request is in. We'll be in touch within one business day.");
    } catch (e: any) { toast.error(e.message || "Submit failed"); }
    finally { setSubmitting(false); }
  }

  const tierTone = useMemo(() => {
    const t = estimate?.tier;
    if (t === "hot") return { ring: "ring-primary/40", chip: "bg-primary/20 text-primary border-primary/40", label: "Excellent match" };
    if (t === "warm") return { ring: "ring-secondary/40", chip: "bg-secondary/30 text-foreground border-secondary/40", label: "Good fit" };
    return { ring: "ring-border", chip: "bg-muted text-foreground border-border", label: "Worth exploring" };
  }, [estimate?.tier]);

  return (
    <div className="bg-card rounded-lg border border-border shadow-ambient-lg overflow-hidden" data-testid="quote-wizard">
      {/* Progress */}
      <div className="px-6 md:px-10 pt-7 pb-2 border-b border-border/60">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
          <span data-testid="wizard-step-label">STEP {step + 1} / {STEPS.length}</span>
          <span className="text-primary font-semibold">// {STEPS[step]}</span>
        </div>
        <div className="mt-3 h-[2px] rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="px-6 md:px-10 py-8">
        {step === 0 && (
          <div className="space-y-6" data-testid="step-1">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full name" value={name} onChange={setName} placeholder="Jane Smith" testId="field-name" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="(812) 555-0144" type="tel" testId="field-phone" />
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@email.com" type="email" testId="field-email" />
              <Field label="ZIP code" value={zip} onChange={setZip} placeholder="47842" testId="field-zip" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground mb-2">State</div>
                <div className="flex gap-2">
                  {(["IN", "IL"] as const).map((s) => (
                    <Pill key={s} active={state === s} onClick={() => setState(s)} testId={`field-state-${s}`}>{s}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground mb-2">Property type</div>
                <div className="flex gap-2">
                  {(["residential", "commercial"] as const).map((s) => (
                    <Pill key={s} active={a.service_type === s} onClick={() => setA({ ...a, service_type: s })} testId={`field-service-${s}`}>{s}</Pill>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8" data-testid="step-2">
            {/* Q1 */}
            <Group label="01 · What prompted your interest?">
              <div className="flex flex-wrap gap-2">
                {INTEREST_SOURCES.map((o) => (
                  <Pill key={o.v} active={a.interest_source === o.v} onClick={() => setA({ ...a, interest_source: o.v })} testId={`q1-${o.v}`}>{o.l}</Pill>
                ))}
              </div>
            </Group>

            {/* Q2 */}
            <Group label="02 · Average monthly electric bill">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-xs text-muted-foreground">USD / month</span>
                <span className="font-heading text-3xl font-black text-primary text-glow" data-testid="bill-display">{formatCurrency(a.monthly_bill)}</span>
              </div>
              <input type="range" min={30} max={1500} step={10} value={a.monthly_bill}
                onChange={(e) => setA({ ...a, monthly_bill: parseInt(e.target.value) })}
                className="w-full accent-primary h-2" data-testid="bill-slider" />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2"><span>$30</span><span>$1500+</span></div>
            </Group>

            {/* Q3 */}
            <Group label="03 · Do you own your home and plan to stay 5–7+ years?">
              <div className="flex gap-2">
                <Pill active={a.homeowner_5_7y === true} onClick={() => setA({ ...a, homeowner_5_7y: true })} testId="q3-yes">Yes</Pill>
                <Pill active={a.homeowner_5_7y === false} onClick={() => setA({ ...a, homeowner_5_7y: false })} testId="q3-no">No</Pill>
              </div>
            </Group>

            {/* Q4 */}
            <Group label="04 · What are you mainly interested in? (select all that apply)">
              <div className="flex flex-wrap gap-2">
                {INTEREST_AREAS.map((o) => (
                  <Pill key={o.v} active={a.interest_areas.includes(o.v)} onClick={() => toggleArea(o.v)} testId={`q4-${o.v}`}>{o.l}</Pill>
                ))}
              </div>
            </Group>



            {/* Q6 */}
            <Group label="05 · What's your ideal timeline?">
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((o) => (
                  <Pill key={o.v} active={a.timeline === o.v} onClick={() => setA({ ...a, timeline: o.v })} testId={`q6-${o.v}`}>{o.l}</Pill>
                ))}
              </div>
            </Group>
          </div>
        )}

        {step === 2 && estimate && (
          <div className="space-y-6" data-testid="step-3">
            <div className={`rounded-lg p-6 md:p-8 bg-muted/40 border ring-1 ${tierTone.ring}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-mono border ${tierTone.chip}`}>{tierTone.label}</div>
              <div className="mt-4 flex items-baseline gap-3">
                <div className="font-heading text-5xl md:text-6xl font-black text-primary text-glow">{formatCurrency(estimate.twenty_five_year_savings)}</div>
                <div className="text-sm text-muted-foreground font-mono">// 25-year est. savings</div>
              </div>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <Stat label="Annual" value={formatCurrency(estimate.annual_savings)} />
                <Stat label="System size" value={`${estimate.system_size_kw} kW`} />
                <Stat label="Payback" value={`${estimate.payback_years} yrs`} />
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Directional estimate based on Central IN / Western IL sun hours. Your real, free site-visit quote will include all active state &amp; utility incentives.
              </p>
            </div>

            {!leadId ? (
              <>
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" checked={tcpa} onChange={(e) => setTcpa(e.target.checked)} className="mt-1 w-4 h-4 accent-primary" data-testid="tcpa-checkbox" />
                  <span className="text-foreground/80">I consent to be contacted by Accutek Solar at the phone or email above. Standard rates may apply. I understand consent is not required to purchase.</span>
                </label>
                <button onClick={handleSubmit} disabled={submitting || !tcpa} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-4 font-bold disabled:opacity-50 hover:shadow-green-glow transition focus-ring uppercase tracking-wider text-sm" data-testid="submit-button">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Submit my request
                </button>
              </>
            ) : (
              <div className="rounded-lg border border-primary/40 ring-1 ring-primary/30 p-6 bg-primary/5 text-center" data-testid="lead-success">
                <div className="font-heading text-2xl font-extrabold">Thanks, {name.split(" ")[0]}.</div>
                <p className="mt-2 text-foreground/70">Your request is in. Seth or the Accutek team will reach you within one business day.</p>
                <div className="mt-5 flex flex-wrap gap-3 justify-center">
                  <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 font-bold focus-ring"><Phone className="w-4 h-4" /> (812) 878-7343</a>
                  <button onClick={() => router.push("/")} className="inline-flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-5 py-3 font-bold focus-ring">Back to home</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!leadId && (
        <div className="px-6 md:px-10 py-5 border-t border-border bg-background/40 flex items-center justify-between gap-3">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-bold border border-border disabled:opacity-30 focus-ring" data-testid="prev-button">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < 1 && (
            <button onClick={() => setStep(1)} disabled={!canNext1} className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold disabled:opacity-50 hover:shadow-green-glow transition focus-ring uppercase tracking-wider" data-testid="next-button">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {step === 1 && (
            <button onClick={runQualify} disabled={!canNext2 || submitting} className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold disabled:opacity-50 hover:shadow-green-glow transition focus-ring uppercase tracking-wider" data-testid="qualify-button">
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
      <label className="block text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-background border border-border rounded-md px-4 py-3 text-base focus:border-primary focus-ring transition placeholder:text-muted-foreground/60"
        data-testid={testId} />
    </div>
  );
}

function Pill({ active, onClick, children, testId }: any) {
  return (
    <button onClick={onClick} data-testid={testId}
      className={`px-4 py-2.5 rounded-md border text-sm font-bold capitalize transition focus-ring ${active ? "border-primary bg-primary/15 text-primary shadow-green-glow" : "border-border bg-background hover:border-foreground/40 text-foreground/85"}`}>
      {children}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground mb-3">{label}</div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-background/60 border border-border p-3">
      <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">{label}</div>
      <div className="mt-1 font-heading text-2xl font-extrabold">{value}</div>
    </div>
  );
}
