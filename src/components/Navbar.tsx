"use client";
import { useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-xl bg-background/60 border-b border-border" : "py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a href="#top" className="font-mono text-sm md:text-base">
            <span className="text-muted-foreground">{"{ "}</span>
            <span className="text-foreground">alex.dev</span>
            <span className="cursor-blink text-cyan">_</span>
            <span className="text-muted-foreground">{" }"}</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="mr-1 text-cyan/60">0{i + 1}</span>
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton
              as="a"
              href="#contact"
              className="relative rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-cyan transition-colors hover:bg-cyan/20 glow-cyan"
            >
              Hire Me →
            </MagneticButton>
          </div>

          <button
            aria-label="Menu"
            className="lg:hidden text-foreground"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile takeover */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex h-full flex-col p-8">
          <div className="flex justify-end">
            <button aria-label="Close" onClick={() => setOpen(false)}>
              <X className="h-7 w-7" />
            </button>
          </div>
          <ul className="mt-12 flex flex-1 flex-col justify-center gap-6">
            {links.map((l, i) => (
              <li
                key={l.href}
                style={{
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 80 + 100}ms`,
                }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-display text-5xl font-bold tracking-tight"
                >
                  <span className="mr-3 font-mono text-base text-cyan">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
