import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY } from "@/lib/site-data";
import { readAll, clearAll, removeOne } from "@/lib/calc-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, ArrowRight, Loader2, ShieldCheck, Paperclip, X as XIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CONSENT_TEXT =
  "By checking this box, I consent to Accutek Solar (and its agents) contacting me by phone call, text message (SMS), and email at the contact information I've provided — including using automated systems — about my project, quotes, scheduling, and follow-up. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. I can opt out at any time by replying STOP to texts, clicking unsubscribe in emails, or asking us directly. See our privacy practices for details.";

const initial = {
  name: "",
  email: "",
  phone: "",
  address: "",
  interest: "solar",
  monthly_bill: "",
  message: "",
  consent_communications: false,
  // Lead qualification fields
  owns_home_5yr_plus: false,
  services_solar_panels: false,
  services_battery_backup: false,
  services_electrical_panel: false,
  timeline: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [calcResults, setCalcResults] = useState({});

  useEffect(() => {
    const sync = () => setCalcResults(readAll());
    sync();
    window.addEventListener("accutek-calc-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("accutek-calc-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please add your name and email so we can reach you.");
      return;
    }
    if (!form.consent_communications) {
      toast.error("Please review and accept the communication consent before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const calcResultsList = Object.values(calcResults);
      const payload = {
        ...form,
        monthly_bill: form.monthly_bill ? Number(form.monthly_bill) : null,
        consent_text: CONSENT_TEXT,
        source: "website-contact",
        calculator_results: calcResultsList.length > 0 ? calcResultsList : null,
      };
      await axios.post(`${API}/leads`, payload);
      setSuccess(true);
      setForm(initial);
      clearAll();
      toast.success("Got it. We'll reach out within one business day.");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg =
        typeof detail === "string"
          ? detail
          : "Couldn't submit — please call us directly.";
      toast.error(msg);
      // eslint-disable-next-line no-console
      console.error("Contact form error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-forest text-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-5">
            <p className="label-tag text-amber mb-4">— Free estimates</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
              Tell us about
              <br />
              your project.
              <br />
              <span className="italic font-semibold text-amber">We'll do the rest.</span>
            </h2>

            <div className="mt-12 space-y-4">
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="Call"
                value={COMPANY.phone}
                href={`tel:${COMPANY.phoneRaw}`}
                testid="contact-info-phone"
              />
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={COMPANY.email}
                href={`mailto:${COMPANY.email}`}
                testid="contact-info-email"
              />
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                label="Visit"
                value={COMPANY.address.full}
                href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address.full)}`}
                testid="contact-info-address"
              />
              <ContactRow
                icon={<Clock className="h-4 w-4" />}
                label="Hours"
                value={COMPANY.hours}
                testid="contact-info-hours"
              />
            </div>
          </div>

          {/* Right column - form */}
          <div className="col-span-12 lg:col-span-7">
            {success ? (
              <div
                data-testid="contact-success"
                className="bg-bone text-ink p-10 lg:p-14 border border-amber"
              >
                <div className="label-tag text-amberDark mb-4">— Request received</div>
                <h3 className="font-display text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                  Thank you.
                  <br />
                  <span className="italic font-semibold">We'll be in touch.</span>
                </h3>
                <p className="mt-4 text-ink2">
                  Keith, Seth, Quill or one of our crew will reach out within
                  one business day. If it's urgent, please call us directly at {COMPANY.phone}.
                </p>
                <button
                  data-testid="contact-success-reset"
                  onClick={() => setSuccess(false)}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-ink underline underline-offset-4 hover:text-amberDark transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                data-testid="contact-form"
                className="bg-bone text-ink p-8 lg:p-10 border border-line"
              >
                <div className="grid grid-cols-12 gap-4">
                  <FormField className="col-span-12 md:col-span-6" label="Name" required>
                    <Input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jane Smith"
                      data-testid="contact-name"
                      className="rounded-sm"
                    />
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Email" required>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      data-testid="contact-email"
                      className="rounded-sm"
                    />
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Phone">
                    <Input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(812) 000-0000"
                      data-testid="contact-phone"
                      className="rounded-sm"
                    />
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Address / county">
                    <Input
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="Vigo County, IN"
                      data-testid="contact-address"
                      className="rounded-sm"
                    />
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Primary interest">
                    <Select value={form.interest} onValueChange={(v) => update("interest", v)}>
                      <SelectTrigger data-testid="contact-interest" className="rounded-sm font-mono">
                        <SelectValue placeholder="What brought you to us?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bill_savings">Lower my electric bill</SelectItem>
                        <SelectItem value="solar">Solar panels (rooftop or ground)</SelectItem>
                        <SelectItem value="battery">Battery backup / energy storage</SelectItem>
                        <SelectItem value="generator">Kohler standby generator</SelectItem>
                        <SelectItem value="electrical">Electrical / panel upgrade</SelectItem>
                        <SelectItem value="diagnostic">Diagnose / repair existing system</SelectItem>
                        <SelectItem value="general">Not sure yet — just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Avg. monthly electric bill ($)">
                    <Input
                      type="number"
                      value={form.monthly_bill}
                      onChange={(e) => update("monthly_bill", e.target.value)}
                      placeholder="180"
                      data-testid="contact-bill"
                      className="rounded-sm font-mono"
                    />
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Timeline">
                    <Select value={form.timeline} onValueChange={(v) => update("timeline", v)}>
                      <SelectTrigger data-testid="contact-timeline" className="rounded-sm font-mono">
                        <SelectValue placeholder="When are you looking to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible (0–30 days)</SelectItem>
                        <SelectItem value="1-3_months">Within 1–3 months</SelectItem>
                        <SelectItem value="3-6_months">3–6 months out</SelectItem>
                        <SelectItem value="6-12_months">6–12 months out</SelectItem>
                        <SelectItem value="exploring">Just researching for now</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField className="col-span-12" label="Anything we should know?">
                    <Textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Roof age, shade, panel/breaker concerns, questions…"
                      data-testid="contact-message"
                      className="rounded-sm"
                    />
                  </FormField>
                </div>

                {/* Qualification block */}
                <div
                  data-testid="contact-qualification-block"
                  className="mt-6 border border-line p-5 bg-bone"
                >
                  <p className="label-tag text-ink2 mb-4">— A few quick questions</p>

                  <div className="space-y-4">
                    <label
                      htmlFor="qual-ownership"
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <Checkbox
                        id="qual-ownership"
                        checked={form.owns_home_5yr_plus}
                        onCheckedChange={(v) => update("owns_home_5yr_plus", !!v)}
                        data-testid="contact-qual-ownership"
                        className="mt-0.5 h-5 w-5 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
                      />
                      <span className="text-sm text-ink leading-relaxed">
                        I own my home and plan to stay here at least 5 more years.
                      </span>
                    </label>

                    <div>
                      <p className="text-sm text-ink mb-2">
                        Which services are you interested in? <span className="text-ink2">(check all that apply)</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label
                          htmlFor="svc-solar"
                          className="flex items-start gap-3 cursor-pointer"
                        >
                          <Checkbox
                            id="svc-solar"
                            checked={form.services_solar_panels}
                            onCheckedChange={(v) => update("services_solar_panels", !!v)}
                            data-testid="contact-svc-solar"
                            className="mt-0.5 h-5 w-5 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
                          />
                          <span className="text-sm text-ink leading-relaxed">Solar panels</span>
                        </label>
                        <label
                          htmlFor="svc-battery"
                          className="flex items-start gap-3 cursor-pointer"
                        >
                          <Checkbox
                            id="svc-battery"
                            checked={form.services_battery_backup}
                            onCheckedChange={(v) => update("services_battery_backup", !!v)}
                            data-testid="contact-svc-battery"
                            className="mt-0.5 h-5 w-5 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
                          />
                          <span className="text-sm text-ink leading-relaxed">Battery backup</span>
                        </label>
                        <label
                          htmlFor="svc-electrical"
                          className="flex items-start gap-3 cursor-pointer"
                        >
                          <Checkbox
                            id="svc-electrical"
                            checked={form.services_electrical_panel}
                            onCheckedChange={(v) => update("services_electrical_panel", !!v)}
                            data-testid="contact-svc-electrical"
                            className="mt-0.5 h-5 w-5 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
                          />
                          <span className="text-sm text-ink leading-relaxed">Electrical / panel upgrade</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attached calculator results (from /tools) */}
                {Object.keys(calcResults).length > 0 && (
                  <div
                    data-testid="contact-calc-results"
                    className="mt-6 border border-forest/30 bg-forest/5 p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-forest" />
                        <span className="label-tag text-forest">
                          — Calculator estimates attached ({Object.keys(calcResults).length})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => clearAll()}
                        data-testid="contact-calc-clear-all"
                        className="text-xs font-mono uppercase tracking-wider text-ink2 hover:text-amberDark transition-colors underline-offset-4 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {Object.values(calcResults).map((r) => (
                        <li
                          key={r.tool}
                          data-testid={`contact-calc-row-${r.tool}`}
                          className="flex items-start justify-between gap-3 bg-bone border border-line px-3 py-2"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-mono uppercase tracking-wider text-amberDark">
                              {r.label}
                            </div>
                            <div className="text-sm text-ink mt-0.5 leading-snug">
                              {r.summary}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeOne(r.tool)}
                            data-testid={`contact-calc-remove-${r.tool}`}
                            aria-label={`Remove ${r.label}`}
                            className="shrink-0 inline-flex items-center justify-center h-7 w-7 text-ink2 hover:text-amberDark hover:bg-amber/10 rounded-sm transition-colors"
                          >
                            <XIcon className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Consent block — highlighted */}
                <div
                  data-testid="contact-consent-block"
                  className={`mt-6 border-2 p-5 transition-colors ${
                    form.consent_communications
                      ? "border-forest bg-forest/5"
                      : "border-amber bg-amber/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent-checkbox"
                      checked={form.consent_communications}
                      onCheckedChange={(v) => update("consent_communications", !!v)}
                      data-testid="contact-consent-checkbox"
                      className="mt-0.5 h-5 w-5 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
                    />
                    <label htmlFor="consent-checkbox" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="h-4 w-4 text-forest" />
                        <span className="label-tag text-forest">
                          Communication consent — required
                        </span>
                      </div>
                      <p className="text-sm text-ink leading-relaxed">
                        <strong>Yes, Accutek Solar can contact me</strong> by phone
                        call, text message (SMS), and email at the contact info
                        I've provided — including via automated systems — about my
                        project, quotes, scheduling and follow-up.
                      </p>
                      <p className="mt-2 text-xs text-ink2 leading-relaxed">
                        Consent is <strong>not</strong> a condition of purchase.
                        Message & data rates may apply. Message frequency varies.
                        Opt out anytime by replying <strong className="font-mono">STOP</strong> to
                        texts, clicking unsubscribe in emails, or just asking us.
                      </p>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !form.consent_communications}
                  data-testid="contact-submit"
                  className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-ink text-bone px-8 py-4 hover:bg-amber hover:text-ink rounded-sm transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ink disabled:hover:text-bone"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Request my free estimate
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-xs text-ink2">
                  We'll only use this information to follow up about your project.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ children, label, required, className = "" }) {
  return (
    <div className={className}>
      <Label className="label-tag text-ink2">
        {label}
        {required && <span className="text-amberDark ml-1">*</span>}
      </Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ContactRow({ icon, label, value, href, testid }) {
  const inner = (
    <div className="flex items-start gap-4 py-4 border-b border-bone/15">
      <span className="mt-1 h-8 w-8 inline-flex items-center justify-center bg-bone/10 text-amber">
        {icon}
      </span>
      <div>
        <div className="label-tag text-bone/50">{label}</div>
        <div className="font-mono text-sm text-bone mt-1">{value}</div>
      </div>
    </div>
  );
  if (!href) return <div data-testid={testid}>{inner}</div>;
  return (
    <a
      href={href}
      data-testid={testid}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="block hover:opacity-80 transition-opacity"
    >
      {inner}
    </a>
  );
}
