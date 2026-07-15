import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cinematicEase, cinematicSpring } from "@/lib/motion";

import p1 from "@/assets/figma/9fafd71fcaf807d27868bc021bfd2b706ca4a104.jpg";
import p2 from "@/assets/figma/e1510bf92e503b24bd6f16dfd4f7bd4643d7dff7.jpg";
import p3 from "@/assets/figma/b73f7d3f3f97b55b8691134f55142949dcc75229.jpg";
import p4 from "@/assets/figma/0c27648bdc88f3209ccfbcc5d9b9d169cf99426c.jpg";
import p5 from "@/assets/figma/a3b22f9c9d55d92d7b1b04f8c72abda291bb5ff2.jpg";
import p6 from "@/assets/figma/42ecea29e6da48d7cf7986754edad6a520cf49bc.jpg";
import p7 from "@/assets/figma/0be3546621a0c82f467a1065092444bbcf328c11.jpg";

type Item = {
  src: string;
  left: string;
  top: string;
  size: number;
  speed: number;
  delay: number;
  rotate: number;
};

const items: Item[] = [
  { src: p2, left: "3%", top: "42%", size: 90, speed: -24, delay: 0, rotate: -13 },
  { src: p7, left: "15%", top: "78%", size: 80, speed: 18, delay: 0.05, rotate: 10 },
  { src: p5, left: "28%", top: "18%", size: 120, speed: 34, delay: 0.1, rotate: -8 },
  { src: p1, left: "43%", top: "66%", size: 130, speed: -18, delay: 0.15, rotate: 7 },
  { src: p3, left: "59%", top: "24%", size: 125, speed: 26, delay: 0.2, rotate: -6 },
  { src: p4, left: "77%", top: "54%", size: 120, speed: -30, delay: 0.25, rotate: 9 },
  { src: p6, left: "92%", top: "78%", size: 84, speed: 20, delay: 0.3, rotate: -11 },
];

export function PortraitCluster({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-6 h-[250px] max-w-[1400px] sm:h-[280px] md:mt-2 md:h-[320px]"
      aria-label="The Elementum team"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={
          ready ? { opacity: [0, 0.9, 0], scale: [0.2, 1, 1.8] } : { opacity: 0, scale: 0.2 }
        }
        transition={{ duration: 0.9, delay: 1.2, ease: cinematicEase }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/25"
      />

      {items.map((item, index) => (
        <ScatterPortrait
          key={item.src}
          item={item}
          index={index}
          ready={ready}
          reduceMotion={Boolean(reduceMotion)}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function ScatterPortrait({
  item,
  index,
  ready,
  reduceMotion,
  progress,
}: {
  item: Item;
  index: number;
  ready: boolean;
  reduceMotion: boolean;
  progress: MotionValue<number>;
}) {
  const parallaxY = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [-item.speed / 2, item.speed / 2],
  );
  const responsiveSize = `clamp(${Math.max(58, Math.round(item.size * 0.58))}px, ${Math.round(item.size / 11)}vw, ${item.size}px)`;

  return (
    <motion.div
      initial={false}
      animate={
        ready
          ? {
              left: item.left,
              top: item.top,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }
          : {
              left: "50%",
              top: "50%",
              opacity: 0,
              scale: 0.12,
              rotate: item.rotate,
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : {
              ...cinematicSpring,
              delay: 1.3 + item.delay,
            }
      }
      style={{
        width: responsiveSize,
        height: responsiveSize,
        zIndex: items.length - index,
      }}
      className="motion-composite absolute -translate-x-1/2 -translate-y-1/2"
      data-cursor="hover"
    >
      <motion.div
        style={{ y: parallaxY }}
        whileHover={reduceMotion ? undefined : { scale: 1.09, y: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="h-full w-full rounded-full"
      >
        <img
          src={item.src}
          alt={`Elementum team member ${index + 1}`}
          loading={index < 4 ? "eager" : "lazy"}
          className="cinematic-image h-full w-full rounded-full object-cover ring-1 ring-border/50 shadow-[0_18px_48px_-18px_rgb(0_0_0_/_0.3)]"
        />
      </motion.div>
    </motion.div>
  );
}
