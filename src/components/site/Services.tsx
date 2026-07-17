import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HighlightPill } from "./HighlightPill";
import { UnderlineStroke } from "./UnderlineStroke";

const items = [
  {
    label: "Office of multiple\ninterest content",
    title: "Collaborative & partnership",
  },
  {
    label: "The hanger US Air force\ndigital experimental",
    title: "We talk about our weight",
  },
  {
    label: "Delta faucet content,\nsocial, digital",
    title: "Piloting digital confidence",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[112px] leading-[1] tracking-tight max-w-4xl"
        >
          What we{" "}
          <HighlightPill color="mint" delay={0.4}>
            can
          </HighlightPill>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">offer</span>
            <UnderlineStroke
              delay={0.8}
              className="absolute left-0 right-0 -bottom-4 h-10 w-full"
            />
          </span>{" "}
          you!
        </motion.h2>

        <ul className="mt-16 md:mt-24 border-t border-foreground/20">
          {items.map((it, i) => (
            <ServiceRow key={i} item={it} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceRow({
  item,
  index,
}: {
  item: (typeof items)[number];
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative border-b border-foreground/20"
    >
      {/* Hover highlight fill */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-mint/50 transition-transform duration-700 ease-out group-hover:scale-x-100"
      />

      <a
        href="#"
        className="relative grid grid-cols-1 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)_auto] items-center gap-6 md:gap-10 py-8 md:py-10"
      >
        <span className="text-sm md:text-[15px] whitespace-pre-line text-muted-foreground leading-snug transition-transform duration-500 ease-out group-hover:translate-x-2">
          {item.label}
        </span>
        <span className="font-display text-4xl sm:text-5xl md:text-[56px] leading-[1.05] tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
          {item.title}
        </span>
        <span className="justify-self-start md:justify-self-end flex items-center transition-transform duration-500 ease-out group-hover:translate-x-3">
          <span className="relative h-[2px] w-14 bg-foreground">
            <ArrowRight
              size={18}
              className="absolute -right-1 -top-[9px]"
            />
          </span>
        </span>
      </a>
    </motion.li>
  );
}
