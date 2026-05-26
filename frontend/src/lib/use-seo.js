import { useEffect } from "react";

const SITE = "Accutek Solar";
const ORIGIN = "https://www.accuteksolar.com";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-page SEO updates. Mutates <title>, <meta name="description">,
 * Open Graph + Twitter tags and the canonical link on mount.
 *
 * Pass `path` (e.g. "/services") so we can build a canonical URL.
 */
export default function useSEO({ title, description, path = "/", image } = {}) {
  useEffect(() => {
    if (title) {
      document.title = title.includes(SITE) ? title : `${title} | ${SITE}`;
    }
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }
    if (title) {
      setMeta("og:title", title.includes(SITE) ? title : `${title} | ${SITE}`, "property");
      setMeta("twitter:title", title);
    }
    const canonical = `${ORIGIN}${path}`;
    setCanonical(canonical);
    setMeta("og:url", canonical, "property");
    if (image) {
      setMeta("og:image", image.startsWith("http") ? image : `${ORIGIN}${image}`, "property");
      setMeta("twitter:image", image.startsWith("http") ? image : `${ORIGIN}${image}`);
    }
  }, [title, description, path, image]);
}
