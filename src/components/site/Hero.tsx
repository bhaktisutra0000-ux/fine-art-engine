import { motion } from "motion/react";
import { HighlightPill } from "./HighlightPill";
import { UnderlineStroke } from "./UnderlineStroke";
import { PortraitCluster } from "./PortraitCluster";
import { ease, wordReveal, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24"
    >
      {/* Ambient background shapes hinting at Figma's stray polygons */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-40 h-56 w-56 rounded-full bg-mint/25 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-pink/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Headline */}
        <motion.h1
          variants={stagger(0.14)}
          initial="hidden"
          animate="show"
          className="font-display text-center text-[13vw] leading-[1.02] tracking-[-0.03em] sm:text-[9vw] md:text-[7.5vw] lg:text-[112px] xl:text-[128px] mx-auto max-w-[1300px]"
        >
          <span className="block overflow-hidden pb-2">
            <motion.span variants={wordReveal} className="inline-block">
              The{" "}
              <span className="relative inline-block">
                <span className="relative z-10">thinkers</span>
                <UnderlineStroke
                  delay={1.1}
                  className="absolute left-0 right-0 -bottom-4 h-8 w-full"
                />
              </span>{" "}
              and
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span variants={wordReveal} className="inline-block">
              doers were{" "}
              <HighlightPill color="pink" delay={1.35}>
                changing
              </HighlightPill>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span variants={wordReveal} className="inline-block">
              the{" "}
              <HighlightPill color="mint" delay={1.55}>
                status
              </HighlightPill>{" "}
              Quo with
            </motion.span>
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease }}
          className="mx-auto mt-8 max-w-2xl text-center text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          We are a team of strategists, designers, communicators and researchers.
          Together, we believe that progress only happens when you refuse to play
          things safe.
        </motion.p>

        {/* Portraits */}
        <PortraitCluster />
      </div>
    </section>
  );
}
