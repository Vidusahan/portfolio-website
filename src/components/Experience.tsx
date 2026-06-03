"use client";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const TIMELINE = [
  {
    role: "Webmaster",
    company: "IEEE CS Student Branch Chapter - USJ",
    period: "2024 — 2025",
    bullets: [
      "Manage and maintain the chapter's digital platforms, ensuring performance, accessibility, and a seamless user experience.",
      "Collaborate with executive committees to publish announcements, promote events, and strengthen the chapter's online presence.",
      "Develop and implement web solutions that support chapter operations, member engagement, and organizational growth.",
      "Contribute technical expertise to digital transformation initiatives and website enhancements."
    ],
    stack: ["Web Development", "WordPress", "UI/UX", "Project Management", "Digital Strategy"],
  },
  {
    role: "Active Member & Student Leader",
    company: "IEEE Student Branch - USJ",
    period: "2023 — Present",
    bullets: [
      "Contributed to the planning, promotion, and execution of multiple IEEE events and initiatives.",
      "Collaborated with cross-functional teams in marketing, communications, and event management.",
      "Supported student engagement programs that increased awareness of IEEE activities and opportunities.",
      "Recognized for outstanding volunteer contributions and commitment to the student community."
    ],
    stack: ["Leadership", "Teamwork", "Event Management", "Community Building"],
  },
  {
    role: "IEEEXtreme 18.0 Student Ambassador",
    company: "IEEE Student Branch - USJ",
    period: "2024",
    bullets: [
      "Served as the primary liaison between IEEE headquarters and the university student community.",
      "Led awareness campaigns, information sessions, and promotional activities to increase participation.",
      "Guided participants through registration, team formation, and competition preparation.",
      "Supported the organization of mock contests and preparatory workshops for competitors."
    ],
    stack: ["Leadership", "Public Speaking", "Marketing", "Community Engagement"],
  },
  {
    role: "Design & Marketing Head — J'pura Xtreme 1.0",
    company: "IEEE Student Branch - USJ",
    period: "2024",
    bullets: [
      "Led the overall branding and marketing strategy for the university's flagship competitive programming event.",
      "Designed event identity assets, promotional materials, certificates, and social media campaigns.",
      "Coordinated outreach initiatives that increased event visibility and participant engagement.",
      "Worked closely with organizing committees to ensure consistent branding and successful promotion."
    ],
    stack: ["Graphic Design", "Marketing", "Branding", "Leadership"],
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
        <SectionLabel number="04" title="EXPERIENCE" kicker={<>Leadership, community building, and technical contributions through IEEE initiatives, student engagement, and digital innovation.</>} />

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
