import { motion } from "motion/react";
import { ease } from "@/lib/motion";

type Props = {
  className?: string;
  delay?: number;
  variant?: "single" | "double";
};

/**
 * Hand-drawn yellow underline stroke, replicating the Figma "Vector 5" motif.
 * Uses SVG pathLength animation so the stroke draws in.
 */
export function UnderlineStroke({ className, delay = 0.3, variant = "double" }: Props) {
  return (
    <svg
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <motion.path
        d="M4 24 C 90 8, 220 14, 396 4"
        stroke="var(--yellow)"
        strokeWidth={7}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, delay, ease }}
      />
      {variant === "double" && (
        <motion.path
          d="M8 34 C 120 22, 260 30, 392 20"
          stroke="var(--yellow)"
          strokeWidth={5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, delay: delay + 0.15, ease }}
        />
      )}
    </svg>
  );
}
