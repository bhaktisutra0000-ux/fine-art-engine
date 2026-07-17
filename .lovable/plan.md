# Senior-dev audit — bug list & final fixes

Findings from reading every site component + wiring. I've split them into **Real bugs** (visible or breaks behaviour) and **Polish** (minor). Only the Real-bug fixes are implemented; polish items are listed for your call.

## Real bugs to fix

### 1. Portrait entrance is broken — scroll `y` overrides entrance `y`
`src/components/site/PortraitCluster.tsx`

`ParallaxPortrait` sets `style={{ y }}` (a `useTransform` motion value driven by scroll) **and** animates `y: dy → 0` in the `initial`/`animate` transition. Both write to the same `y` — the inline `style` wins, so the vertical part of the burst-in never plays and portraits pop into place vertically. Fix: drive the entrance from a wrapper motion.div, and put the scroll-parallax `y` on an inner motion.div. Same for the entrance `x` vs any future horizontal scroll.

### 2. Preloader doesn't actually lock scroll (Lenis keeps scrolling)
`src/components/site/Preloader.tsx` + `src/lib/lenis.tsx`

`document.body.style.overflow = "hidden"` has no effect because Lenis uses its own rAF loop and transforms — the page still scrolls behind the preloader on wheel/touch. Fix: expose `lenis` from context and call `lenis.stop()` on mount / `lenis.start()` on cleanup (keep the body overflow line as a fallback for reduced-motion / no-Lenis).

### 3. Escape-skip double-fires `onDone`
`src/components/site/Preloader.tsx`

The Esc handler schedules its own `setTimeout(...700)` that isn't tracked, so the original `doneT` may still fire after unmount — `onDone` gets called twice. Fix: track the skip timer in a ref and clear both timers in cleanup; guard with a `done` ref so `onDone` runs at most once.

### 4. Dead nav anchor: `#faqs`
`src/components/site/Nav.tsx`

Nav renders "FAQ's" pointing at `#faqs` but no section with that id exists → clicking scrolls to top. Fix: remove the FAQ link from the `links` array until a section is built. (Alternative: build a stub FAQ section — out of scope for this audit.)

### 5. Native cursor + custom cursor both visible
`src/components/site/Cursor.tsx` + `src/styles.css`

Earlier fix removed the global `cursor: none`, so on fine-pointer devices the OS cursor renders on top of the custom one. Fix: when the custom Cursor is active, add `cursor: none` on `html` and restore on unmount / when `enabled` is false (respects reduced-motion / touch because we only set it inside the same guard).

### 6. `whileInView` with negative `margin` under Lenis
`src/components/site/Services.tsx` (both `h2` and `ServiceRow`)

Same class of bug we already fixed in `FeatureRow`: `viewport={{ once: true, margin: "-15%" }}` + smooth-scroll can fail to trigger on tall sections, leaving items stuck at `opacity: 0`. Fix: switch to `viewport={{ once: true, amount: 0.2 }}`.

### 7. Testimonials autoplay pauses the whole page section on hover
`src/components/site/Testimonials.tsx`

`onMouseEnter`/`Leave` on the whole `<section>` pauses whenever the cursor is anywhere in it (including reading the heading). Fix: move the pause handlers onto the quote card only.

## Polish (not implemented — flag if you want them)

- **P1 — Hero right-edge portraits get clipped.** `Hero` has `overflow-hidden` and portraits at `left: 90%` translate outside the container. Intentional per Figma? If not, tighten positions to `≤ 88%`.
- **P2 — Root + leaf both set the same `<title>` / meta.** Harmless (leaf wins) but redundant. Could drop from `index.tsx` since values match `__root.tsx`.
- **P3 — Preloader outer div is `pointer-events-none`.** Means clicks pass through to the site during the 3s intro. Set `pointer-events-auto` while `visible`.
- **P4 — `HeroBackdrop` decorations have no `prefers-reduced-motion` fallback.** Small win.
- **P5 — Cursor's `hover` detection runs on every mousemove.** Fine at 60fps but could be throttled.

## Technical notes

- Files touched: `PortraitCluster.tsx`, `Preloader.tsx`, `lenis.tsx` (export helper), `Nav.tsx`, `Cursor.tsx`, `Services.tsx`, `Testimonials.tsx`.
- No new deps, no schema/backend changes, no route additions.
- Verify with Playwright at 1440×900 + 390×844: (a) all 7 portraits animate in from centre burst to scattered positions on load, (b) wheel-scroll during preloader stays locked, (c) Services rows fade in on scroll, (d) FAQ link is gone from nav.

Approve and I'll apply fixes 1–7 in one pass.
