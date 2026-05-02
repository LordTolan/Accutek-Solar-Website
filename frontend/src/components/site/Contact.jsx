import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY } from "@/lib/site-data";
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
import { Mail, Phone, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  email: "",
  phone: "",
  address: "",
  interest: "general",
  monthly_bill: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please add your name and email so we can reach you.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        monthly_bill: form.monthly_bill ? Number(form.monthly_bill) : null,
        source: "website-contact",
      };
      await axios.post(`${API}/leads`, payload);
      setSuccess(true);
      setForm(initial);
      toast.success("Got it. We'll reach out within one business day.");
    } catch (err) {
      toast.error("Couldn't submit — please call us directly.");
      // eslint-disable-next-line no-console
      console.error(err);
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
              <span className="italic font-light text-amber">We'll do the rest.</span>
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
                  <span className="italic font-light">We'll be in touch.</span>
                </h3>
                <p className="mt-4 text-ink2">
                  Seth, Quill or one of our crew will reach out within one
                  business day. If it's urgent, please call us directly at {COMPANY.phone}.
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
                  <FormField className="col-span-12 md:col-span-6" label="Interested in">
                    <Select value={form.interest} onValueChange={(v) => update("interest", v)}>
                      <SelectTrigger data-testid="contact-interest" className="rounded-sm font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solar">Solar PV</SelectItem>
                        <SelectItem value="battery">Battery backup</SelectItem>
                        <SelectItem value="generator">Kohler generator</SelectItem>
                        <SelectItem value="electrical">Electrical / panel</SelectItem>
                        <SelectItem value="general">General / multi-system</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField className="col-span-12 md:col-span-6" label="Avg. monthly bill ($)">
                    <Input
                      type="number"
                      value={form.monthly_bill}
                      onChange={(e) => update("monthly_bill", e.target.value)}
                      placeholder="180"
                      data-testid="contact-bill"
                      className="rounded-sm font-mono"
                    />
                  </FormField>
                  <FormField className="col-span-12" label="Anything we should know?">
                    <Textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Roof age, shade, timeline, questions…"
                      data-testid="contact-message"
                      className="rounded-sm"
                    />
                  </FormField>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit"
                  className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-ink text-bone px-8 py-4 hover:bg-amber hover:text-ink rounded-sm transition-colors font-medium text-sm disabled:opacity-60"
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
