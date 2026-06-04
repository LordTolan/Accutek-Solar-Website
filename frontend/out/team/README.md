# /team — Headshot drop folder

Place real JPGs here using the slug-based filename convention used by
`/src/app/about/page.tsx` and `/src/components/TeamMemberCard.tsx`.

## Expected files

| File                    | Person                                      |
|-------------------------|---------------------------------------------|
| `keith-davis.jpg`       | Keith Davis — Founder                       |
| `seth-davis.jpg`        | Seth Davis — Owner · Operator               |
| `quill.jpg`             | Quill Davis — Owner · Field Operations      |
| `clint-lenover.jpg`     | Clint Lenover — Install Tech                |
| `colt.jpg`              | Colt — Lead Installer                       |
| `aj.jpg`                | AJ ("Scruff") — Solar Technician            |

## Roles

> **Owners/Operators:** Keith Davis, Seth Davis, Quill Davis  
> **Install Team:** Clint Lenover (Install Tech), Colt (Lead Installer), AJ/Scruff (Solar Technician)

## Image specs

- **Format:** `.jpg` (or `.jpeg`)
- **Aspect ratio:** square (1:1)
- **Recommended dimensions:** 800×800 px or larger
- **Background:** consistent if possible (studio off-white or on-site is fine)

## Fallback

If a file is missing or fails to load, the card automatically shows a branded
initials placeholder — the page never appears "broken."

## Adding a new team member

1. Add an entry to the `TEAM` array in `/src/app/about/page.tsx` with a slugged filename.
2. Drop the matching `.jpg` here.
3. That's it — no other code changes needed.
