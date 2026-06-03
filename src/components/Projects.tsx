"use client";
import { useEffect, useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEATURED = [
  { n: "01", emoji: "🤖", title: "Job Alert Bot", desc: "An intelligent job monitoring system that automatically tracks new job postings from multiple sources and delivers real-time notifications based on user-defined preferences and keywords.", stack: ["Python", "Web Scraping", "APIs", "Automation"], impact: "Automated daily monitoring", color: "violet", github: "https://github.com/Vidusahan/job-alert-bot" },
  { n: "02", emoji: "👋", title: "Sign Language to Text", desc: "A computer vision application that recognizes sign language gestures in real time and converts them into readable text, improving communication accessibility through AI-powered gesture recognition.", stack: ["Python", "OpenCV", "TensorFlow", "Computer Vision"], impact: "Live camera processing", color: "amber", github: "https://github.com/Vidusahan/Real-time-Sign-Language-to-Text-Conversion" },
  { n: "03", emoji: "🩺", title: "AI Medical Assistant", desc: "An AI-powered healthcare assistant that analyzes symptoms and provides preliminary diagnostic insights using machine learning and natural language processing techniques.", stack: ["Python", "Machine Learning", "NLP", "Scikit-learn"], impact: "Symptom-based diagnostics", color: "sky", github: "https://github.com/Vidusahan/ai-medical-diagnosis-assistant" },
];

const COLOR: Record<string, string> = {
  violet: "rgba(123,47,255,0.5)", amber: "rgba(255,179,71,0.5)", sky: "rgba(56,189,248,0.5)",
  pink: "rgba(244,114,182,0.5)", cyan: "rgba(0,212,255,0.5)", green: "rgba(0,255,136,0.5)",
};

const TEXT_COLOR: Record<string, string> = {
  violet: "text-violet", amber: "text-amber", sky: "text-sky",
  pink: "text-pink", cyan: "text-cyan", green: "text-green",
};

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const wrap = wrapRef.current!;
      const updateScroll = () => {
        const total = track.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(track, {
          x: -total,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${total}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return tween;
      };
      // Only enable on lg+
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const t = updateScroll();
        return () => t.kill();
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative py-32">
      <div className="mesh-blob h-[500px] w-[500px] bg-violet bottom-0 left-1/4 opacity-20" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel
          number="03"
          title="FEATURED WORK"
          kicker={<>Six builds across agents, pipelines, and infrastructure. Shipped, monitored, still running.</>}
        />
      </div>

      {/* Horizontal scroll */}
      <div ref={wrapRef} className="relative hidden h-screen overflow-hidden lg:block">
        <div ref={trackRef} className="absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-8 pl-[10vw] pr-[10vw] will-change-transform">
          {FEATURED.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
          <div className="flex w-[60vw] shrink-0 items-center justify-center">
            <a href="#contact" className="group">
              <div className="font-display text-7xl font-bold tracking-tight text-foreground/20 transition-colors group-hover:text-cyan">
                Let's build →
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile grid */}
      <div className="mx-auto mt-12 grid max-w-[1400px] gap-6 px-6 md:px-10 lg:hidden">
        {FEATURED.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: (typeof FEATURED)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div
      ref={ref}
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group relative w-full shrink-0 overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 lg:w-[78vw] lg:max-w-[1100px] lg:p-12"
      style={{ transformStyle: "preserve-3d", boxShadow: `0 30px 80px -40px ${COLOR[p.color]}` }}
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -right-8 -top-12 font-display text-[10rem] font-bold leading-none tracking-tighter text-foreground/[0.04] lg:text-[16rem]">
        {p.n}
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Project / {p.n}
          </div>
          <h3 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">
            <span className="mr-3">{p.emoji}</span>
            {p.title}
          </h3>
          <p className="mt-6 max-w-md text-base text-muted-foreground lg:text-lg">{p.desc}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2">
            <span className={`h-1.5 w-1.5 rounded-full ${TEXT_COLOR[p.color]} bg-current`} />
            <span className={`font-mono text-xs ${TEXT_COLOR[p.color]}`}>{p.impact}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md border border-border bg-background/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            {/* @ts-ignore */}
            {p.github && (
              // @ts-ignore
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground hover:border-cyan/40 hover:text-cyan">
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            )}
            {/* @ts-ignore */}
            {p.live && (
              // @ts-ignore
              <a href={p.live} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full ${TEXT_COLOR[p.color]} border border-current bg-current/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-current/20`}>
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-background/40 scanlines">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green/60" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="font-mono text-xs leading-relaxed text-muted-foreground">
              <div><span className="text-green">$</span> ./{p.title.toLowerCase()} --start</div>
              <div className="mt-2">{">"} booting modules...</div>
              <div>{">"} loading {p.stack[0]}.runtime</div>
              <div>{">"} connecting {p.stack[1] ?? "core"}</div>
              <div className={`mt-2 ${TEXT_COLOR[p.color]}`}>{">"} status: <span className="cursor-blink">▍</span> RUNNING</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </div>
  );
}
