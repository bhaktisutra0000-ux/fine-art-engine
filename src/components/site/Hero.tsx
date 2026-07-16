import { motion } from "motion/react";
import { HighlightPill } from "./HighlightPill";
import { UnderlineStroke } from "./UnderlineStroke";
import { PortraitCluster } from "./PortraitCluster";
import { HeroBackdrop } from "./HeroBackdrop";
import { ease, wordReveal, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[100dvh] max-h-[100dvh] flex flex-col pt-[80px]"
    >
      <HeroBackdrop />

      <div className="relative mx-auto w-full max-w-[1400px] flex-1 flex flex-col px-6 md:px-10 pb-4 md:pb-6">
        {/* Headline */}
        <motion.h1
          variants={stagger(0.14)}
          initial="hidden"
          animate="show"
          className="font-display text-center leading-[1.02] tracking-[-0.03em] mx-auto max-w-[980px] text-[clamp(30px,6.2vw,84px)]"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={wordReveal} className="inline-block">
              The{" "}
              <span className="relative inline-block">
                <span className="relative z-10">thinkers</span>
                <UnderlineStroke
                  delay={1.1}
                  className="absolute left-0 right-0 -bottom-2 h-5 w-full"
                />
              </span>{" "}
              and
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={wordReveal} className="inline-block">
              doers were{" "}
              <HighlightPill color="pink" delay={1.35}>
                changing
              </HighlightPill>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
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
          className="mx-auto mt-4 max-w-xl text-center text-[13px] md:text-[14px] text-muted-foreground leading-relaxed"
        >
          We are a team of strategists, designers, communicators and researchers.
          Together, we believe that progress only happens when you refuse to play
          things safe.
        </motion.p>

        {/* Portraits fill remaining space */}
        <div className="flex-1 flex items-end min-h-0">
          <PortraitCluster />
        </div>
      </div>
    </section>
  );
}
