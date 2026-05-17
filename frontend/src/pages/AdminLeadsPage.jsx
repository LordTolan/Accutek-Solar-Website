import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { COMPANY } from "@/lib/site-data";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import {
  Loader2,
  LogOut,
  Download,
  RefreshCw,
  Search,
  Phone,
  Mail,
  FileText,
  Building2,
  Home,
} from "lucide-react";

const TABS = [
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
];

function fmtDate(s) {
  if (!s) return "—";
  try {
    const d = new Date(s);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return s;
  }
}

export default function AdminLeadsPage() {
  const { user, logout, token, adminFetch } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("commercial");
  const [residential, setResidential] = useState([]);
  const [commercial, setCommercial] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [r, c, s] = await Promise.all([
        adminFetch("/admin/leads"),
        adminFetch("/admin/commercial-leads"),
        adminFetch("/admin/stats"),
      ]);
      setResidential(r.data || []);
      setCommercial(c.data || []);
      setStats(s.data || null);
    } catch (err) {
      toast.error("Failed to load leads — your session may have expired.");
      logger.error(err);
    } finally {
      setLoading(false);
    }
  }, [adminFetch]);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const downloadSitePlan = async (lead) => {
    try {
      const res = await adminFetch(`/admin/commercial-leads/${lead.id}/site-plan`, {
        method: "get",
        responseType: "blob",
      });
      const blob = res.data;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = lead.site_plan?.filename || `site-plan-${lead.id}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Download failed.");
    }
  };

  const filtered = useMemo(() => {
    const src = tab === "commercial" ? commercial : residential;
    if (!query.trim()) return src;
    const q = query.trim().toLowerCase();
    return src.filter((r) =>
      [r.name, r.email, r.phone, r.company, r.message, r.facility_type, r.existing_system_brand, r.address]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [tab, commercial, residential, query]);

  return (
    <main data-testid="admin-leads-page" className="min-h-screen bg-bone2 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="label-tag text-amberDark mb-2">— Admin dashboard</p>
            <h1 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-[1.05]">
              Incoming leads.
            </h1>
            <p className="mt-2 text-sm text-ink2">
              Signed in as <strong className="font-mono">{user?.email}</strong> ·{" "}
              <button
                onClick={handleLogout}
                data-testid="admin-logout"
                className="inline-flex items-center gap-1 hover:text-amberDark transition-colors"
              >
                <LogOut className="h-3 w-3" /> sign out
              </button>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 text-ink2 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                data-testid="admin-search"
                className="h-10 pl-9 pr-3 bg-bone border border-line rounded-sm text-sm w-full md:w-64 focus:outline-none focus:border-forest"
              />
            </div>
            <button
              onClick={load}
              data-testid="admin-refresh"
              className="h-10 px-3 border border-line bg-bone hover:border-forest flex items-center justify-center rounded-sm"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard
              testid="admin-stat-residential"
              label="Residential"
              value={stats.residential_leads}
              icon={<Home className="h-4 w-4" />}
            />
            <StatCard
              testid="admin-stat-commercial"
              label="Commercial"
              value={stats.commercial_leads}
              icon={<Building2 className="h-4 w-4" />}
              highlight
            />
            <StatCard
              testid="admin-stat-with-attachment"
              label="With attachment"
              value={stats.commercial_with_attachment}
              icon={<FileText className="h-4 w-4" />}
            />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 border-b border-line mb-0" data-testid="admin-tabs">
          {TABS.map((t) => {
            const count =
              t.id === "commercial" ? commercial.length : residential.length;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                data-testid={`admin-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors -mb-px ${
                  active
                    ? "border-forest text-ink bg-bone"
                    : "border-transparent text-ink2 hover:text-ink"
                }`}
              >
                {t.label}{" "}
                <span className={`ml-1 ${active ? "text-amberDark" : "text-ink2/60"}`}>
                  · {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-bone border border-line overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-forest" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-ink2">
              No {tab} leads {query && "match your search"}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="admin-table">
                <thead>
                  <tr className="bg-bone2 border-b border-line">
                    <Th>When</Th>
                    <Th>Name</Th>
                    <Th>Contact</Th>
                    {tab === "commercial" && <Th>Company / Facility</Th>}
                    <Th>{tab === "commercial" ? "Project" : "Interest"}</Th>
                    <Th>Consent</Th>
                    {tab === "commercial" && <Th>File</Th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.id || i}
                      data-testid={`admin-row-${i}`}
                      className="border-b border-line last:border-b-0 hover:bg-bone2/50 transition-colors"
                    >
                      <Td>
                        <div className="font-mono text-xs text-ink2">{fmtDate(r.created_at)}</div>
                      </Td>
                      <Td>
                        <div className="font-semibold text-ink">{r.name || "—"}</div>
                        {r.title && <div className="text-xs text-ink2">{r.title}</div>}
                      </Td>
                      <Td>
                        <div className="space-y-1">
                          {r.email && (
                            <a
                              href={`mailto:${r.email}`}
                              className="flex items-center gap-1.5 text-xs text-forest hover:text-amberDark break-all"
                            >
                              <Mail className="h-3 w-3" /> {r.email}
                            </a>
                          )}
                          {r.phone && (
                            <a
                              href={`tel:${r.phone}`}
                              className="flex items-center gap-1.5 text-xs text-forest hover:text-amberDark"
                            >
                              <Phone className="h-3 w-3" /> {r.phone}
                            </a>
                          )}
                        </div>
                      </Td>
                      {tab === "commercial" && (
                        <Td>
                          <div className="text-sm text-ink">{r.company || "—"}</div>
                          {r.facility_type && (
                            <div className="label-tag text-ink2 mt-0.5">
                              {r.facility_type}
                              {r.facility_size && ` · ${r.facility_size} sq ft`}
                            </div>
                          )}
                          {r.address && (
                            <div className="text-xs text-ink2 mt-1">{r.address}</div>
                          )}
                        </Td>
                      )}
                      <Td>
                        {tab === "commercial" ? (
                          <div className="max-w-md">
                            {r.critical_loads && (
                              <div className="text-xs text-ink line-clamp-3">{r.critical_loads}</div>
                            )}
                            {r.existing_system_brand && (
                              <div className="label-tag text-amberDark mt-1">
                                brand: {r.existing_system_brand}
                              </div>
                            )}
                            {r.timeline && (
                              <div className="label-tag text-ink2 mt-0.5">
                                timeline: {r.timeline}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <span className="inline-block px-2 py-0.5 text-[11px] font-mono bg-bone2 border border-line">
                              {r.interest || "general"}
                            </span>
                            {r.monthly_bill != null && (
                              <div className="text-xs text-ink2 mt-1">
                                bill: ${r.monthly_bill}
                              </div>
                            )}
                            {r.message && (
                              <div className="text-xs text-ink mt-1 line-clamp-2 max-w-xs">
                                {r.message}
                              </div>
                            )}
                          </div>
                        )}
                      </Td>
                      <Td>
                        {r.consent_communications ? (
                          <span className="inline-block px-2 py-0.5 text-[11px] font-mono bg-forest/10 text-forest border border-forest/40">
                            ✓ {r.consent_timestamp ? fmtDate(r.consent_timestamp) : ""}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-destructive">—</span>
                        )}
                      </Td>
                      {tab === "commercial" && (
                        <Td>
                          {r.site_plan ? (
                            <button
                              onClick={() => downloadSitePlan(r)}
                              data-testid={`admin-download-${i}`}
                              title={r.site_plan.filename}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono border border-forest text-forest hover:bg-forest hover:text-bone rounded-sm transition-colors"
                            >
                              <Download className="h-3 w-3" />
                              {(r.site_plan.size_bytes / 1024).toFixed(0)} KB
                            </button>
                          ) : (
                            <span className="text-[11px] text-ink2">—</span>
                          )}
                        </Td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-ink2 font-mono">
          {COMPANY.name} · internal tool · session expires after 8 hours
        </p>
      </div>
    </main>
  );
}

function Th({ children }) {
  return (
    <th className="text-left px-4 py-3 label-tag text-ink2 font-mono">{children}</th>
  );
}
function Td({ children }) {
  return <td className="px-4 py-4 align-top">{children}</td>;
}

function StatCard({ label, value, icon, highlight, testid }) {
  return (
    <div
      data-testid={testid}
      className={`border p-4 ${
        highlight ? "bg-forest text-bone border-forest" : "bg-bone border-line text-ink"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`label-tag ${highlight ? "text-amber" : "text-ink2"}`}>{label}</span>
        {icon}
      </div>
      <div className="font-mono text-2xl lg:text-3xl font-bold">{value}</div>
    </div>
  );
}
