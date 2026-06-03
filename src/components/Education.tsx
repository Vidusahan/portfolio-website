"use client";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { GraduationCap } from "lucide-react";

const EDU = [
  { name: "Bachelor of Computing (Hons) in Computer Science", issuer: "University of Sri Jayewardenepura, Sri Lanka", date: "Expected Graduation: 2027", color: "cyan" },
];

const TEXT: Record<string, string> = {
  cyan: "text-cyan",
};
const BORDER: Record<string, string> = {
  cyan: "border-cyan/40",
};

export function Education() {
  return (
    <section id="education" className="relative py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel number="05" title="EDUCATION" kicker={<>Academic background and foundations.</>} />
      </div>
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-5 px-6 md:px-10 lg:px-[max(40px,calc((100vw-1400px)/2+40px))]">
          {EDU.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} className="shrink-0">
              <div className={`group glass relative w-[400px] rounded-2xl border ${BORDER[c.color]} p-6 transition-transform hover:-translate-y-1`}>
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl border ${BORDER[c.color]} bg-background/50`}>
                  <GraduationCap className={`h-7 w-7 ${TEXT[c.color]}`} />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">{c.name}</h3>
                <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {c.issuer}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {c.date}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
