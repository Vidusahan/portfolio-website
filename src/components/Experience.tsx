"use client";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const TIMELINE = [
  {
    role: "Principal AI Engineer",
    company: "Nebula Systems",
    period: "2023 — Present",
    bullets: [
      "Architected multi-agent LLM platform serving 500k requests/day across 12 tools",
      "Designed GitOps-native MLOps stack: cut model deploy cycle 5d → 4h",
      "Led platform team of 6 engineers across AI, infra, and DevEx",
    ],
    stack: ["LangGraph", "Kubernetes", "Terraform", "MLflow"],
  },
  {
    role: "Senior MLOps Engineer",
    company: "Helios Labs",
    period: "2021 — 2023",
    bullets: [
      "Built feature store + training pipeline serving 80 production models",
      "Reduced GPU compute spend by $1.2M with autoscaling Kubernetes operator",
      "Shipped real-time drift monitoring framework now used company-wide",
    ],
    stack: ["Airflow", "MLflow", "FastAPI", "AWS SageMaker"],
  },
  {
    role: "Cloud / DevOps Engineer",
    company: "Quanta IO",
    period: "2019 — 2021",
    bullets: [
      "Migrated monolith to microservices on EKS, zero downtime",
      "Authored Terraform modules adopted across 8 product teams",
      "Implemented blue/green CI/CD with GitHub Actions + ArgoCD",
    ],
    stack: ["AWS", "Terraform", "Docker", "ArgoCD"],
  },
  {
    role: "ML Engineer",
    company: "Datafold Research",
    period: "2018 — 2019",
    bullets: [
      "Trained NLP classifiers serving real-time sentiment scoring",
      "Productionized first model behind FastAPI + Redis caching layer",
    ],
    stack: ["PyTorch", "FastAPI", "Redis"],
  },
];

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const w = wrapRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.4;
      const passed = Math.min(Math.max(vh * 0.6 - r.top, 0), total);
      setH((passed / total) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" className="relative py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel number="04" title="EXPERIENCE" kicker={<>Seven years compounding across AI, infra, and platform.</>} />

        <div ref={wrapRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-cyan via-violet to-amber"
              style={{ height: `${h}%`, boxShadow: "0 0 10px #00d4ff" }}
            />
          </div>

          <div className="space-y-16">
            {TIMELINE.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={t.role} delay={i * 60}>
                  <div className={`relative grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>div:first-child]:order-2"}`}>
                    {/* Dot */}
                    <div className="absolute left-4 -translate-x-1/2 md:left-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-50" />
                        <div className="relative h-3 w-3 rounded-full bg-cyan glow-cyan" />
                      </div>
                    </div>

                    <div className={`pl-10 md:pl-0 ${left ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                      <div className="font-mono text-xs uppercase tracking-widest text-cyan">{t.period}</div>
                      <h3 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{t.role}</h3>
                      <div className="mt-1 text-muted-foreground">@ {t.company}</div>
                    </div>

                    <div className={`pl-10 md:pl-0 ${left ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                      <div className="mt-3 glass rounded-2xl p-6">
                        <ul className={`space-y-2 text-sm text-muted-foreground ${left ? "" : "md:text-right"}`}>
                          {t.bullets.map((b) => (
                            <li key={b} className="flex gap-3 md:gap-3">
                              {left && <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-cyan" />}
                              <span className="flex-1">{b}</span>
                              {!left && <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-cyan md:order-first" />}
                            </li>
                          ))}
                        </ul>
                        <div className={`mt-5 flex flex-wrap gap-2 ${left ? "" : "md:justify-end"}`}>
                          {t.stack.map((s) => (
                            <span key={s} className="rounded-md border border-border bg-background/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
