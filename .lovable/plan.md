## Goal
Rebuild the landing page to be truly pixel-perfect to the Figma file — correct fonts (Gerbil / Satoshi / Friends), exact colors, exact spacing, and the real background details (dotted grid, decorative circles, scattered polygons) that are currently missing or approximated.

## Issues found in current build vs Figma

1. **Fonts are wrong.**
   - Currently: `Fraunces` (display), `Satoshi` (body), `Caveat` (accent).
   - Figma specifies: **Gerbil** (display headings), **Satoshi** (body/nav), **Friends** (accents / cursive bits).
   - Fraunces is a serif; Gerbil is a rounded quirky sans — the entire hero looks wrong because of this single substitution. Caveat is also not Friends.

2. **Colors drift from Figma hex values.**
   - Currently defined in `oklch` approximations. Figma uses exact hex: mint `#CFEBD1`, pink `#F6C3D0`, yellow stroke `#F1B12E`, footer surface `#D6EED8`, ink `#111`.
   - Need to store these as exact hex (or exact oklch of those hex values) so highlight pills and footer match the file.

3. **Background is plain white** — Figma has:
   - A subtle **dotted grid** behind the hero.
   - Small **decorative shapes** (yellow zigzag, mint circle outline, pink dot cluster, tiny stars) scattered around headline and portraits.
   - Currently replaced with blurred color blobs — those are wrong.

4. **Circles / portraits sizes and positions are approximated**, not measured from Figma. Need to read each portrait node's x/y/w/h and reproduce with `position: absolute` on a fixed-aspect stage.

5. **Spacing is off.** Hero top padding, gaps between sections, feature-row image size, services row height, footer padding — none match Figma's measured values.

6. **Highlight pills & underline stroke** — currently generic SVGs. Figma has specific hand-drawn stroke shape (yellow marker underline) and specific pill radius/skew. Need to re-extract these as SVG assets from Figma.

## Plan

### 1. Fonts (real Gerbil + Friends)
- Gerbil and Friends are not on Google Fonts / Fontshare. Fetch the woff2 files that the Figma prototype uses (they're linked in the file's exported assets) or use their commercial CDN if the file references one. If unavailable, fetch the two typefaces from their vendor pages via the Figma API's image export of type samples and self-host as `@font-face` under `src/assets/fonts/`, uploaded via `lovable-assets`.
- Update `src/styles.css`:
  ```css
  --font-display: "Gerbil", ui-sans-serif, system-ui, sans-serif;
  --font-sans:    "Satoshi", ui-sans-serif, system-ui, sans-serif;
  --font-accent:  "Friends", "Caveat", cursive;
  ```
- Remove Google Fonts `Fraunces` + `Caveat` links from `__root.tsx`; keep Satoshi from Fontshare; add local `@font-face` blocks for Gerbil and Friends.

### 2. Exact color tokens
Replace approximated `oklch` values in `src/styles.css` with exact Figma hex:
```
--mint:         #CFEBD1
--pink:         #F6C3D0
--yellow:       #F1B12E
--surface-mint: #D6EED8
--ink:          #111111
--muted-fg:     #4B4B4B
```

### 3. Rebuild background layer (`HeroBackdrop.tsx`)
- Dotted grid: repeating radial-gradient, dot color `#00000010`, spacing measured from Figma (~24px).
- Decorative shapes extracted from Figma as inline SVGs (yellow squiggle, mint outline circle, pink dot cluster, 4-point star). Positioned absolutely at measured coordinates.
- Remove the current blurred blobs in `Hero.tsx`.

### 4. Re-measure and reposition
For each of these frames, re-read the Figma node JSON (already have `figd_...` token + file id) and extract `absoluteBoundingBox` for every child:
- Nav (link gaps, wordmark size)
- Hero headline (font-size in px per breakpoint, line-height, letter-spacing)
- Portrait cluster (7 portraits — x/y/diameter each)
- Feature rows (image circle diameter, text column width, gap)
- Services rows (row height, label size, arrow position)
- Testimonials card (width, padding, avatar positions)
- Footer (mint block height, subscribe pill dimensions, column gaps)

Encode these as CSS custom properties keyed off a `1440px` design width and scale with `clamp()` so the layout is truly proportional to the Figma frame, not eyeballed.

### 5. Highlight pills & underline stroke
- Re-export the yellow underline stroke SVG path directly from Figma (it's a vector node). Replace the generic path in `UnderlineStroke.tsx`.
- Pill: measure exact border-radius (fully rounded) and horizontal padding from Figma; adjust `HighlightPill.tsx`.

### 6. Verification pass
- Run Playwright at 1440×900, screenshot the built page section by section, and diff visually against the rendered Figma frames already saved in `src/assets/figma/`. Iterate until each section matches.
- Also verify at 768 and 375 viewports (tablet, mobile).

## Files touched
- `src/routes/__root.tsx` — swap font links.
- `src/styles.css` — exact color tokens, `@font-face` for Gerbil + Friends, dotted-grid utility.
- `src/components/site/HeroBackdrop.tsx` — new, dot grid + decorative SVGs.
- `src/components/site/Hero.tsx` — remove blobs, use backdrop, apply measured sizes.
- `src/components/site/PortraitCluster.tsx` — absolute positions from Figma.
- `src/components/site/FeatureRow.tsx`, `Services.tsx`, `Testimonials.tsx`, `FooterCTA.tsx` — apply measured spacing / sizes.
- `src/components/site/UnderlineStroke.tsx`, `HighlightPill.tsx` — real vector paths.
- `src/assets/fonts/` — Gerbil + Friends woff2 (uploaded via lovable-assets).

## Out of scope
- Adding new pages or routes.
- Any backend / data work.
- Changing copy.

## Open question
Gerbil and Friends are commercial fonts. If they can't be located from a free/self-host source or from the Figma file's embedded assets, the closest free substitutes will be used: **Rubik** or **Sofia Sans Condensed** for Gerbil, **Shadows Into Light Two** for Friends — and the swap will be called out clearly. Preference?
