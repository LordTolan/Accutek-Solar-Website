/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1320px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        ambient: "0 8px 30px rgba(29,48,37,0.08)",
        "ambient-lg": "0 20px 60px rgba(29,48,37,0.12)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: 0, transform: "translateY(12px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
