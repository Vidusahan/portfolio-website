"use client";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { Scramble } from "./Scramble";
import { ArrowDown, Download, Github, Linkedin, Mail, Twitter } from "lucide-react";

const ROLES = ["AI/ML Engineer", "Agentic AI Builder", "MLOps Architect", "Cloud & DevOps Engineer"];
const ORBIT = ["Python", "LangChain", "Docker", "Kubernetes", "AWS", "TensorFlow", "PyTorch", "Terraform"];

export function Hero() {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleText, setRoleText] = useState("");
  const mouseRef = useRef<HTMLDivElement>(null);

  // Boot sequence
  useEffect(() => {
    const lines = [
      "> initializing portfolio.sys ...",
      "> loading neural modules ✓",
      "> mounting /skills, /projects ✓",
      "> systems online ✓",
    ];
    let i = 0;
    const id = setInterval(() => {
      setBootLines((p) => [...p, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => setBootDone(true), 500);
      }
    }, 280);
    return () => clearInterval(id);
  }, []);

  // Typewriter roles
  useEffect(() => {
    if (!bootDone) return;
    const current = ROLES[roleIdx];
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!deleting) {
        setRoleText(current.slice(0, i + 1));
        i++;
        if (i === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
      } else {
        setRoleText(current.slice(0, i - 1));
        i--;
        if (i === 0) {
          setRoleIdx((p) => (p + 1) % ROLES.length);
          return;
        }
      }
      timer = setTimeout(tick, deleting ? 40 : 70);
    };
    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, [bootDone, roleIdx]);

  // Parallax mouse
  useEffect(() => {
    const el = mouseRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32">
      {/* Background layers */}
      <div ref={mouseRef} className="absolute inset-0 grid-bg opacity-40" />
      <div className="mesh-blob h-[600px] w-[600px] bg-violet -top-32 -left-32" />
      <div className="mesh-blob h-[500px] w-[500px] bg-cyan top-1/3 right-0" />
      <div className="mesh-blob h-[300px] w-[300px] bg-amber bottom-0 left-1/3 opacity-25" />

      {/* Stars */}
      <Stars />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Boot terminal */}
        <div
          className={`glass mb-8 inline-block rounded-md p-3 font-mono text-[11px] scanlines transition-opacity duration-500 ${
            bootDone ? "opacity-60" : "opacity-100"
          }`}
        >
          {bootLines.map((l, i) => (
            <div key={i} className={i === bootLines.length - 1 ? "text-green" : "text-muted-foreground"}>
              {l}
            </div>
          ))}
        </div>

        {/* Status chip */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan transition-all duration-700 ${
            bootDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          📍 Jaela, Sri Lanka
        </div>

        {/* Name */}
        <h1
          className={`mt-6 font-display text-[20vw] font-bold leading-[0.85] tracking-tight md:text-[14vw] lg:text-[12rem] transition-all duration-1000 ${
            bootDone ? "opacity-100" : "opacity-0"
          }`}
        >
          {bootDone && <Scramble text="VIDUSAHAN" />}
          <br />
          <span className="text-gradient">
            {bootDone && <Scramble text="PERERA." />}
          </span>
        </h1>

        {/* Role typewriter */}
        <div
          className={`mt-8 flex items-baseline gap-4 font-mono text-sm uppercase tracking-widest transition-all duration-700 delay-300 ${
            bootDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-muted-foreground">{">"}</span>
          <span className="text-foreground">{roleText}</span>
          <span className="cursor-blink text-cyan">|</span>
        </div>

        {/* Subheadline */}
        <p
          className={`mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl transition-all duration-700 delay-500 ${
            bootDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Engineering intelligent systems that turn <span className="text-foreground">research</span> into{" "}
          <span className="text-foreground">reality</span>.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-700 ${
            bootDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="relative inline-flex items-center gap-3 rounded-full bg-cyan px-7 py-4 font-mono text-xs uppercase tracking-widest text-background glow-cyan transition-transform hover:scale-[1.02]"
          >
            View My Work
            <ArrowDown className="h-4 w-4 -rotate-45" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-7 py-4 font-mono text-xs uppercase tracking-widest text-foreground hover:border-cyan/40 hover:text-cyan"
          >
            <Download className="h-4 w-4" />
            Download CV
          </MagneticButton>
        </div>

        {/* Socials */}
        <div
          className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-[900ms] ${
            bootDone ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            { Icon: Github, href: "https://github.com/Vidusahan" },
            { Icon: Linkedin, href: "https://linkedin.com/in/vidusahan-perera-9738681b1" },
            { Icon: Mail, href: "mailto:vidusahanperera31@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-muted-foreground transition-colors hover:text-cyan">
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Orbiting tech badges */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-[420px] w-[420px]">
            {ORBIT.map((tech, i) => {
              const angle = (i / ORBIT.length) * Math.PI * 2;
              const r = 190;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div
                  key={tech}
                  className="float-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20 bg-background/80 px-3 py-1.5 font-mono text-[11px] text-cyan backdrop-blur-md"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {tech}
                </div>
              );
            })}
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20 glow-violet animate-pulse" />
          </div>
        </div>

        {/* Scroll */}
        <div className="mt-20 flex items-end justify-between border-t border-border pt-6">
          <span className="font-display text-[18vw] font-bold leading-none tracking-tighter text-foreground/5 md:text-[14vw] lg:text-[10rem]">
            SCROLL
          </span>
          <div className="flex flex-col items-center gap-2 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>discover</span>
            <ArrowDown className="h-4 w-4 animate-bounce text-cyan" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 0.5,
    d: Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: 0.4,
            animation: `pulse 3s ease-in-out ${s.d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
