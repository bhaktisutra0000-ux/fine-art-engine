## What we're building

A single-page marketing site for **Elementum** (creative studio), matching the Figma design at pixel accuracy on desktop and gracefully adapting down to tablet and mobile. Award-worthy motion throughout (scroll reveals, marquee, parallax portraits, animated underline/highlight strokes, magnetic hover).

Rebuilding `src/routes/index.tsx` (the placeholder). Single route — the design is one long scrolling page.

## Sections (top → bottom, from Figma)

1. **Nav** — "Elementum" wordmark left, center links (Home · Studio · Services · Contact · FAQ's), hamburger right.
2. **Hero** — huge display headline "The **thinkers** and doers were changing the **status** Quo with…" with hand-drawn yellow underline strokes and mint/pink highlight pills behind selected words, sub-copy, then a scattered composition of 7 circular team portraits at varying sizes/positions.
3. **Feature Row A** — "Tomorrow should be better than today" (highlighted "today") + copy + Read more arrow, with large circular boardroom photo right.
4. **Feature Row B** — mirrored: circular photo left, "See how we can help you progress" right.
5. **Services** — big heading "What we can offer you!"; three list rows (Collaborative & partnership / We talk about our weight / Piloting digital confidence), each with small left label + big title + right arrow, hover state animates the arrow and reveals a preview image.
6. **Testimonials** — "What our customer says About Us" with mint quote card center and scattered circular avatars around, prev/next.
7. **Footer / CTA** — mint background "Subscribe to our newsletter" + Subscribe Now pill button, then 4-column footer (Company / Terms & Policies / Follow Us / Contact), copyright.

## Design system

- **Fonts:** Gerbil (display headings), Satoshi (body + nav), Friends (accents). Load via Fontshare `<link>` in `__root.tsx` head — free CDN, covers all three.
- **Palette (from Figma):** background `#FFFFFF`, ink `#000000`, mint highlight `#CFEBD1`, pink highlight `#F6C3D0`, yellow stroke `#F1B12E`, footer mint `#D6EED8`, muted body `#333`.
- **Tokens** in `src/styles.css` as HSL vars: `--background`, `--foreground`, `--accent-mint`, `--accent-pink`, `--accent-yellow`, `--surface-mint`. All components read tokens — no hardcoded colors.
- **Radius:** fully rounded pills for buttons/highlights; large circle masks for imagery.
- SVG components for the hand-drawn underline and highlight-pill shapes so they can animate stroke length / scaleX.

## Responsive breakpoints

- Desktop ≥1280px: matches Figma 1920 layout (scaled).
- Tablet 768–1279px: hero headline reflows to 3 lines, portraits reduce to 5, feature rows stack image-then-text.
- Mobile <768px: single column, nav collapses to hamburger drawer, portraits become a horizontal marquee, service rows become tap-cards, footer columns stack 2×2.

## Motion (level 4)

Framer Motion + a small GSAP ScrollTrigger for the marquee/parallax.

- Nav: slides down on load; blurred glass background appears after 40px scroll.
- Hero headline: per-word mask reveal on load. Yellow stroke draws in with `pathLength`. Highlight pills scale from 0 width to full after word settles.
- Portraits: staggered fade+scale in from their scattered positions; gentle continuous float loop; parallax Y on scroll.
- Feature rows: image scales from 0.85 with clip-circle reveal; text words stagger up when in view.
- Services rows: on hover, left label slides right, title shifts, arrow extends; underline sweeps across.
- Testimonials: card fade+lift; avatars orbit slightly on scroll; swipeable carousel.
- Footer CTA: heading letters mask-reveal; Subscribe Now button has magnetic hover.
- Respects `prefers-reduced-motion`.

## Assets

Portraits (17 total across sections) generated as square photo-real portraits via `imagegen` (fast tier) with transparent-free jpg — batched in parallel. Boardroom/laptop scene photos likewise generated at 1024². All saved under `src/assets/`.

## Files touched

```
src/routes/__root.tsx         head(): title/desc/OG, Fontshare <link>
src/routes/index.tsx          full page composition
src/styles.css                design tokens (mint/pink/yellow), font faces
src/components/site/
  Nav.tsx
  Hero.tsx
  HighlightPill.tsx           animated SVG pill
  UnderlineStroke.tsx         animated SVG stroke
  PortraitCluster.tsx
  FeatureRow.tsx
  Services.tsx
  Testimonials.tsx
  FooterCTA.tsx
src/lib/motion.ts             shared variants, reduced-motion helper
src/assets/portraits/*.jpg    generated
src/assets/scenes/*.jpg       generated
```

Dependency add: `motion` (framer-motion successor) and `gsap` via `bun add`.

## Technical notes

- Everything client-side; no server functions, no DB — pure presentation.
- SSR-safe: motion components hydrate cleanly, GSAP registered in `useEffect`.
- SEO: real title "Elementum — Thinkers and doers changing the status quo", meta description, og tags in root head.
- Semantic HTML: `<header><main><section><footer>`, single H1 in hero, alt text on every portrait.

## Out of scope

Nav routes (Studio/Services/Contact/FAQ pages) — links are anchor scrolls on this page only, since Figma contains just this one layout. Can add as separate routes in a follow-up.
