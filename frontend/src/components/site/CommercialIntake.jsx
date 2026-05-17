import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY } from "@/lib/site-data";
import { logger } from "@/lib/logger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  Loader2,
  ArrowRight,
  ShieldCheck,
  X,
  Building2,
  CheckCircle2,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,.tiff,.xls,.xlsx";

const CONSENT_TEXT =
  "By checking this box, I consent to Accutek Solar (and its agents) contacting me by phone call, text message (SMS), and email at the contact information I've provided — including using automated systems — about my commercial project, quotes, scheduling, and follow-up. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. I can opt out at any time by replying STOP to texts, clicking unsubscribe in emails, or asking us directly.";

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  title: "",
  address: "",
  facility_size: "",
  facility_type: "",
  critical_loads: "",
  existing_system_brand: "",
  timeline: "",
  message: "",
  consent_communications: false,
};

export default function CommercialIntake() {
  const [form, setForm] = useState(initial);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFileError("");
    if (!f) {
      setFile(null);
      return;
    }
    if (f.size > MAX_BYTES) {
      setFileError(`File exceeds 10 MB (got ${(f.size / 1024 / 1024).toFixed(1)} MB).`);
      setFile(null);
      return;
    }
    setFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setFileError("");
    const el = document.getElementById("site-plan-input");
    if (el) el.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    if (!form.consent_communications) {
      toast.error("Please review and accept the communication consent.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        fd.append(k, v === null || v === undefined ? "" : String(v));
      });
      fd.append("consent_text", CONSENT_TEXT);
      if (file) fd.append("site_plan", file);

      await axios.post(`${API}/commercial-leads`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setForm(initial);
      setFile(null);
      toast.success("Received. Seth or Quill will be in touch within one business day.");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Couldn't submit — please call us directly.";
      toast.error(msg);
      // eslint-disable-next-line no-console
      logger.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        data-testid="commercial-success"
        className="bg-bone border-2 border-forest p-8 lg:p-12"
      >
        <CheckCircle2 className="h-10 w-10 text-forest mb-4" />
        <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight">
          Request received.
          <br />
          <span className="italic font-semibold text-forest">We'll be in touch.</span>
        </h3>
        <p className="mt-4 text-ink2 max-w-xl">
          Thank you — Seth or Quill will reach out within one business day to confirm the
          scope, schedule a site walk (if appropriate), and gather any missing documentation.
          If it's time-sensitive, please call us directly at{" "}
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="text-forest font-mono underline-offset-4 hover:underline"
          >
            {COMPANY.phone}
          </a>
          .
        </p>
        <button
          data-testid="commercial-success-reset"
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex items-center gap-2 text-sm text-forest hover:text-amberDark transition-colors"
        >
          Submit another request
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      data-testid="commercial-form"
      className="bg-bone border border-line p-6 sm:p-8 lg:p-10"
    >
      {/* Section A — Contact */}
      <FormSection
        icon={<Building2 className="h-4 w-4" />}
        label="01 · About you"
        title="Contact & company"
      >
        <Grid>
          <Field className="col-span-12 md:col-span-6" label="Full name" required>
            <Input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jane Smith"
              data-testid="com-name"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Title / role">
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Facility Manager"
              data-testid="com-title"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Company">
            <Input
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Acme Manufacturing"
              data-testid="com-company"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Email" required>
            <Input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="jane@acme.com"
              data-testid="com-email"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Phone">
            <Input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(812) 000-0000"
              data-testid="com-phone"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Facility address / county">
            <Input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Vigo County, IN"
              data-testid="com-address"
              className="rounded-sm text-base"
            />
          </Field>
        </Grid>
      </FormSection>

      {/* Section B — Facility */}
      <FormSection label="02 · About the facility" title="Facility & load profile">
        <Grid>
          <Field className="col-span-12 md:col-span-6" label="Facility size (sq ft)">
            <Input
              type="number"
              inputMode="numeric"
              value={form.facility_size}
              onChange={(e) => update("facility_size", e.target.value)}
              placeholder="45000"
              data-testid="com-size"
              className="rounded-sm text-base font-mono"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Facility type">
            <Select value={form.facility_type} onValueChange={(v) => update("facility_type", v)}>
              <SelectTrigger data-testid="com-type" className="rounded-sm text-base font-mono">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="warehouse">Warehouse / Distribution</SelectItem>
                <SelectItem value="agriculture">Agriculture / Farm</SelectItem>
                <SelectItem value="office">Office / Commercial</SelectItem>
                <SelectItem value="municipal">Municipal / Public</SelectItem>
                <SelectItem value="healthcare">Healthcare / Critical</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field className="col-span-12" label="Critical loads / equipment type">
            <Textarea
              rows={3}
              value={form.critical_loads}
              onChange={(e) => update("critical_loads", e.target.value)}
              placeholder="List the equipment that must stay powered — e.g. 200A refrigeration, 50HP compressor, 2× data racks, server room A/C, life-safety…"
              data-testid="com-loads"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Existing system brand (if any)">
            <Input
              value={form.existing_system_brand}
              onChange={(e) => update("existing_system_brand", e.target.value)}
              placeholder="e.g. Generac 150kW, SolarEdge, Enphase, Schneider, Sol-Ark"
              data-testid="com-brand"
              className="rounded-sm text-base"
            />
          </Field>
          <Field className="col-span-12 md:col-span-6" label="Timeline">
            <Select value={form.timeline} onValueChange={(v) => update("timeline", v)}>
              <SelectTrigger data-testid="com-timeline" className="rounded-sm text-base font-mono">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP / emergency</SelectItem>
                <SelectItem value="1-3mo">1–3 months</SelectItem>
                <SelectItem value="3-6mo">3–6 months</SelectItem>
                <SelectItem value="6-12mo">6–12 months</SelectItem>
                <SelectItem value="exploring">Just exploring</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field className="col-span-12" label="Additional notes">
            <Textarea
              rows={3}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Utility / budget / site constraints / anything that helps us come prepared…"
              data-testid="com-message"
              className="rounded-sm text-base"
            />
          </Field>
        </Grid>
      </FormSection>

      {/* Section C — File upload */}
      <FormSection
        icon={<Upload className="h-4 w-4" />}
        label="03 · Documents"
        title="Site plan / single-line drawing (optional)"
      >
        <p className="text-sm text-ink2 leading-relaxed mb-4 max-w-2xl">
          Attach a single-line drawing, site plan, one-line, or photos of the existing service
          entrance if you have them. PDF, PNG, JPG, WEBP or TIFF up to 10 MB. This short-circuits
          half the site visit.
        </p>

        {!file ? (
          <label
            htmlFor="site-plan-input"
            data-testid="com-file-label"
            className="group flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-line hover:border-forest hover:bg-bone2 transition-colors cursor-pointer text-center"
          >
            <Upload className="h-6 w-6 text-ink2 group-hover:text-forest transition-colors" />
            <div>
              <div className="font-display text-sm font-semibold text-ink">
                Tap to upload or drop a file
              </div>
              <div className="label-tag text-ink2 mt-1">
                PDF · PNG · JPG · WEBP · TIFF · XLSX · max 10 MB
              </div>
            </div>
            <input
              id="site-plan-input"
              data-testid="com-file-input"
              type="file"
              accept={ACCEPT}
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div
            data-testid="com-file-attached"
            className="flex items-center justify-between gap-3 px-4 py-4 bg-bone2 border border-forest"
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="h-5 w-5 text-forest shrink-0" />
              <div className="min-w-0">
                <div className="font-mono text-sm text-ink truncate">{file.name}</div>
                <div className="label-tag text-ink2 mt-0.5">
                  {(file.size / 1024).toFixed(0)} KB · {file.type || "unknown"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              data-testid="com-file-clear"
              aria-label="Remove file"
              className="shrink-0 h-9 w-9 flex items-center justify-center border border-line text-ink2 hover:border-destructive hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {fileError && (
          <p data-testid="com-file-error" className="mt-2 text-sm text-destructive">
            {fileError}
          </p>
        )}
      </FormSection>

      {/* Consent */}
      <div
        data-testid="com-consent-block"
        className={`mt-8 border-2 p-5 transition-colors ${
          form.consent_communications
            ? "border-forest bg-forest/5"
            : "border-amber bg-amber/10"
        }`}
      >
        <div className="flex items-start gap-3">
          <Checkbox
            id="com-consent-checkbox"
            checked={form.consent_communications}
            onCheckedChange={(v) => update("consent_communications", !!v)}
            data-testid="com-consent-checkbox"
            className="mt-0.5 h-5 w-5 data-[state=checked]:bg-forest data-[state=checked]:border-forest"
          />
          <label htmlFor="com-consent-checkbox" className="cursor-pointer flex-1">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4 text-forest" />
              <span className="label-tag text-forest">
                Communication consent — required
              </span>
            </div>
            <p className="text-sm text-ink leading-relaxed">
              <strong>Yes, Accutek Solar can contact me</strong> by phone, text, and email
              about this commercial project, quotes, scheduling and follow-up — including
              via automated systems.
            </p>
            <p className="mt-2 text-xs text-ink2 leading-relaxed">
              Not a condition of purchase. Message & data rates may apply. Opt out anytime
              via <strong className="font-mono">STOP</strong> / unsubscribe / ask us.
            </p>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !form.consent_communications}
          data-testid="com-submit"
          className="inline-flex items-center justify-center gap-2 bg-forest text-bone px-8 py-4 hover:bg-amber hover:text-ink rounded-sm transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-forest disabled:hover:text-bone min-h-[52px]"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit commercial request
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-xs text-ink2 leading-relaxed">
          We'll review overnight and reach out within one business day.
        </p>
      </div>
    </form>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-12 gap-4">{children}</div>;
}

function Field({ label, required, className = "", children }) {
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

function FormSection({ icon, label, title, children }) {
  return (
    <section className="py-6 first:pt-0 border-b border-line last:border-b-0">
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-amberDark">{icon}</span>}
        <span className="label-tag text-amberDark">{label}</span>
      </div>
      <h3 className="font-display text-xl lg:text-2xl font-extrabold text-ink tracking-tight mb-5">
        {title}
      </h3>
      {children}
    </section>
  );
}
