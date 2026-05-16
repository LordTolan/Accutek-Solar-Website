import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sun,
  Battery,
  MountainSnow,
  Zap,
  TrendingUp,
  ArrowRight,
  Paperclip,
} from "lucide-react";
import { saveCalcResult } from "@/lib/calc-store";

/* ─────────────── 1. Solar Panel Sizing ─────────────── */
function SolarCalc() {
  const [bill, setBill] = useState(180);
  const [rate, setRate] = useState(0.14);
  const [sunHours, setSunHours] = useState(4.4); // IN avg
  const [efficiency, setEfficiency] = useState(0.78);

  const out = useMemo(() => {
    const monthlyKwh = bill / rate;
    const dailyKwh = monthlyKwh / 30;
    const systemKw = dailyKwh / (sunHours * efficiency);
    const panels = Math.ceil((systemKw * 1000) / 400); // 400W panels
    const roofSqFt = Math.ceil(panels * 21);
    const lowCost = systemKw * 2700;
    const highCost = systemKw * 3500;
    return { monthlyKwh, systemKw, panels, roofSqFt, lowCost, highCost };
  }, [bill, rate, sunHours, efficiency]);

  return (
    <CalcShell
      icon={<Sun className="h-5 w-5" />}
      title="Solar Panel System Sizer"
      caption="Estimate kW system size from your monthly bill."
      testid="calc-solar"
    >
      <div className="grid grid-cols-12 gap-4">
        <Field className="col-span-12 md:col-span-6" label="Avg. monthly bill ($)" testid="solar-bill">
          <Input
            type="number"
            value={bill}
            min={20}
            onChange={(e) => setBill(Number(e.target.value))}
            className="font-mono"
            data-testid="solar-bill-input"
          />
        </Field>
        <Field className="col-span-12 md:col-span-6" label="Utility rate ($/kWh)" testid="solar-rate">
          <Input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="font-mono"
            data-testid="solar-rate-input"
          />
        </Field>
        <Field className="col-span-12 md:col-span-6" label={`Peak sun hours / day · ${sunHours.toFixed(1)}`} testid="solar-sun">
          <Slider
            min={3.5}
            max={5.5}
            step={0.1}
            value={[sunHours]}
            onValueChange={(v) => setSunHours(v[0])}
            data-testid="solar-sun-slider"
          />
          <Hint>IN/IL typical: 4.2 – 4.6</Hint>
        </Field>
        <Field className="col-span-12 md:col-span-6" label={`System efficiency · ${(efficiency * 100).toFixed(0)}%`} testid="solar-eff">
          <Slider
            min={0.7}
            max={0.85}
            step={0.01}
            value={[efficiency]}
            onValueChange={(v) => setEfficiency(v[0])}
            data-testid="solar-eff-slider"
          />
          <Hint>Accounts for inverter, wiring, soiling losses.</Hint>
        </Field>
      </div>

      <Results>
        <Result label="Monthly usage" value={`${out.monthlyKwh.toFixed(0)} kWh`} testid="solar-out-usage" />
        <Result label="System size" value={`${out.systemKw.toFixed(2)} kW`} highlight testid="solar-out-size" />
        <Result label="Panels needed (~400W)" value={out.panels} testid="solar-out-panels" />
        <Result label="Roof footprint" value={`~${out.roofSqFt} sq ft`} testid="solar-out-roof" />
        <Result
          label="Est. installed cost"
          value={`$${out.lowCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} – $${out.highCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          testid="solar-out-cost"
          full
        />
      </Results>
      <AttachToContact
        toolId="solar"
        label="Solar Panel Sizing"
        summary={`${out.systemKw.toFixed(2)} kW system, ${out.panels} panels — est. $${out.lowCost.toLocaleString(undefined,{maximumFractionDigits:0})}–$${out.highCost.toLocaleString(undefined,{maximumFractionDigits:0})}`}
        raw={{ monthly_bill: bill, rate, sun_hours: sunHours, efficiency, ...out }}
        testid="solar-attach"
      />
    </CalcShell>
  );
}

/* ─────────────── 2. Battery Backup Sizing ─────────────── */
const APPLIANCES = [
  { id: "fridge", label: "Refrigerator", w: 150, hrs: 24 },
  { id: "lights", label: "Essential lighting", w: 200, hrs: 6 },
  { id: "wifi", label: "Wi-Fi / modem", w: 30, hrs: 24 },
  { id: "furnace", label: "Furnace blower", w: 600, hrs: 8 },
  { id: "freezer", label: "Chest freezer", w: 100, hrs: 24 },
  { id: "well", label: "Well pump", w: 1000, hrs: 1 },
  { id: "sump", label: "Sump pump", w: 800, hrs: 2 },
  { id: "microwave", label: "Microwave", w: 1000, hrs: 0.25 },
  { id: "tv", label: "TV / electronics", w: 200, hrs: 5 },
  { id: "ac", label: "Window AC", w: 1200, hrs: 8 },
];

function BatteryCalc() {
  const [selected, setSelected] = useState({ fridge: true, lights: true, wifi: true, furnace: true });
  const [hours, setHours] = useState(12);
  const [reserve, setReserve] = useState(20);

  const out = useMemo(() => {
    const wattHoursPerDay = APPLIANCES.reduce((acc, a) => {
      if (!selected[a.id]) return acc;
      const usableHrs = Math.min(a.hrs, hours);
      return acc + a.w * usableHrs;
    }, 0);
    const kwhPerDay = wattHoursPerDay / 1000;
    const usableKwh = kwhPerDay * (hours / 24);
    const totalKwh = usableKwh / (1 - reserve / 100);
    return { usableKwh, totalKwh };
  }, [selected, hours, reserve]);

  return (
    <CalcShell
      icon={<Battery className="h-5 w-5" />}
      title="Battery Backup Sizer"
      caption="Pick what stays on, choose runtime, get the kWh you need."
      testid="calc-battery"
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <FieldLabel>Critical loads</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
            {APPLIANCES.map((a) => (
              <label
                key={a.id}
                data-testid={`battery-load-${a.id}`}
                className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-colors ${
                  selected[a.id]
                    ? "bg-ink text-bone border-ink"
                    : "bg-bone border-line hover:border-amber"
                }`}
              >
                <Checkbox
                  checked={!!selected[a.id]}
                  onCheckedChange={(v) => setSelected((s) => ({ ...s, [a.id]: !!v }))}
                  className="data-[state=checked]:bg-amber data-[state=checked]:border-amber"
                />
                <span className="text-xs">{a.label}</span>
              </label>
            ))}
          </div>
        </div>
        <Field className="col-span-12 md:col-span-6" label={`Runtime (hours) · ${hours}h`} testid="battery-hours">
          <Slider
            min={4}
            max={72}
            step={2}
            value={[hours]}
            onValueChange={(v) => setHours(v[0])}
            data-testid="battery-hours-slider"
          />
          <Hint>Most outages last under 12 hours.</Hint>
        </Field>
        <Field className="col-span-12 md:col-span-6" label={`Reserve buffer · ${reserve}%`} testid="battery-reserve">
          <Slider
            min={10}
            max={40}
            step={5}
            value={[reserve]}
            onValueChange={(v) => setReserve(v[0])}
            data-testid="battery-reserve-slider"
          />
          <Hint>Battery longevity & headroom for cold-temp losses.</Hint>
        </Field>
      </div>

      <Results>
        <Result label="Usable energy needed" value={`${out.usableKwh.toFixed(2)} kWh`} testid="battery-out-usable" />
        <Result
          label="Recommended battery"
          value={`${out.totalKwh.toFixed(1)} kWh`}
          highlight
          testid="battery-out-total"
        />
        <Result
          label="Comparable to"
          value={
            out.totalKwh < 14
              ? "1 × Tesla Powerwall"
              : out.totalKwh < 28
              ? "2 × Powerwalls"
              : `${Math.ceil(out.totalKwh / 13.5)} × custom modules`
          }
          full
          testid="battery-out-compare"
        />
      </Results>
      <AttachToContact
        toolId="battery"
        label="Battery Backup Sizing"
        summary={`${out.totalKwh.toFixed(1)} kWh battery (${out.usableKwh.toFixed(2)} kWh usable, ${hours}h runtime)`}
        raw={{ appliances: Object.keys(selected).filter((k) => selected[k]), hours, reserve, ...out }}
        testid="battery-attach"
      />
    </CalcShell>
  );
}

/* ─────────────── 3. Mount Type Recommender ─────────────── */
function MountCalc() {
  const [roofAge, setRoofAge] = useState("0_10");
  const [roofShade, setRoofShade] = useState("light");
  const [roofType, setRoofType] = useState("asphalt");
  const [yardSpace, setYardSpace] = useState("yes");

  const out = useMemo(() => {
    let roofScore = 0;
    let groundScore = 0;
    if (roofAge === "0_10") roofScore += 3;
    else if (roofAge === "10_20") roofScore += 1;
    else groundScore += 3;

    if (roofShade === "none") roofScore += 3;
    else if (roofShade === "light") roofScore += 2;
    else if (roofShade === "moderate") { roofScore += 0; groundScore += 1; }
    else groundScore += 3;

    if (roofType === "metal") roofScore += 2;
    else if (roofType === "asphalt") roofScore += 1;
    else if (roofType === "tile") groundScore += 1;

    if (yardSpace === "yes") groundScore += 2;
    else groundScore -= 2;

    const verdict = roofScore >= groundScore ? "roof" : "ground";
    const confidence = Math.min(95, 55 + Math.abs(roofScore - groundScore) * 8);
    return { verdict, roofScore, groundScore, confidence };
  }, [roofAge, roofShade, roofType, yardSpace]);

  return (
    <CalcShell
      icon={<MountainSnow className="h-5 w-5" />}
      title="Roof vs. Ground Mount Recommender"
      caption="Four quick questions, one engineer-grade recommendation."
      testid="calc-mount"
    >
      <div className="grid grid-cols-12 gap-4">
        <Field className="col-span-12 md:col-span-6" label="Roof age" testid="mount-age">
          <Select value={roofAge} onValueChange={setRoofAge}>
            <SelectTrigger data-testid="mount-age-trigger" className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0_10">0–10 years</SelectItem>
              <SelectItem value="10_20">10–20 years</SelectItem>
              <SelectItem value="20_plus">20+ years</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="col-span-12 md:col-span-6" label="Shading" testid="mount-shade">
          <Select value={roofShade} onValueChange={setRoofShade}>
            <SelectTrigger data-testid="mount-shade-trigger" className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No shade</SelectItem>
              <SelectItem value="light">Light morning/evening</SelectItem>
              <SelectItem value="moderate">Moderate trees</SelectItem>
              <SelectItem value="heavy">Heavy shade</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="col-span-12 md:col-span-6" label="Roof material" testid="mount-roof">
          <Select value={roofType} onValueChange={setRoofType}>
            <SelectTrigger data-testid="mount-roof-trigger" className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asphalt">Asphalt shingle</SelectItem>
              <SelectItem value="metal">Standing-seam metal</SelectItem>
              <SelectItem value="tile">Tile / slate</SelectItem>
              <SelectItem value="flat">Flat / EPDM</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="col-span-12 md:col-span-6" label="Open yard space?" testid="mount-yard">
          <Select value={yardSpace} onValueChange={setYardSpace}>
            <SelectTrigger data-testid="mount-yard-trigger" className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, sunny acreage</SelectItem>
              <SelectItem value="some">Some, partly shaded</SelectItem>
              <SelectItem value="no">No, suburban lot</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Results>
        <Result
          label="Recommendation"
          value={out.verdict === "roof" ? "Roof Mount" : "Ground Mount"}
          highlight
          full
          testid="mount-out-verdict"
        />
        <Result label="Confidence" value={`${out.confidence}%`} testid="mount-out-confidence" />
        <Result
          label="Why"
          value={
            out.verdict === "roof"
              ? "Newer roof, low shade and good roof material. Roof mount minimizes site work and cost."
              : "Older roof, available open ground or significant shading. Ground mount maximizes production and avoids re-roofing."
          }
          full
          testid="mount-out-why"
        />
      </Results>
      <AttachToContact
        toolId="mount"
        label="Mount Type Recommendation"
        summary={`${out.verdict === "roof" ? "Roof Mount" : "Ground Mount"} (${out.confidence}% confidence)`}
        raw={{ roof_age: roofAge, roof_shade: roofShade, roof_type: roofType, yard_space: yardSpace, ...out }}
        testid="mount-attach"
      />
    </CalcShell>
  );
}

/* ─────────────── 4. Generator Sizing ─────────────── */
function GeneratorCalc() {
  const [coverage, setCoverage] = useState("whole");
  const [sqft, setSqft] = useState(2000);
  const [hasAC, setHasAC] = useState(true);
  const [hasWell, setHasWell] = useState(false);
  const [hasEV, setHasEV] = useState(false);

  const out = useMemo(() => {
    let kw = 0;
    if (coverage === "whole") {
      kw = sqft <= 1500 ? 14 : sqft <= 2500 ? 20 : sqft <= 4000 ? 26 : 38;
      if (hasAC) kw += 4;
      if (hasWell) kw += 2;
      if (hasEV) kw += 6;
    } else if (coverage === "partial") {
      kw = 10;
      if (hasAC) kw += 2;
      if (hasWell) kw += 1;
    } else {
      kw = 6;
    }
    const tier =
      kw <= 14 ? "14kW" : kw <= 20 ? "20kW" : kw <= 26 ? "26kW" : kw <= 38 ? "38kW" : "48kW+";
    const range = `$${Math.round(kw * 380).toLocaleString()} – $${Math.round(kw * 540).toLocaleString()}`;
    return { kw, tier, range };
  }, [coverage, sqft, hasAC, hasWell, hasEV]);

  return (
    <CalcShell
      icon={<Zap className="h-5 w-5" />}
      title="Kohler Generator Sizer"
      caption="Whole-home or essential-circuits — pick a Kohler tier."
      testid="calc-generator"
    >
      <div className="grid grid-cols-12 gap-4">
        <Field className="col-span-12 md:col-span-6" label="Coverage" testid="gen-coverage">
          <Select value={coverage} onValueChange={setCoverage}>
            <SelectTrigger data-testid="gen-coverage-trigger" className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whole">Whole home</SelectItem>
              <SelectItem value="partial">Partial (essentials + AC)</SelectItem>
              <SelectItem value="essentials">Essentials only</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="col-span-12 md:col-span-6" label={`Home size · ${sqft.toLocaleString()} sq ft`} testid="gen-sqft">
          <Slider
            min={800}
            max={6000}
            step={100}
            value={[sqft]}
            onValueChange={(v) => setSqft(v[0])}
            data-testid="gen-sqft-slider"
          />
        </Field>
        <div className="col-span-12 grid grid-cols-3 gap-2">
          <Toggle label="Central AC" active={hasAC} onClick={() => setHasAC((s) => !s)} testid="gen-ac" />
          <Toggle label="Well pump" active={hasWell} onClick={() => setHasWell((s) => !s)} testid="gen-well" />
          <Toggle label="EV charging" active={hasEV} onClick={() => setHasEV((s) => !s)} testid="gen-ev" />
        </div>
      </div>

      <Results>
        <Result label="Suggested Kohler tier" value={out.tier} highlight testid="gen-out-tier" />
        <Result label="Calculated load" value={`${out.kw.toFixed(0)} kW`} testid="gen-out-kw" />
        <Result label="Installed price range" value={out.range} full testid="gen-out-price" />
      </Results>
      <AttachToContact
        toolId="generator"
        label="Kohler Generator Sizing"
        summary={`${out.tier} Kohler tier (~${out.kw.toFixed(0)} kW load) — ${out.range}`}
        raw={{ coverage, sqft, has_ac: hasAC, has_well: hasWell, has_ev: hasEV, ...out }}
        testid="generator-attach"
      />
    </CalcShell>
  );
}

/* ─────────────── 5. ROI / Payback ─────────────── */
function ROICalc() {
  const [systemCost, setSystemCost] = useState(22000);
  const [monthlyBill, setMonthlyBill] = useState(180);
  const [escalation, setEscalation] = useState(3);
  const [taxCredit, setTaxCredit] = useState(true);

  const out = useMemo(() => {
    const credit = taxCredit ? systemCost * 0.30 : 0;
    const netCost = systemCost - credit;
    const yearOneSavings = monthlyBill * 12;
    let cumulative = 0;
    let payback = null;
    let savings25 = 0;
    for (let y = 1; y <= 25; y++) {
      const yearSavings = yearOneSavings * Math.pow(1 + escalation / 100, y - 1);
      cumulative += yearSavings;
      savings25 += yearSavings;
      if (payback === null && cumulative >= netCost) {
        const prev = cumulative - yearSavings;
        payback = y - 1 + (netCost - prev) / yearSavings;
      }
    }
    const lifetimeNet = savings25 - netCost;
    return { netCost, credit, payback, savings25, lifetimeNet };
  }, [systemCost, monthlyBill, escalation, taxCredit]);

  return (
    <CalcShell
      icon={<TrendingUp className="h-5 w-5" />}
      title="ROI & Payback Estimator"
      caption="See your payback period, 25-year savings, and net return."
      testid="calc-roi"
    >
      <div className="grid grid-cols-12 gap-4">
        <Field className="col-span-12 md:col-span-6" label="System cost ($)" testid="roi-cost">
          <Input
            type="number"
            value={systemCost}
            onChange={(e) => setSystemCost(Number(e.target.value))}
            className="font-mono"
            data-testid="roi-cost-input"
          />
        </Field>
        <Field className="col-span-12 md:col-span-6" label="Avg. monthly bill ($)" testid="roi-bill">
          <Input
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="font-mono"
            data-testid="roi-bill-input"
          />
        </Field>
        <Field className="col-span-12 md:col-span-6" label={`Utility rate escalation · ${escalation}%/yr`} testid="roi-esc">
          <Slider
            min={0}
            max={6}
            step={0.5}
            value={[escalation]}
            onValueChange={(v) => setEscalation(v[0])}
            data-testid="roi-esc-slider"
          />
          <Hint>National avg. has been ~3% / year for two decades.</Hint>
        </Field>
        <Field className="col-span-12 md:col-span-6" label="30% Federal Tax Credit" testid="roi-credit">
          <Toggle
            label={taxCredit ? "Including ITC (-30%)" : "Excluded"}
            active={taxCredit}
            onClick={() => setTaxCredit((s) => !s)}
            testid="roi-credit-toggle"
            full
          />
        </Field>
      </div>

      <Results>
        <Result label="Net cost after credit" value={`$${out.netCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} testid="roi-out-net" />
        <Result
          label="Payback period"
          value={out.payback ? `${out.payback.toFixed(1)} yrs` : ">25 yrs"}
          highlight
          testid="roi-out-payback"
        />
        <Result label="25-year savings" value={`$${out.savings25.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} testid="roi-out-savings" />
        <Result
          label="Lifetime net return"
          value={`$${out.lifetimeNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          full
          testid="roi-out-lifetime"
        />
      </Results>
      <AttachToContact
        toolId="roi"
        label="ROI & Payback"
        summary={`Payback ${out.payback ? out.payback.toFixed(1) + " yrs" : ">25 yrs"}, 25-yr savings $${out.savings25.toLocaleString(undefined,{maximumFractionDigits:0})}, lifetime net $${out.lifetimeNet.toLocaleString(undefined,{maximumFractionDigits:0})}`}
        raw={{ system_cost: systemCost, monthly_bill: monthlyBill, escalation, tax_credit: taxCredit, ...out }}
        testid="roi-attach"
      />
    </CalcShell>
  );
}

/* ─────────────── Attach-to-contact CTA ─────────────── */
function AttachToContact({ toolId, label, summary, raw, testid }) {
  const navigate = useNavigate();
  const handle = () => {
    saveCalcResult(toolId, label, summary, raw);
    toast.success("Estimate attached. We'll include it with your request.");
    navigate("/contact");
  };
  return (
    <div className="mt-5 flex items-center justify-end">
      <button
        type="button"
        onClick={handle}
        data-testid={testid}
        className="group inline-flex items-center gap-2 bg-forest text-bone px-5 py-2.5 rounded-sm hover:bg-amber hover:text-ink transition-colors text-xs font-mono uppercase tracking-wider"
      >
        <Paperclip className="h-3.5 w-3.5" />
        Attach &amp; request estimate
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

/* ─────────────── Shared subcomponents ─────────────── */
function CalcShell({ icon, title, caption, testid, children }) {
  return (
    <div data-testid={testid} className="bg-bone border border-line p-6 lg:p-8">
      <div className="flex items-start justify-between border-b border-line pb-5 mb-6">
        <div>
          <div className="label-tag text-amberDark mb-2 flex items-center gap-2">
            {icon} Tool
          </div>
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-ink2 mt-1">{caption}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children, className = "", testid }) {
  return (
    <div data-testid={testid} className={className}>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function FieldLabel({ children }) {
  return <Label className="label-tag text-ink2">{children}</Label>;
}

function Hint({ children }) {
  return <p className="mt-1.5 text-[11px] text-ink2/70 font-mono">{children}</p>;
}

function Toggle({ label, active, onClick, testid, full = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testid}
      className={`px-4 py-3 text-sm border transition-colors ${full ? "w-full" : ""} ${
        active
          ? "bg-ink text-bone border-ink"
          : "bg-bone text-ink border-line hover:border-amber"
      }`}
    >
      {label}
    </button>
  );
}

function Results({ children }) {
  return (
    <div className="mt-8 grid grid-cols-12 gap-px bg-line border border-line">
      {children}
    </div>
  );
}

function Result({ label, value, highlight = false, full = false, testid }) {
  return (
    <div
      data-testid={testid}
      className={`bg-bone p-5 ${full ? "col-span-12" : "col-span-6 md:col-span-4"} ${
        highlight ? "bg-forest text-bone" : ""
      }`}
    >
      <div className={`label-tag mb-2 ${highlight ? "text-amber" : "text-ink2/70"}`}>
        {label}
      </div>
      <div
        className={`font-mono font-bold tracking-tight ${
          highlight ? "text-3xl text-bone" : "text-xl text-ink"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* ─────────────── Main wrapper ─────────────── */
export default function Calculators() {
  return (
    <section
      id="calculators"
      data-testid="calculators-section"
      className="relative bg-bone2 py-16 lg:py-20 grid-lines"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <Tabs defaultValue="solar" className="w-full">
          <TabsList
            data-testid="calc-tabs"
            className="bg-bone border border-line h-auto p-1 flex flex-wrap gap-1 justify-start mb-6 rounded-none"
          >
            <CalcTab value="solar" icon={<Sun className="h-3.5 w-3.5" />} label="Solar size" />
            <CalcTab value="battery" icon={<Battery className="h-3.5 w-3.5" />} label="Battery backup" />
            <CalcTab value="mount" icon={<MountainSnow className="h-3.5 w-3.5" />} label="Mount type" />
            <CalcTab value="generator" icon={<Zap className="h-3.5 w-3.5" />} label="Generator" />
            <CalcTab value="roi" icon={<TrendingUp className="h-3.5 w-3.5" />} label="ROI / Payback" />
          </TabsList>
          <TabsContent value="solar"><SolarCalc /></TabsContent>
          <TabsContent value="battery"><BatteryCalc /></TabsContent>
          <TabsContent value="mount"><MountCalc /></TabsContent>
          <TabsContent value="generator"><GeneratorCalc /></TabsContent>
          <TabsContent value="roi"><ROICalc /></TabsContent>
        </Tabs>

        <div className="mt-10 flex items-center justify-between flex-wrap gap-4 border-t border-line pt-8">
          <p className="text-sm text-ink2 max-w-xl">
            Like what you see? Share these results with us — we'll refine
            them with your actual roof, bills, and goals during a free
            site visit.
          </p>
          <a
            href="/contact"
            data-testid="calc-cta-quote"
            className="group inline-flex items-center gap-2 bg-ink text-bone px-6 py-3 rounded-sm hover:bg-amber hover:text-ink transition-colors text-sm font-medium"
          >
            Get a free estimate
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CalcTab({ value, icon, label }) {
  return (
    <TabsTrigger
      value={value}
      data-testid={`calc-tab-${value}`}
      className="rounded-none px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-ink2 data-[state=active]:bg-ink data-[state=active]:text-bone data-[state=active]:shadow-none flex items-center gap-2"
    >
      {icon}
      {label}
    </TabsTrigger>
  );
}
