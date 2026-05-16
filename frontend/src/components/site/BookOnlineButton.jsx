import React from "react";
import { CalendarCheck } from "lucide-react";

const HCP_TOKEN = "a610e2efa0494a03ae59009369f2a058";
const HCP_ORG = "Accutek-Solar";
// Standalone booking page (works in a top-level tab). The
// `online-booking.housecallpro.com/?token=...` URL is iframe-only and returns
// AccessDenied if you navigate to it directly — don't use it as a fallback.
const HCP_STANDALONE_URL = `https://book.housecallpro.com/book/${HCP_ORG}/${HCP_TOKEN}?v2=true`;

/**
 * Housecall Pro online booking trigger.
 * Calls window.HCPWidget.openModal() — the script is loaded once in /public/index.html.
 * If the async script hasn't loaded yet, briefly waits for it; if it still
 * isn't there, opens the standalone booking page in a new tab.
 */
export default function BookOnlineButton({
  variant = "primary", // primary | outline-light | outline-dark | pill
  size = "md", // md | lg | sm
  className = "",
  testid = "book-online",
  label = "Book online",
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    if (window.HCPWidget?.openModal) {
      window.HCPWidget.openModal();
      return;
    }

    // Async script not loaded yet — poll briefly (up to ~1.5s), then fall back
    let tries = 0;
    const maxTries = 15;
    const interval = setInterval(() => {
      tries += 1;
      if (window.HCPWidget?.openModal) {
        clearInterval(interval);
        window.HCPWidget.openModal();
      } else if (tries >= maxTries) {
        clearInterval(interval);
        window.open(HCP_STANDALONE_URL, "_blank", "noopener,noreferrer");
      }
    }, 100);
  };

  const variants = {
    primary:
      "bg-amber text-ink hover:bg-bone hover:text-ink",
    "outline-light":
      "border border-bone/40 text-bone hover:bg-bone hover:text-ink",
    "outline-dark":
      "border border-forest text-forest hover:bg-forest hover:text-bone",
    pill:
      "bg-amber text-ink hover:bg-bone hover:text-ink rounded-full px-5",
  };
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-sm",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid={testid}
      data-token={HCP_TOKEN}
      data-orgname={HCP_ORG}
      className={`hcp-button group inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-colors ${
        variant === "pill" ? "" : ""
      } ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <CalendarCheck className="h-4 w-4" />
      {label}
    </button>
  );
}
