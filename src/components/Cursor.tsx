"use client";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover" | "view">("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const dot = dotRef.current!, ring = ringRef.current!;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, textarea, [role='button'], [data-cursor]");
      if (interactive) {
        const cl = interactive.getAttribute("data-cursor");
        if (cl === "view") { setVariant("view"); setLabel("View"); }
        else { setVariant("hover"); setLabel(""); }
      } else {
        setVariant("default"); setLabel("");
      }
    };
    window.addEventListener("mouseover", over);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  const size = variant === "view" ? 88 : variant === "hover" ? 56 : 32;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-cyan mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-cyan/60 transition-[width,height,background-color] duration-200 ease-out flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: variant === "view" ? "rgba(0,212,255,0.15)" : "transparent",
          backdropFilter: variant !== "default" ? "blur(2px)" : "none",
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">{label}</span>
        )}
      </div>
    </>
  );
}
