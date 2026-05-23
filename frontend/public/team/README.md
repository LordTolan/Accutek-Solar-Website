# /team — Headshot drop folder

Place real JPGs here using the slug-based filename convention used by
`/src/app/about/page.tsx` and `/src/components/TeamMemberCard.tsx`.

## Expected files

| File                    | Person                          |
|-------------------------|---------------------------------|
| `clint-lenover.jpg`     | Clint Lenover — Owner & Operations           |
| `seth-davis.jpg`        | Seth Davis — Partner · Solar Specialist       |
| `colt.jpg`              | Colt — Lead Installer                         |
| `quill.jpg`             | Quill — Field Technician                      |

## Image specs

- **Format:** `.jpg` (or `.jpeg`)
- **Aspect ratio:** square (1:1)
- **Recommended dimensions:** 800×800 px or larger
- **Background:** consistent if possible (studio off-white or on-site is fine)

## Fallback

If a file is missing or fails to load, the card automatically shows a branded
initials placeholder (e.g. **CL** / **SD** / **C** / **Q**) — the page never
appears "broken."

## Adding a new team member

1. Add an entry to the `TEAM` array in `/src/app/about/page.tsx` with a
   slugged filename.
2. Drop the matching `.jpg` here.
3. That's it — no other code changes needed.
