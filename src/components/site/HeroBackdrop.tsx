import { motion } from "motion/react";

/**
 * Hero backdrop: dotted grid + scattered decorative marks (yellow squiggle,
 * mint ring, pink dot cluster, tiny stars) matching the Figma composition.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dots opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]" />

      {/* Yellow squiggle top-left */}
      <motion.svg
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.9 }}
        className="absolute left-[6%] top-[22%] h-8 w-24 text-[color:var(--yellow)]"
        viewBox="0 0 100 30" fill="none"
      >
        <path d="M2 18 Q 14 2, 26 18 T 50 18 T 74 18 T 98 18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </motion.svg>

      {/* Mint ring top-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 2.05 }}
        className="absolute right-[8%] top-[14%] h-16 w-16 rounded-full border-[3px]"
        style={{ borderColor: "var(--mint)" }}
      />

      {/* Pink dot cluster left-mid */}
      <div className="absolute left-[4%] top-[62%] grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 2.1 + i * 0.03 }}
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--pink)" }}
          />
        ))}
      </div>

      {/* 4-point star right-mid */}
      <motion.svg
        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute right-[5%] top-[58%] h-10 w-10 text-[color:var(--yellow)]"
        viewBox="0 0 40 40" fill="currentColor"
      >
        <path d="M20 0 C 22 14, 26 18, 40 20 C 26 22, 22 26, 20 40 C 18 26, 14 22, 0 20 C 14 18, 18 14, 20 0Z" />
      </motion.svg>

      {/* Small yellow cross top-center */}
      <motion.svg
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.25 }}
        className="absolute left-[46%] top-[8%] h-6 w-6 text-[color:var(--yellow)]"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      >
        <path d="M12 3v18M3 12h18" />
      </motion.svg>
    </div>
  );
}
