import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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

// Positions matched to Figma hero portrait scatter (bottom ~360px band).
const items: Item[] = [
  { src: p2, left: "4%",  top: "45%",  size: 96,  speed: -30, delay: 0.05, rotate: -14 },
  { src: p7, left: "14%", top: "88%",  size: 84,  speed: 20,  delay: 0.15, rotate: 18  },
  { src: p5, left: "26%", top: "18%",  size: 132, speed: 40,  delay: 0.25, rotate: -8  },
  { src: p1, left: "40%", top: "62%",  size: 140, speed: -20, delay: 0.35, rotate: 12  },
  { src: p3, left: "58%", top: "20%",  size: 134, speed: 30,  delay: 0.40, rotate: -16 },
  { src: p4, left: "76%", top: "55%",  size: 128, speed: -35, delay: 0.50, rotate: 10  },
  { src: p6, left: "90%", top: "82%",  size: 90,  speed: 25,  delay: 0.60, rotate: -20 },
];

export function PortraitCluster() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <>
      {/* Desktop / tablet: scattered composition */}
      <div
        ref={ref}
        className="relative mx-auto hidden md:block w-full h-[clamp(240px,34dvh,380px)] max-w-[1400px]"
      >
        {items.map((it, i) => (
          <ParallaxPortrait key={i} item={it} progress={scrollYProgress} />
        ))}
      </div>

      {/* Mobile: horizontal marquee */}
      <div className="md:hidden w-full overflow-hidden -mx-6">
        <div className="flex gap-6 w-max animate-marquee py-2">
          {[...items, ...items].map((it, i) => (
            <img
              key={i}
              src={it.src}
              alt=""
              className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-border/50"
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ParallaxPortrait({
  item,
  progress,
}: {
  item: Item;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, item.speed]);

  const leftNum = parseFloat(item.left);
  const topNum = parseFloat(item.top);

  // True off-screen origin so photos fly IN to place.
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const fromX =
    leftNum < 40 ? -(vw * 0.6) - item.size : leftNum > 60 ? vw * 0.6 + item.size : 0;
  const fromY = topNum < 40 ? -(vh * 0.7) : topNum > 60 ? vh * 0.6 : -vh * 0.3;

  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: fromX,
        y: fromY,
        scale: 0.35,
        rotate: item.rotate * 2,
        filter: "blur(14px)",
      };

  const animate = reduce
    ? { opacity: 1 }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
      };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration: 1.5,
        delay: 1.3 + item.delay * 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        left: item.left,
        top: item.top,
        width: `clamp(64px, ${item.size / 14.4}vw, ${item.size}px)`,
        height: `clamp(64px, ${item.size / 14.4}vw, ${item.size}px)`,
        y,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      data-cursor="hover"
    >
      <div className="animate-float h-full w-full">
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-full object-cover ring-1 ring-border/40 shadow-[0_10px_40px_-15px_rgb(0_0_0_/_0.25)]"
        />
      </div>
    </motion.div>
  );
}
