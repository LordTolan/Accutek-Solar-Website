import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "";

export const API = `${BACKEND_URL}/api`;

// Housecall Pro direct online-booking URL (provided by Donna)
export const HCP_BOOK_URL = "https://book.housecallpro.com/book/Accutek-Solar/a610e2efa0494a03ae59009369f2a058?v2=true";

export function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}
