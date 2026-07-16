import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://accutek-solar-api.onrender.com";

export const API = \`\${BACKEND_URL}/api\`;

// Housecall Pro direct online-booking URL (provided by Donna)
export const HCP_BOOK_URL = "https://book.housecallpro.com/book/Accutek-Solar/a610e2efa0494a03ae59009369f2a058?v2=true";

// Housecall Pro Customer Portal URL
export const HCP_PORTAL_URL = "https://client.housecallpro.com#customer_portal/request-link?token=d2cca52d5dc74361b2c484f1306b70df";

export function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
