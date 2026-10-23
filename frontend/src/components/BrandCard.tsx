import Image from "next/image";
import Link from "next/link";

export type BrandCardData = {
  slug: string;
  name: string;
  category: string;
  url: string;
  /** Official wordmark only. Missing logos use the name as the mark. */
  logo?: string;
  label: string;
  note?: string;
};

export default function BrandCard({
  brand,
  testId,
}: {
  brand: BrandCardData;
  testId: string;
}) {
  const serviceOnly = brand.label === "Service Only";
  const className =
    "group flex min-h-[12rem] flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary hover:shadow-green-glow transition focus-ring md:min-h-[14rem] md:p-6";
  const body = (
    <>
      <div className="relative flex h-16 w-full items-center justify-center md:h-20">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={brand.name}
            width={240}
            height={96}
            className="object-contain max-h-14 md:max-h-16 max-w-full w-auto opacity-90 group-hover:opacity-100 transition"
            unoptimized
          />
        ) : (
          <div className="font-heading text-xl md:text-2xl font-black leading-none text-center text-foreground/90 group-hover:text-primary transition">
            {brand.name}
          </div>
        )}
      </div>
      <div className="text-center">
        {brand.logo ? (
          <div className="font-heading text-base md:text-lg font-bold text-foreground group-hover:text-primary transition">
            {brand.name}
          </div>
        ) : null}
        <div
          className={`text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-mono text-muted-foreground ${brand.logo ? "mt-1" : ""}`}
        >
          {brand.category}
        </div>
        <div
          className={`mt-2 text-[10px] uppercase tracking-[0.16em] font-mono ${
            serviceOnly ? "text-amber-700" : "text-primary"
          }`}
        >
          {brand.label}
        </div>
        {brand.note ? (
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">
            {brand.note}
          </div>
        ) : null}
      </div>
    </>
  );

  const label = `${brand.name} — ${brand.category}. ${brand.label}${brand.note ? `. ${brand.note}` : ""}`;

  if (brand.url.startsWith("/")) {
    return (
      <Link href={brand.url} aria-label={label} className={className} data-testid={testId}>
        {body}
      </Link>
    );
  }

  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
      data-testid={testId}
    >
      {body}
    </a>
  );
}
