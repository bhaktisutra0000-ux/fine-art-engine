import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const LenisCtx = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisCtx);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const l = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.92,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });

    const raf = (time: number) => {
      l.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    setLenis(l);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}
