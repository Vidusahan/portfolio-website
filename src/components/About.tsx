"use client";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Models Deployed" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Automations Built" },
];

const TICKER = ["LangGraph", "Kubernetes", "Terraform", "MLflow", "FastAPI", "OpenAI", "Pinecone", "Airflow", "Docker", "AWS", "TensorFlow", "n8n", "BentoML", "DVC"];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(value * eased));
            if (p < 1) requestAnimationFrame(step);
            else setN(value);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mesh-blob h-[400px] w-[400px] bg-violet top-20 -left-20 opacity-20" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel
          number="01"
          title="ABOUT"
          kicker={<>Building intelligent systems where AI research meets scalable engineering.</>}
        />

        <div className="grid gap-16 lg:grid-cols-[400px_1fr] lg:gap-24">
          <Reveal>
            <div className="relative mx-auto w-fit">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan via-violet to-amber opacity-60 blur-2xl" />
              <div className="relative h-72 w-72 overflow-hidden rounded-full border-2 border-cyan/40 bg-surface">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="flex h-full w-full items-center justify-center font-display text-8xl font-bold text-gradient">
                  VP
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-green/40 bg-background px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-green">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green animate-pulse" />
                Available for Work
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={100}>
              <p className="text-2xl leading-relaxed text-foreground md:text-3xl">
                I build <span className="text-cyan">AI-powered applications</span>, develop{" "}
                <span className="text-violet">NLP solutions</span>, and engineer{" "}
                <span className="text-amber">MLOps workflows</span> that transform machine learning
                ideas into production-ready systems. My focus spans Large Language Models (LLMs), RAG architectures, LangChain, automation, and cloud-native infrastructure, creating solutions that are both intelligent and scalable.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                As a Computer Science undergraduate and aspiring AI Engineer, I am passionate about bridging the gap between research and real-world deployment. I enjoy designing end-to-end AI systems, experimenting with NLP and generative AI technologies, and implementing DevOps and MLOps practices that enable reliable, efficient, and scalable machine learning solutions. Beyond technical development, I actively contribute to the technology community through IEEE, fostering innovation, collaboration, and continuous learning.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-background p-6 md:p-10">
              <div className="font-display text-5xl font-bold text-gradient md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Ticker */}
        <div className="relative mt-16 overflow-hidden border-y border-border py-6">
          <div className="marquee-track gap-12 font-display text-4xl font-bold text-foreground/20 md:text-5xl">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex shrink-0 items-center gap-12">
                {t} <span className="text-cyan/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
