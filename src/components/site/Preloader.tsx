import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";

const LETTERS = "Elementum".split("");

export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [split, setSplit] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.floor(v)).padStart(3, "0"));

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const t = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 400);
      return () => clearTimeout(t);
    }

    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const controls = animate(count, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
    });

    const splitT = setTimeout(() => setSplit(true), 2100);
    const doneT = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prev;
      onDone();
    }, 3100);

    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        controls.stop();
        setSplit(true);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = prev;
          onDone();
        }, 700);
      }
    };
    window.addEventListener("keydown", skip);

    return () => {
      controls.stop();
      clearTimeout(splitT);
      clearTimeout(doneT);
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = prev;
    };
  }, [count, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top half */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#111] overflow-hidden"
            animate={{ y: split ? "-100%" : "0%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: split ? 0.05 : 0 }}
          >
            <div className="absolute inset-0 bg-dots opacity-[0.06]" />
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#111] overflow-hidden"
            animate={{ y: split ? "100%" : "0%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          >
            <div className="absolute inset-0 bg-dots opacity-[0.06]" />
          </motion.div>

          {/* Centered content overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: split ? 0 : 1, y: split ? -40 : 0 }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
          >
            <h1 className="font-display text-[15vw] md:text-[11vw] leading-none text-white flex overflow-hidden">
              {LETTERS.map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.15em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.35 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Counter */}
          <motion.div
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white/80 font-sans tabular-nums text-lg md:text-2xl tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: split ? 0 : 1 }}
            transition={{ duration: 0.4, delay: split ? 0 : 0.2 }}
          >
            <motion.span>{rounded}</motion.span>
            <span className="opacity-40"> / 100</span>
          </motion.div>

          {/* Skip hint */}
          <motion.div
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-white/40 font-sans text-xs tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: split ? 0 : 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Esc to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
