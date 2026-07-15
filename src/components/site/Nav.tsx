import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLenis } from "@/lib/lenis";

const links = ["Home", "Studio", "Services", "Contact", "FAQ's"];

export function Nav({ ready = true }: { ready?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.9, delay: ready ? 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/75 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          onClick={scrollTo("top")}
          className="font-display text-2xl md:text-3xl tracking-tight"
        >
          Elementum
        </a>

        <nav className="hidden md:flex items-center gap-10 lg:gap-14 text-[15px] font-medium">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/[^a-z]/g, "")}`}
              onClick={scrollTo(l.toLowerCase().replace(/[^a-z]/g, ""))}
              className="relative group text-foreground/85 hover:text-foreground transition-colors"
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 grid h-10 w-10 place-items-center rounded-full hover:bg-foreground/5 transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden bg-background border-t border-border"
      >
        <nav className="flex flex-col divide-y divide-border">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/[^a-z]/g, "")}`}
              onClick={scrollTo(l.toLowerCase().replace(/[^a-z]/g, ""))}
              className="font-display text-3xl px-6 py-6 hover:bg-mint/40 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
