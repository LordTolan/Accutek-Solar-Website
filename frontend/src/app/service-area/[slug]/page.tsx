import CountyPageClient from "./CountyPageClient";

/**
 * Static-export requires every dynamic route to declare the set of
 * params that should be pre-rendered.  We try to fetch the list from
 * the backend; if the API is unreachable at build time we fall back
 * to a hard-coded set so the HTML files still get generated.
 */

const FALLBACK_SLUGS = [
  "vigo",
  "clay",
  "parke",
  "vermillion",
  "sullivan",
  "putnam",
  "owen",
  "greene",
  "monroe",
  "morgan",
  "hendricks",
  "marion",
  "johnson",
  "bartholomew",
  "knox",
  "clark-il",
  "edgar",
];

export async function generateStaticParams() {
  const api =
    process.env.REACT_APP_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "";

  if (api) {
    try {
      const res = await fetch(`${api}/api/public/service-area`, {
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const data = await res.json();
        const counties: { slug: string }[] = data.counties || [];
        if (counties.length > 0) {
          return counties.map((c) => ({ slug: c.slug }));
        }
      }
    } catch {
      // API unavailable at build time — use fallback list
    }
  }

  return FALLBACK_SLUGS.map((s) => ({ slug: s }));
}

export default function CountyPage() {
  return <CountyPageClient />;
}
