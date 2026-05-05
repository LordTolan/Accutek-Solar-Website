import React from "react";
import { CalendarCheck } from "lucide-react";

/**
 * Housecall Pro online booking trigger.
 * Calls window.HCPWidget.openModal() — the script is loaded once in /public/index.html.
 * Falls back to opening the booking page directly if the script isn't ready yet.
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
    if (typeof window !== "undefined" && window.HCPWidget?.openModal) {
      window.HCPWidget.openModal();
    } else {
      // Fallback while the async script is still loading
      window.open(
        "https://online-booking.housecallpro.com/?token=a610e2efa0494a03ae59009369f2a058&orgName=Accutek-Solar",
        "_blank",
        "noopener,noreferrer"
      );
    }
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
      data-token="a610e2efa0494a03ae59009369f2a058"
      data-orgname="Accutek-Solar"
      className={`hcp-button group inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-colors ${
        variant === "pill" ? "" : ""
      } ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <CalendarCheck className="h-4 w-4" />
      {label}
    </button>
  );
}
