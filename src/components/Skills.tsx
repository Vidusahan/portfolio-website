"use client";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { Brain, Bot, Workflow, Container, Cloud, Activity, Layout, Server, Database } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { n: "01", icon: Brain, title: "AI / ML", color: "cyan", level: 85, items: ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Hugging Face", "OpenAI API", "Jupyter Notebook"] },
  { n: "02", icon: Bot, title: "Agentic AI", color: "violet", level: 85, items: ["LangChain", "LangGraph", "RAG", "Vector Databases", "Pinecone", "Weaviate", "MCP", "Prompt Engineering"] },
  { n: "03", icon: Workflow, title: "Automation", color: "amber", level: 80, items: ["n8n", "Zapier", "Make", "Selenium", "Playwright", "GitHub Actions", "Python Automation"] },
  { n: "04", icon: Container, title: "DevOps", color: "green", level: 80, items: ["Docker", "Kubernetes", "Git", "GitHub Actions", "Linux", "Nginx", "Helm", "Terraform"] },
  { n: "05", icon: Cloud, title: "Cloud", color: "sky", level: 75, items: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS SageMaker", "Firebase", "Vercel", "Railway", "Render"] },
  { n: "06", icon: Activity, title: "MLOps", color: "pink", level: 80, items: ["MLflow", "DVC", "Weights & Biases", "FastAPI", "Docker", "Model Serving", "CI/CD for ML"] },
];

const COLOR_MAP: Record<string, { border: string; text: string; bg: string; shadow: string }> = {
  cyan: { border: "border-cyan/40", text: "text-cyan", bg: "bg-cyan", shadow: "rgba(0,212,255,0.4)" },
  violet: { border: "border-violet/40", text: "text-violet", bg: "bg-violet", shadow: "rgba(123,47,255,0.4)" },
  amber: { border: "border-amber/40", text: "text-amber", bg: "bg-amber", shadow: "rgba(255,179,71,0.4)" },
  green: { border: "border-green/40", text: "text-green", bg: "bg-green", shadow: "rgba(0,255,136,0.4)" },
  sky: { border: "border-sky/40", text: "text-sky", bg: "bg-sky", shadow: "rgba(56,189,248,0.4)" },
  pink: { border: "border-pink/40", text: "text-pink", bg: "bg-pink", shadow: "rgba(244,114,182,0.4)" },
  orange: { border: "border-orange/40", text: "text-orange", bg: "bg-orange", shadow: "rgba(251,146,60,0.4)" },
  teal: { border: "border-teal/40", text: "text-teal", bg: "bg-teal", shadow: "rgba(45,212,191,0.4)" },
  yellow: { border: "border-yellow/40", text: "text-yellow", bg: "bg-yellow", shadow: "rgba(250,204,21,0.4)" },
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setW(value); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  const c = COLOR_MAP[color];
  return (
    <div ref={ref} className="h-1 w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className={`h-full ${c.bg} transition-all duration-[1400ms] ease-out`}
        style={{ width: `${w}%`, boxShadow: `0 0 10px ${c.shadow}` }}
      />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mesh-blob h-[500px] w-[500px] bg-cyan top-1/3 right-0 opacity-15" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel
          number="02"
          title="SKILLS / TECH STACK"
          kicker={<>Building expertise across AI engineering, intelligent automation, and cloud-native systems. From machine learning experimentation to production-ready deployments.</>}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const c = COLOR_MAP[cat.color];
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={(i % 3) * 100}>
                <div
                  className={`group relative h-full rounded-2xl border ${c.border} glass p-6 transition-all duration-500 hover:-translate-y-1`}
                  style={{ borderTopWidth: 3 }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 20px 50px -20px ${c.shadow}`)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${c.border} bg-background/50`}>
                      <Icon className={`h-6 w-6 ${c.text}`} />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{cat.n}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{cat.title}</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <ProgressBar value={cat.level} color={cat.color} />
                    <span className={`font-mono text-xs ${c.text}`}>{cat.level}%</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((it) => (
                      <span
                        key={it}
                        className={`rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:${c.text}`}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
