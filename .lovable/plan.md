## Goal
Elevate the Elementum landing page to a world-class, cinematic feel: buttery smooth scrolling via Lenis, a fullscreen cinematic preloader intro, and richer scroll-driven animations across every section.

## 1. Lenis smooth scroll
- Install `lenis` (successor to `@studio-freight/lenis`).
- Create `src/lib/lenis.tsx` — a `<SmoothScroll>` provider mounted in `__root.tsx` inside `RootComponent`. Initializes Lenis with `lerp: 0.1`, `duration: 1.2`, `easing: t => Math.min(1, 1.001 - 2^(-10t))`, wheel + touch multipliers tuned, `smoothWheel: true`.
- RAF loop syncs Lenis with `requestAnimationFrame`; on unmount, destroy.
- Bridge Lenis → Framer Motion: pipe `lenis.on('scroll')` into `motion`'s `useScroll` by exposing scroll offset via a context, so all existing `useScroll` / scroll-linked animations stay in sync (no double scrollbars, no jitter).
- Respect `prefers-reduced-motion`: skip Lenis init and fall back to native scroll.
- Anchor links (`#services`, etc.) call `lenis.scrollTo(target, { offset: -80, duration: 1.4 })` — patch the nav link handler.

## 2. Cinematic preloader intro
New component `src/components/site/Preloader.tsx`, mounted at top of `index.tsx`, locks body scroll until it finishes (~2.6s). Sequence:
1. **0.0s** — Full-viewport ink (`#111`) panel, dotted-grid backdrop fades in at 8% opacity.
2. **0.2s** — Counter `00 → 100` bottom-left (Satoshi mono-tabular), driven by `motion` `animate()` with `ease: [0.65, 0, 0.35, 1]`.
3. **0.3s** — Large `Elementum` wordmark (Gerbil) rises from below with per-letter stagger (mask-clip reveal, `y: 110% → 0`, 60ms stagger, 0.9s each).
4. **0.4s** — Yellow underline stroke draws under wordmark using `pathLength` 0 → 1.
5. **1.8s** — Once counter hits 100: wordmark and counter exit upward (`y: -30%`, opacity 0), then the ink panel splits into two halves (top clip-path `inset(0 0 50% 0)` → `inset(0 0 100% 0)`, bottom mirror) revealing the hero. 900ms, `ease: [0.85, 0, 0.15, 1]`.
6. **2.6s** — Preloader unmounts, body scroll unlocks, Lenis starts, hero entrance animations trigger.
- Session-scoped: shows only on first visit per tab (sessionStorage flag) so internal nav / HMR doesn't replay. Skippable with Esc / click.
- Reduced motion: shows a static 400ms fade instead.

## 3. Cinematic scroll & interaction upgrades
Layer these on top of what already exists — nothing gets removed, motion gets richer.

- **Hero**
  - Headline: per-word mask reveal on mount (stagger 80ms), then subtle parallax `y` on scroll (`useTransform` from Lenis scroll).
  - Highlight pills: scale-in 0.6 → 1 with `spring(stiffness: 120, damping: 14)` after headline settles.
  - Underline stroke: `pathLength` draws in after the word it underlines lands.
  - Portrait cluster: each portrait enters from its own direction (top/left/right/bottom based on final position) with `blur(12px) → 0` + scale 0.85 → 1, staggered 90ms. On scroll, individual portraits parallax at different speeds (-40 to +60px range).
  - Hero backdrop shapes: float loops already present; add scroll-linked rotation (0 → 45deg over full page) for squiggle & star.

- **Section reveals**
  - Section headings use split-word mask reveal triggered by `useInView({ margin: "-15% 0px" })`.
  - Body copy fades + `y: 24 → 0`, 0.8s, stagger 40ms per paragraph.

- **FeatureRow**
  - Image circle: enters with `clip-path: circle(0% at 50% 50%) → circle(75% at 50% 50%)` (iris reveal), 1.1s ease-out.
  - On scroll past, image gets subtle `scale(1 → 1.06)` parallax; text column `y` parallax at opposite direction for depth.
  - Accent doodles: draw-in via `pathLength` when row enters view.

- **Services**
  - Row hover already exists — add a horizontal `x: -8 → 0` slide + arrow icon `x: 0 → 8` on hover with spring.
  - On scroll-in, rows stagger reveal (mask from left, 80ms stagger, cubic-bezier `[0.22, 1, 0.36, 1]`).
  - Optional: pinned section header while rows scroll past (sticky heading with Lenis).

- **Testimonials**
  - Carousel slide transition upgraded to crossfade + subtle `scale(0.98 → 1)` + `blur(6px → 0)`.
  - Avatar scatter: on section enter, avatars fly in from off-canvas to their positions with staggered spring.
  - Auto-advance every 6s, pause on hover.

- **FooterCTA**
  - Mint block: enters with a curtain reveal (`clip-path: inset(100% 0 0 0) → inset(0)`), 1.2s.
  - "Subscribe Now" magnetic button: keep magnetic pull; add liquid hover (radial gradient follows cursor) and letter-jitter on hover (per-letter `y: 0 → -4 → 0` with 30ms stagger).

- **Global micro-interactions**
  - Cursor: custom minimal dot cursor (12px) + trailing ring (32px, lerped) that scales on hover of `[data-cursor="hover"]` targets (links, buttons, portraits). Desktop only.
  - Page transitions: not needed (single route), but section anchors use Lenis smooth scrollTo.

## 4. Performance & safety
- Preload Gerbil font (`<link rel="preload" as="font" type="font/otf" crossorigin>` in `__root.tsx`) so the preloader wordmark renders in the correct face immediately — no FOUT during the intro.
- All animations run on `transform` / `opacity` / `clip-path` (compositor-friendly). No layout thrash.
- `will-change` only added during active animations, removed on complete.
- `prefers-reduced-motion`: disables Lenis, preloader plays static fade, all mask reveals collapse to plain opacity fades, custom cursor disabled.
- Custom cursor and Lenis both auto-disable on touch devices (`pointer: coarse`).

## Files
**New**
- `src/lib/lenis.tsx` — SmoothScroll provider + hook.
- `src/components/site/Preloader.tsx` — cinematic intro.
- `src/components/site/Cursor.tsx` — desktop custom cursor.
- `src/lib/useSplitText.ts` — utility for per-word / per-letter mask reveal.

**Edited**
- `src/routes/__root.tsx` — mount `<SmoothScroll>`, preload Gerbil.
- `src/routes/index.tsx` — mount `<Preloader>` and `<Cursor>`.
- `src/components/site/Nav.tsx` — Lenis-aware anchor scroll.
- `src/components/site/Hero.tsx` — richer entrance, parallax hook.
- `src/components/site/PortraitCluster.tsx` — directional entrance + per-portrait parallax.
- `src/components/site/FeatureRow.tsx` — iris reveal + opposing parallax.
- `src/components/site/Services.tsx` — staggered mask reveal + hover spring.
- `src/components/site/Testimonials.tsx` — crossfade + scatter entrance.
- `src/components/site/FooterCTA.tsx` — curtain reveal + liquid button.
- `src/components/site/HeroBackdrop.tsx` — scroll-linked shape rotation.
- `package.json` / `bun.lock` — add `lenis`.

## Out of scope
- New pages / routes.
- Backend or data changes.
- Copy or layout restructuring.

## Open question
Custom cursor: include it, or keep the native cursor and put those "budget" into more scroll animations? I'll default to **including it (desktop only, gracefully disabled on touch / reduced-motion)** unless you say otherwise.
