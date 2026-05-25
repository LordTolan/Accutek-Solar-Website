import { API } from "./utils";

async function request<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    let detail = "Request failed";
    try {
      const data = await res.json();
      detail = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

export const api = {
  getCompany: () => request<any>("/public/company-info"),
  getServiceArea: () => request<{ counties: any[] }>("/public/service-area"),
  getCounty: (slug: string) => request<any>(`/public/service-area/${slug}`),
  getTestimonials: () => request<{ testimonials: any[] }>("/public/testimonials"),
  getFaq: () => request<{ faqs: any[] }>("/public/faq"),
  qualify: (body: any) => request<any>("/leads/qualify", { method: "POST", body: JSON.stringify(body) }),
  submitLead: (body: any) => request<any>("/leads/submit", { method: "POST", body: JSON.stringify(body) }),
  login: (email: string, password: string) =>
    request<any>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request<any>("/auth/logout", { method: "POST" }),
  me: () => request<any>("/auth/me"),
  refresh: () => request<any>("/auth/refresh", { method: "POST" }),
  listLeads: (params: Record<string, string> = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request<{ leads: any[]; count: number }>(`/leads${qs ? "?" + qs : ""}`);
  },
  getLead: (id: string) => request<any>(`/leads/${id}`),
  updateLead: (id: string, status: string) =>
    request<any>(`/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  syncHcp: (id: string) => request<any>(`/leads/${id}/sync-hcp`, { method: "POST" }),
  stats: () => request<any>("/admin/stats"),

  // Site settings (admin)
  getSettings: () => request<any>("/admin/settings"),
  setHolidayOverride: (force_active: boolean, theme_name = "fourth-of-july") =>
    request<any>("/admin/settings/holiday-theme", {
      method: "PUT",
      body: JSON.stringify({ force_active, theme_name }),
    }),

  // Public holiday theme check
  getHolidayTheme: () => request<any>("/public/holiday-theme"),
};
