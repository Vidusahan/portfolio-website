"use client";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

const POSTS = [
  { title: "Production RAG: 5 mistakes that cost us a quarter", excerpt: "Hard-won lessons from deploying retrieval-augmented systems at scale — and the fixes that finally stuck.", tags: ["RAG", "LLMs"], read: "8 min" },
  { title: "Why your ML pipeline doesn't need Airflow (yet)", excerpt: "A pragmatic guide to choosing the right orchestrator — and resisting the urge to over-engineer day one.", tags: ["MLOps", "Pipelines"], read: "6 min" },
  { title: "Designing agents that don't go off the rails", excerpt: "Guardrails, tool boundaries, and the architecture patterns that keep LangGraph agents predictable in prod.", tags: ["Agents", "LangGraph"], read: "11 min" },
];

export function Writing() {
  return (
    <section id="writing" className="relative py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel number="06" title="WRITING" kicker={<>Field notes from the frontier — agents, infra, MLOps.</>} />

        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <a href="#" className="glass group relative block h-full overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-cyan/30">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-background/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cyan">
                        {t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:rotate-12 group-hover:text-cyan" />
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{p.read} read</span>
                  <span className="text-cyan">Read more →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
