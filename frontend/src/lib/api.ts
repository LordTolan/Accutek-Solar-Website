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
  // Public holiday theme check
  getHolidayTheme: () => request<any>("/public/holiday-theme"),

  // Sunny Chatbot
  chatWithSunny: (message: string, history: Array<{ role?: string; sender?: string; text: string }> = []) =>
    request<{
      reply: string;
      source: string;
      suggested_links: Array<{ label: string; url: string }>;
      faq_match?: string;
    }>("/chat/sunny", {
      method: "POST",
      body: JSON.stringify({ message, history }),
    }),
  getSunnyFaqs: () => request<{ faqs: Array<{ id: string; question: string }> }>("/chat/sunny/faqs"),
};
