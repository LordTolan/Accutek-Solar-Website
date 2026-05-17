// Thin wrapper around console so we don't pollute production logs.
// In development we get full noise; in production we silently swallow info/warn
// and still surface errors so Sentry/PostHog can capture them later if hooked up.
const isProd = process.env.NODE_ENV === "production";

export const logger = {
  warn: (...args) => {
    if (isProd) return;
    // eslint-disable-next-line no-console
    console.warn(...args);
  },
  error: (...args) => {
    // eslint-disable-next-line no-console
    console.error(...args);
  },
  info: (...args) => {
    if (isProd) return;
    // eslint-disable-next-line no-console
    console.info(...args);
  },
};
