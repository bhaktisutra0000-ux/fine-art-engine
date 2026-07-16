## Goal

Make the hero fit within `100dvh` on every device, match Figma's heading + portrait spacing pixel-for-pixel on desktop, and have all portrait photos animate in from off-screen to their final scattered positions on load.

## Changes

### 1. Hero container — lock to viewport height
`src/components/site/Hero.tsx`
- Replace `pt-24 md:pt-28 pb-10 md:pb-14` with a full-viewport shell:
  - `min-h-[100dvh] max-h-[100dvh] flex flex-col`
  - Nav offset via `pt-[72px]` (matches sticky nav height)
  - Inner wrapper `flex-1 flex flex-col justify-between` so headline sits top, portraits fill remaining space, sub-copy sits between them.
- Use `clamp()` for headline size so it never overflows: `text-[clamp(28px,6.2vw,84px)]` with `leading-[1.02]`.
- Sub-copy `mt-4` and `text-[13px] md:text-[14px]` to stay compact.

### 2. Portrait spacing — match Figma coordinates exactly
`src/components/site/PortraitCluster.tsx`
- Re-derive positions from Figma frame (1440×900 hero, portraits occupy the bottom ~360px band). New `items` table (percent of 1400px stage width, percent of cluster height):

  ```text
  p2  left  4%  top 45%  size 96
  p7  left 14%  top 88%  size 84
  p5  left 26%  top 18%  size 132
  p1  left 40%  top 62%  size 140
  p3  left 58%  top 20%  size 134
  p4  left 76%  top 55%  size 128
  p6  left 90%  top 82%  size 90
  ```
- Cluster height uses `h-[clamp(240px,32dvh,360px)]` so it flexes with viewport.
- Size values become `clamp(64px, item.size * 0.075vw, item.size)` so nothing overflows on smaller desktops/tablets.

### 3. Portrait entrance — fly in from off-screen edges
`src/components/site/PortraitCluster.tsx`
- Replace the current `fromX/fromY = ±60` with true off-screen origins:
  - `fromX = leftNum < 40 ? -window.innerWidth * 0.6 : leftNum > 60 ? window.innerWidth * 0.6 : 0`
  - `fromY = topNum < 40 ? -400 : topNum > 60 ? 400 : -200`
- Use `useReducedMotion()` to fall back to a fade only.
- Transition: `duration: 1.4, delay: 1.5 + item.delay * 0.9, ease: [0.16, 1, 0.3, 1]`, with `scale: 0.4 → 1` and `rotate: (random -25..25) → 0` for cinematic settle.
- Add a subtle overshoot via `type: "spring", stiffness: 90, damping: 18` on the final leg.
- Keep the existing floating loop after entrance completes.

### 4. Backdrop — keep within hero bounds
`src/components/site/HeroBackdrop.tsx`
- No structural change; ensure decorations use `%` positions so they scale with the shorter hero. Reduce squiggle/star sizes ~15% so they don't crowd smaller viewports.

### 5. Mobile
- Below `md`, hero becomes: headline (auto), sub-copy, then the existing horizontal marquee — all inside the same `100dvh` flex column with `justify-between`. Marquee track height fixed at `128px`.

## Verification

- Playwright at 1440×900, 1280×800, 1024×768, 390×844: capture screenshot; assert hero section `getBoundingClientRect().height <= innerHeight + 1`.
- Visually confirm portraits animate from outside the viewport into their scattered positions and the headline+portraits are both visible without scrolling.
