import { motion } from "motion/react";
import { ease } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: "mint" | "pink";
  delay?: number;
  className?: string;
};

/**
 * A pill-shaped highlight that grows behind a word — the Figma
 * "Rectangle 657/658" motif.
 */
export function HighlightPill({ children, color = "mint", delay = 0.5, className = "" }: Props) {
  const bg = color === "mint" ? "var(--mint)" : "var(--pink)";
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[-0.2em] inset-y-[0.1em] rounded-full origin-left"
        style={{ backgroundColor: bg }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay, ease }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
