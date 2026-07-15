import type { Variants, Transition } from "motion/react";

export const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
export const cinematicEase: Transition["ease"] = [0.16, 1, 0.3, 1];

export const cinematicSpring: Transition = {
  type: "spring",
  stiffness: 72,
  damping: 18,
  mass: 0.9,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};

/** Split a phrase into <span> words for stagger animations */
export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((s) => s.length > 0);
}
