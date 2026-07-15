import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { UnderlineStroke } from "./UnderlineStroke";

type Props = {
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  heading: ReactNode;
  body: string;
};

export function FeatureRow({ imageSrc, imageAlt, imagePosition, heading, body }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [36, -36]);
  const imgFirst = imagePosition === "left";
  return (
    <div ref={ref} className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
      <div
        className={`grid gap-12 md:gap-16 items-center md:grid-cols-2 ${
          imgFirst ? "" : "md:[&>:first-child]:order-1"
        }`}
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={imgFirst ? "md:order-2" : ""}
        >
          <h2 className="font-display text-[10vw] sm:text-6xl md:text-[64px] leading-[1.05] tracking-tight max-w-xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            {body}
          </p>
          <a
            href="#services"
            className="group mt-8 inline-flex items-center gap-3 text-base font-medium"
          >
            Read more
            <span className="relative flex h-[2px] w-16 items-center bg-foreground transition-all duration-500 ease-out group-hover:w-24">
              <ArrowRight
                size={16}
                className="absolute -right-1 -top-[7px] transition-transform duration-500 ease-out group-hover:translate-x-2"
              />
            </span>
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
          whileInView={{ opacity: 1, clipPath: "circle(75% at 50% 50%)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className={imgFirst ? "md:order-1" : ""}
        >
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className="motion-composite relative mx-auto aspect-square w-full max-w-[520px]"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="cinematic-image h-full w-full rounded-full object-cover shadow-[0_20px_60px_-20px_rgb(0_0_0_/_0.35)]"
            />
            {/* Ambient blob */}
            <div className="absolute -z-10 inset-4 rounded-full bg-mint/40 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/** Extract to reuse styling of the yellow stroke under a headline word */
export function StrokeAccent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <UnderlineStroke
        variant="single"
        delay={0.3}
        className="absolute left-0 right-0 -bottom-3 h-6 w-full"
      />
    </span>
  );
}
