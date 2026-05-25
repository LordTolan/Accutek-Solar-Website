"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { Loader2, LogOut, RefreshCcw, Filter, Search, Send, CheckCircle2, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

const TIER_STYLES: Record<string, string> = {
  hot: "bg-primary text-primary-foreground shadow-green-glow",
  warm: "bg-secondary text-secondary-foreground",
  nurture: "bg-muted text-foreground border border-border",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [filterTier, setFilterTier] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [holidayForced, setHolidayForced] = useState(false);
  const [holidayThemeName, setHolidayThemeName] = useState("fourth-of-july");
  const [holidayLoading, setHolidayLoading] = useState(false);

  async function refreshHolidaySettings() {
    try {
      const s = await api.getSettings();
      if (s?.holiday_theme) {
        setHolidayForced(s.holiday_theme.force_active ?? false);
        setHolidayThemeName(s.holiday_theme.theme_name ?? "fourth-of-july");
      }
    } catch {}
  }

  async function toggleHoliday() {
    setHolidayLoading(true);
    try {
      const newState = !holidayForced;
      await api.setHolidayOverride(newState, holidayThemeName);
      setHolidayForced(newState);
      toast.success(newState ? "Holiday theme activated!" : "Holiday theme deactivated");
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    } finally {
      setHolidayLoading(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filterTier) params.tier = filterTier;
      if (filterStatus) params.status = filterStatus;
      if (q) params.q = q;
      const [me, st, ls] = await Promise.all([api.me(), api.stats(), api.listLeads(params)]);
      setUser(me); setStats(st); setLeads(ls.leads);
    } catch (e: any) {
      router.push("/admin/login");
    } finally { setLoading(false); }
  }

  useEffect(() => { refresh(); refreshHolidaySettings(); }, []);
  useEffect(() => { if (user) refresh(); }, [filterTier, filterStatus]);

  async function logout() {
    try { await api.logout(); } catch {}
    setUser(null);
    router.replace("/admin/login");
  }

  async function setStatus(id: string, status: string) {
    try {
      const updated = await api.updateLead(id, status);
      setLeads((arr) => arr.map((l) => (l.id === id ? updated : l)));
      if (selected?.id === id) setSelected(updated);
      toast.success(`Status set to ${status}`);
    } catch (e: any) { toast.error(e.message); }
  }

  async function syncHcp(id: string) {
    try {
      const updated = await api.syncHcp(id);
      setLeads((arr) => arr.map((l) => (l.id === id ? updated : l)));
      if (selected?.id === id) setSelected(updated);
      toast.success(updated.hcp_sync?.mocked ? "Mock-synced to Housecall Pro" : "Synced to Housecall Pro");
    } catch (e: any) { toast.error(e.message); }
  }

  if (loading && !user) {
    return <div className="min-h-[60vh] grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <section className="py-12" data-testid="admin-dashboard">
      <div className="container mx-auto container-px max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-secondary/70">Admin</div>
            <h1 className="font-heading text-3xl md:text-4xl font-black mt-1">Leads pipeline</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{user?.email}</span>
            <button onClick={refresh} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:bg-muted focus-ring" data-testid="admin-refresh"><RefreshCcw className="w-4 h-4" /> Refresh</button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 focus-ring" data-testid="admin-logout"><LogOut className="w-4 h-4" /> Logout</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          <StatCard label="Total" value={stats?.total ?? 0} />
          <StatCard label="Today" value={stats?.today ?? 0} />
          <StatCard label="Hot" value={stats?.hot ?? 0} accent="text-primary" />
          <StatCard label="Warm" value={stats?.warm ?? 0} />
          <StatCard label="Nurture" value={stats?.nurture ?? 0} />
          <StatCard label="Won %" value={`${stats?.conversion_rate ?? 0}%`} accent="text-secondary" />
        </div>

        {/* Holiday Theme Control */}
        <div className="bg-card rounded-2xl border border-border/60 p-4 mb-6 flex items-center justify-between gap-4" data-testid="holiday-theme-control">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-red-600/20 text-red-400"><Sparkles className="w-5 h-5" /></span>
            <div>
              <div className="font-heading text-sm font-bold">Holiday Theme Preview</div>
              <div className="text-xs text-muted-foreground">Force-activate the 4th of July theme for testing (overrides date window)</div>
            </div>
          </div>
          <button
            onClick={toggleHoliday}
            disabled={holidayLoading}
            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-ring ${holidayForced ? "bg-red-600" : "bg-muted"}`}
            data-testid="holiday-toggle"
          >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${holidayForced ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl border border-border/60 p-4 mb-6 flex flex-wrap items-center gap-3" data-testid="admin-filters">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && refresh()} placeholder="Search name, email, phone…" className="bg-transparent border-0 outline-none text-sm flex-1" data-testid="admin-search" />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterTier} onChange={setFilterTier} testId="admin-tier-filter" options={[
              { v: "", l: "All tiers" }, { v: "hot", l: "Hot" }, { v: "warm", l: "Warm" }, { v: "nurture", l: "Nurture" }]} />
            <Select value={filterStatus} onChange={setFilterStatus} testId="admin-status-filter" options={[
              { v: "", l: "All status" }, { v: "new", l: "New" }, { v: "contacted", l: "Contacted" }, { v: "qualified", l: "Qualified" }, { v: "won", l: "Won" }, { v: "lost", l: "Lost" }, { v: "nurture", l: "Nurture" }]} />
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-card rounded-2xl border border-border/60 overflow-hidden" data-testid="leads-table">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="text-left p-4">Tier · Score</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Service</th>
                  <th className="text-left p-4">Est. 25yr</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && (
                  <tr><td colSpan={7} className="p-10 text-center text-muted-foreground" data-testid="leads-empty">No leads match the current filters.</td></tr>
                )}
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-border/60 hover:bg-muted/30 cursor-pointer" onClick={() => setSelected(l)} data-testid={`lead-row-${l.id}`}>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${TIER_STYLES[l.tier]}`}>{l.tier} · {l.score}</span>
                    </td>
                    <td className="p-4 font-semibold">{l.name}</td>
                    <td className="p-4 text-foreground/70">{l.email}<br/><span className="text-xs text-muted-foreground">{l.phone}</span></td>
                    <td className="p-4 capitalize">{l.answers?.service_type}</td>
                    <td className="p-4 font-bold text-primary">{formatCurrency(l.estimate?.twenty_five_year_savings ?? 0)}</td>
                    <td className="p-4"><span className="text-xs uppercase tracking-wide font-semibold">{l.status}</span></td>
                    <td className="p-4 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setSelected(null)} data-testid="lead-drawer">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" />
          <aside className="w-full max-w-lg bg-card h-full overflow-y-auto shadow-ambient-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border/60 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Lead detail</div>
                <div className="font-heading text-xl font-extrabold">{selected.name}</div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close" className="p-2 rounded-md hover:bg-muted focus-ring" data-testid="drawer-close"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5 text-sm">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${TIER_STYLES[selected.tier]}`}>{selected.tier} · score {selected.score}</span>
                <span className="text-xs uppercase font-semibold">{selected.status}</span>
              </div>
              <Row label="Email" value={selected.email} />
              <Row label="Phone" value={selected.phone} />
              <Row label="ZIP / State" value={`${selected.zip_code}${selected.state ? " · " + selected.state : ""}`} />
              <Row label="Type" value={selected.answers?.service_type} />
              <Row label="Monthly bill" value={formatCurrency(selected.answers?.monthly_bill)} />
              <Row label="Interest source" value={(selected.answers?.interest_source || "").replace(/_/g, " ")} />
              <Row label="Interest areas" value={(selected.answers?.interest_areas || []).join(", ") || "—"} />
              <Row label="Homeowner 5–7y" value={selected.answers?.homeowner_5_7y ? "Yes" : "No"} />
              <Row label="Aware credit ended" value={selected.answers?.aware_credit_ended ? "Yes" : "No"} />
              <Row label="Timeline" value={(selected.answers?.timeline || "").replace(/_/g, " ")} />

              <div className="bg-muted/40 rounded-xl p-4 space-y-1">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Estimate</div>
                <div className="font-heading text-2xl font-extrabold text-primary">{formatCurrency(selected.estimate?.twenty_five_year_savings)}</div>
                <div className="text-xs text-muted-foreground">{selected.estimate?.system_size_kw} kW · {selected.estimate?.payback_years} yr payback</div>
              </div>

              {selected.hcp_sync && (
                <div className="text-xs text-foreground/70 bg-muted rounded-xl p-3">
                  HCP: <span className="font-mono">{selected.hcp_sync.hcp_id}</span>{selected.hcp_sync.mocked ? " (mock)" : ""}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={() => setStatus(selected.id, "contacted")} className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2.5 text-sm font-bold focus-ring" data-testid="drawer-mark-contacted"><CheckCircle2 className="w-4 h-4" /> Mark contacted</button>
                <button onClick={() => syncHcp(selected.id)} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-bold focus-ring" data-testid="drawer-sync-hcp"><Send className="w-4 h-4" /> Sync to HCP</button>
                <button onClick={() => setStatus(selected.id, "won")} className="rounded-full border border-border px-4 py-2.5 text-sm font-bold focus-ring" data-testid="drawer-mark-won">Mark won</button>
                <button onClick={() => setStatus(selected.id, "lost")} className="rounded-full border border-border px-4 py-2.5 text-sm font-bold focus-ring" data-testid="drawer-mark-lost">Mark lost</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, accent = "text-foreground" }: any) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={`mt-1 font-heading text-3xl font-black ${accent}`}>{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between gap-4 py-1 border-b border-border/40 last:border-0">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      <span className="font-semibold text-right capitalize">{value ?? "—"}</span>
    </div>
  );
}

function Select({ value, onChange, options, testId }: any) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-background border border-border rounded-full px-3 py-2 text-xs font-semibold focus-ring" data-testid={testId}>
      {options.map((o: any) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}
