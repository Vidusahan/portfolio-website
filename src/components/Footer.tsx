"use client";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-sm">
              <span className="text-muted-foreground">{"{ "}</span>
              <span className="text-foreground">alex.dev</span>
              <span className="cursor-blink text-cyan">_</span>
              <span className="text-muted-foreground">{" }"}</span>
            </div>
            <div className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Engineering Intelligence.<br />
              <span className="text-gradient">Automating the Future.</span>
            </div>
          </div>

          <a href="#top" className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-cyan">
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-cyan group-hover:bg-cyan/10">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-cyan">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-5 text-muted-foreground">
            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-cyan"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>

        <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © 2025 Alex Morgan · Built with passion & coffee ☕
        </div>
      </div>
    </footer>
  );
}
