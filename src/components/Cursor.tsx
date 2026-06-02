"use client";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover" | "view">("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      // Read refs lazily each frame — they may not exist on the first effect run
      const dot = dotRef.current;
      const ring = ringRef.current;
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
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  // Always render the DOM so refs are available — hide with opacity when not enabled
  const size = variant === "view" ? 88 : variant === "hover" ? 56 : 32;
  const show = enabled && visible;

  return (
    <>
      {/* Dot — solid cyan with glow */}
      <div
        ref={dotRef}
        style={{ opacity: show ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full transition-opacity duration-150"
      >
        <span
          className="block h-full w-full rounded-full"
          style={{
            background: "#00d4ff",
            boxShadow: "0 0 8px 2px rgba(0,212,255,0.8), 0 0 2px 1px rgba(0,212,255,1)",
          }}
        />
      </div>

      {/* Ring — follows with smooth lag */}
      <div
        ref={ringRef}
        style={{
          width: size,
          height: size,
          opacity: show ? 1 : 0,
          background: variant === "view" ? "rgba(0,212,255,0.12)" : "transparent",
          backdropFilter: variant !== "default" ? "blur(2px)" : "none",
          boxShadow: variant === "hover" || variant === "view" ? "0 0 20px rgba(0,212,255,0.25), inset 0 0 10px rgba(0,212,255,0.08)" : "none",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-cyan/50 transition-[width,height,background-color,box-shadow,opacity] duration-200 ease-out flex items-center justify-center"
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">{label}</span>
        )}
      </div>
    </>
  );
}

