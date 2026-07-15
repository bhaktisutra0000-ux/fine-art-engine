import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import p1 from "@/assets/figma/9fafd71fcaf807d27868bc021bfd2b706ca4a104.jpg";
import p2 from "@/assets/figma/e1510bf92e503b24bd6f16dfd4f7bd4643d7dff7.jpg";
import p3 from "@/assets/figma/b73f7d3f3f97b55b8691134f55142949dcc75229.jpg";
import p4 from "@/assets/figma/0c27648bdc88f3209ccfbcc5d9b9d169cf99426c.jpg";
import p5 from "@/assets/figma/a3b22f9c9d55d92d7b1b04f8c72abda291bb5ff2.jpg";
import p6 from "@/assets/figma/42ecea29e6da48d7cf7986754edad6a520cf49bc.jpg";
import p7 from "@/assets/figma/0be3546621a0c82f467a1065092444bbcf328c11.jpg";

// Positions rendered on the 1400px stage — matched from Figma coordinates,
// normalized to percentages so they scale down cleanly.
type Item = {
  src: string;
  left: string;
  top: string;
  size: number; // px at desktop
  speed: number; // parallax
  delay: number;
};

const items: Item[] = [
  { src: p2, left: "2%",  top: "40%",  size: 150, speed: -30, delay: 0.05 },
  { src: p7, left: "12%", top: "78%",  size: 130, speed: 20,  delay: 0.15 },
  { src: p5, left: "22%", top: "10%",  size: 200, speed: 40,  delay: 0.25 },
  { src: p1, left: "36%", top: "55%",  size: 220, speed: -20, delay: 0.35 },
  { src: p3, left: "58%", top: "18%",  size: 210, speed: 30,  delay: 0.4  },
  { src: p4, left: "76%", top: "48%",  size: 200, speed: -35, delay: 0.5  },
  { src: p6, left: "88%", top: "72%",  size: 140, speed: 25,  delay: 0.6  },
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
        className="relative mx-auto mt-14 hidden md:block h-[520px] lg:h-[560px] max-w-[1400px]"
      >
        {items.map((it, i) => (
          <ParallaxPortrait key={i} item={it} progress={scrollYProgress} />
        ))}
      </div>

      {/* Mobile: horizontal marquee */}
      <div className="md:hidden mt-12 overflow-hidden -mx-6">
        <div className="flex gap-6 w-max animate-marquee">
          {[...items, ...items].map((it, i) => (
            <img
              key={i}
              src={it.src}
              alt=""
              className="h-32 w-32 shrink-0 rounded-full object-cover ring-1 ring-border/50"
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
  const y = useTransform(progress, [0, 1], [0, item.speed]);
  const leftNum = parseFloat(item.left);
  const topNum = parseFloat(item.top);
  const fromX = leftNum < 30 ? -60 : leftNum > 70 ? 60 : 0;
  const fromY = topNum < 30 ? -60 : topNum > 70 ? 60 : 20;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, x: fromX, y: fromY, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, delay: 1.7 + item.delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        left: item.left,
        top: item.top,
        width: item.size,
        height: item.size,
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
