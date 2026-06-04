# Accutek Solar Brand Style Guide (v2 · June 2026)

This guide outlines the visual identity for Accutek Solar as implemented in the current website. The brand transitioned from a light/friendly theme to a **Dark Industrial** identity in May 2026.

---

## 1. Logo

The Accutek Solar logo combines a lightbulb (innovation, clean energy) with a sun motif. Always spell the company name as **Accutek Solar** — capital A, capital S, no 'c' before 'k'.

### Logo Variants

| Variant | File | Use Case |
|---|---|---|
| Primary | `logo_primary.png` | Default use — light backgrounds |
| Horizontal | `logo_horizontal.png` | Wide-format (headers, banners) |
| Icon only | `logo_icon_only.png` | Favicon, social media profile pic |
| On green | `logo_on_green.png` | Dark or green backgrounds |
| Stacked | `logo_stacked.png` | Square print formats |

---

## 2. Color Palette

The website uses a **Dark Industrial** palette. The older light/yellow palette is deprecated for web use but may still appear in print materials.

### Website Palette (Active)

| Color | Hex | RGB | Use Case |
|---|---|---|---|
| **Matte Black** | `#1A1A1A` | `(26, 26, 26)` | Background, primary surface |
| **Forest Green** | `#1B5E20` | `(27, 94, 32)` | Secondary accents, borders |
| **Electric Green** | `#00E676` | `(0, 230, 118)` | Primary CTAs, glow effects, highlights |
| **Off-White** | `#E8E8E8` | `(232, 232, 232)` | Body text on dark |
| **Card Surface** | `#222222` | `(34, 34, 34)` | Cards, raised surfaces |
| **Border** | `#2A2A2A` | `(42, 42, 42)` | Dividers, card borders |

### Legacy Print Palette (Print Only)

| Color | Hex | Use Case |
|---|---|---|
| **Solar Yellow** | `#FFD700` | Sun character, print highlights |
| **Energy Orange** | `#FFA500` | Print CTAs |
| **Clean White** | `#FFFFFF` | Print backgrounds |
| **Neutral Gray** | `#F5F5F5` | Print secondary backgrounds |

---

## 3. Typography

### Website Typefaces

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Display / Headings | Cabinet Grotesk | Black (900) | Hero titles, section headers |
| Body / UI | Satoshi | Regular / Medium | Paragraphs, labels |
| Mono / Accents | JetBrains Mono | Regular | `// SECTION` labels, step indicators |

### Type Scale Notes
- Section labels: `text-[10px] uppercase tracking-[0.22em] font-mono text-primary` — e.g. `// ABOUT ACCUTEK`
- CTAs: `uppercase tracking-wider font-bold`
- Hero titles: `font-heading font-black text-balance`

### Legacy Print Typeface
- **Montserrat** (Bold for headings, SemiBold for subheadings, Regular for body) — used in print materials
- Fallback: Arial

---

## 4. Design Elements

### Visual Style
- **Grid overlay**: subtle CSS grid background on hero/section backgrounds (`grid-bg grid-bg-fade`)
- **Scanline + grain overlay**: on hero video section for industrial texture
- **Green glow**: `shadow-green-glow` utility on primary CTAs and key interactive elements
- **Border styling**: `border border-border` — subtle 1px borders on cards and sections

### Imagery
- Solar installs: prefer real job-site photography (roofs, ground mounts, farm arrays, panels)
- Avoid stock "smiling family pointing at solar panels" clichés
- Dark/muted Unsplash images acceptable as fallbacks
- Team photos: square (1:1), 800×800px+, consistent background preferred

---

## 5. Voice & Tone

- **Direct, practical, local** — not corporate
- **Family-owned pride** without being cutesy
- **Technical credibility** without jargon overload
- Write like someone who's been pulling wire for 32 years and has no patience for BS

### Do
- "32 years of pulling wire — and tilting it toward the sun."
- Mention Indiana, Clinton IN, Vermillion County, the counties we serve
- Talk about ground mounts and farm arrays, not just rooftops

### Don't
- Warn customers about panel heat degradation or temperature coefficients
- Make it sound like solar underperforms in summer
- Use corporate-speak ("solutions," "synergies," "world-class")

---

## 6. Print & Promotional Assets

Located in `/branding/`:
- `business_card_front.png` / `business_card_back.png`
- `letterhead.png`
- `promotional_flyer.png`
- `social_media_cover.png` / `social_media_profile.png`
- `tshirt_mockup.png`
