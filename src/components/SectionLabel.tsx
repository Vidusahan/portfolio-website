"use client";
import { type ReactNode } from "react";
import { Scramble } from "./Scramble";
import { Reveal } from "./Reveal";

export function SectionLabel({ number, title, kicker }: { number: string; title: string; kicker?: ReactNode }) {
  return (
    <Reveal className="mb-16 flex flex-col gap-3 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{number} —</div>
        <h2 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          <Scramble text={title} />
        </h2>
      </div>
      {kicker && <p className="max-w-md text-muted-foreground">{kicker}</p>}
    </Reveal>
  );
}
