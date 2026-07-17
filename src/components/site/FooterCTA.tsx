import { motion } from "motion/react";
import { useRef, useState } from "react";
import { ease } from "@/lib/motion";

const columns = [
  { title: "Company", links: ["Home", "Studio", "Service", "Blog"] },
  {
    title: "Terms & Policies",
    links: ["Privacy Policy", "Terms & Conditions", "Explore", "Accessibility"],
  },
  { title: "Follow Us", links: ["Instagram", "LinkedIn", "Youtube", "Twitter"] },
];

const contact = [
  "1498w Fulton Ste, STE",
  "2D Chicago, IL 63867",
  "",
  "(123) 456 789 000",
  "",
  "info@elementum.com",
];

export function FooterCTA() {
  return (
    <motion.footer
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
      className="relative bg-surface-mint"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-24 md:pt-32 pb-10">
        {/* Big heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-6xl sm:text-7xl md:text-[112px] leading-[1] tracking-tight"
          >
            Subscribe to
            <br />
            our newsletter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-6 text-base md:text-lg text-foreground/70"
          >
            To make your stay special and even more memorable
          </motion.p>
          <div className="mt-10 flex justify-center">
            <MagneticButton />
          </div>
        </div>

        <div className="mt-24 border-t border-foreground/20" />

        {/* Columns */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-xl mb-6">{c.title}</h3>
              <ul className="space-y-4">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[15px] text-foreground/80 hover:text-foreground relative group"
                    >
                      {l}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-display text-xl mb-6">Contact</h3>
            <address className="not-italic space-y-1 text-[15px] text-foreground/80">
              {contact.map((line, i) =>
                line ? <div key={i}>{line}</div> : <div key={i} className="h-2" />,
              )}
            </address>
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-foreground/60">
          © 2026 Elementum. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        setPos({ x: x * 0.3, y: y * 0.3 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="group relative inline-flex items-center gap-3 rounded-full bg-foreground text-background px-9 py-5 text-base font-medium overflow-hidden"
    >
      <span className="absolute inset-0 -translate-x-full bg-mint transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">
        Subscribe Now
      </span>
      <svg
        className="relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-foreground"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </motion.button>
  );
}
