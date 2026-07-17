import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { HighlightPill } from "./HighlightPill";
import { UnderlineStroke } from "./UnderlineStroke";

import a1 from "@/assets/figma/a3b22f9c9d55d92d7b1b04f8c72abda291bb5ff2.jpg";
import a2 from "@/assets/figma/0be3546621a0c82f467a1065092444bbcf328c11.jpg";
import a3 from "@/assets/figma/42ecea29e6da48d7cf7986754edad6a520cf49bc.jpg";
import a4 from "@/assets/figma/0c27648bdc88f3209ccfbcc5d9b9d169cf99426c.jpg";
import a5 from "@/assets/figma/b73f7d3f3f97b55b8691134f55142949dcc75229.jpg";
import a6 from "@/assets/figma/9fafd71fcaf807d27868bc021bfd2b706ca4a104.jpg";
import a7 from "@/assets/figma/e1510bf92e503b24bd6f16dfd4f7bd4643d7dff7.jpg";

const quotes = [
  {
    author: "Marcus Bell",
    role: "Head of Product, Northwind",
    body:
      "Elementum delivered the site within the timeline they promised. In the end, we saw a 50% traffic increase within days of launch. They also had an impressive ability to use technologies our company hadn't used before, and everything proved easy to maintain and reliable.",
  },
  {
    author: "Sana Iqbal",
    role: "Founder, Loom & Loam",
    body:
      "Working with Elementum reset our expectations for what a partner can be. Strategy, craft, and pace — all in one team. The rebrand paid for itself in a single quarter.",
  },
  {
    author: "Diego Rivera",
    role: "CMO, Halcyon",
    body:
      "They ask sharper questions than any agency we've worked with. The output is beautiful — but the thinking behind it is why we keep coming back.",
  },
];

const scatter = [
  { src: a2, left: "3%",  top: "18%",  size: 90 },
  { src: a5, left: "9%",  top: "38%",  size: 130 },
  { src: a1, left: "5%",  top: "68%",  size: 190 },
  { src: a7, left: "1%",  top: "88%",  size: 110 },
  { src: a4, left: "89%", top: "10%",  size: 90 },
  { src: a3, left: "94%", top: "28%",  size: 130 },
  { src: a6, left: "92%", top: "60%",  size: 200 },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = quotes[i];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 relative">
        {/* Scattered avatars (desktop only) */}
        <div aria-hidden className="absolute inset-0 hidden lg:block pointer-events-none">
          {scatter.map((s, idx) => {
            const fromLeft = parseFloat(s.left) < 50;
            return (
              <motion.img
                key={idx}
                src={s.src}
                alt=""
                initial={{ opacity: 0, scale: 0.4, x: fromLeft ? -80 : 80, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: idx * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ring-1 ring-border/40 animate-float"
              />
            );
          })}
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center font-display text-5xl sm:text-6xl md:text-[72px] leading-[1.05] tracking-tight"
        >
          <HighlightPill color="mint" delay={0.3}>
            What
          </HighlightPill>{" "}
          our customer
          <br />
          says{" "}
          <span className="relative inline-block">
            <span className="relative z-10">About Us</span>
            <UnderlineStroke
              delay={0.9}
              className="absolute left-0 right-0 -bottom-4 h-8 w-full"
            />
          </span>
        </motion.h2>

        {/* Quote card */}
        <div
          className="relative mt-16 mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[36px] bg-mint/60 px-8 py-10 md:px-14 md:py-14"
            >
              <Quote
                aria-hidden
                size={40}
                className="absolute left-6 top-6 text-foreground/25"
              />
              <Quote
                aria-hidden
                size={40}
                className="absolute right-6 bottom-6 rotate-180 text-foreground/25"
              />
              <p className="text-center text-lg md:text-[22px] leading-[1.55] text-foreground/85">
                {q.body}
              </p>
              <footer className="mt-6 text-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{q.author}</span> —{" "}
                {q.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setI((v) => (v - 1 + quotes.length) % quotes.length)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === i ? "w-8 bg-foreground" : "w-2 bg-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((v) => (v + 1) % quotes.length)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
