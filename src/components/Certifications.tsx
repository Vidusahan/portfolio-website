"use client";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";
import { Award, ExternalLink } from "lucide-react";

const CERTS = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2024", color: "amber" },
  { name: "Google Cloud Professional ML Engineer", issuer: "Google Cloud", date: "2024", color: "sky" },
  { name: "Certified Kubernetes Administrator", issuer: "CNCF", date: "2023", color: "cyan" },
  { name: "TensorFlow Developer", issuer: "Google", date: "2022", color: "orange" },
  { name: "HashiCorp Terraform Associate", issuer: "HashiCorp", date: "2023", color: "violet" },
];

const TEXT: Record<string, string> = {
  amber: "text-amber", sky: "text-sky", cyan: "text-cyan", orange: "text-orange", violet: "text-violet",
};
const BORDER: Record<string, string> = {
  amber: "border-amber/40", sky: "border-sky/40", cyan: "border-cyan/40", orange: "border-orange/40", violet: "border-violet/40",
};

export function Certifications() {
  return (
    <section className="relative py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel number="05" title="CREDENTIALS" kicker={<>Receipts for the resume.</>} />
      </div>
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-5 px-6 md:px-10 lg:px-[max(40px,calc((100vw-1400px)/2+40px))]">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} className="shrink-0">
              <div className={`group glass relative w-72 rounded-2xl border ${BORDER[c.color]} p-6 transition-transform hover:-translate-y-1`}>
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl border ${BORDER[c.color]} bg-background/50`}>
                  <Award className={`h-7 w-7 ${TEXT[c.color]}`} />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">{c.name}</h3>
                <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {c.issuer} · {c.date}
                </div>
                <a href="#" className={`mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${TEXT[c.color]}`}>
                  Verify <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
