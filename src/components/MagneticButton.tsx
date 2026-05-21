"use client";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

export function MagneticButton({ children, className = "", strength = 0.35, onClick, href, as = "button" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * strength, y: y * strength });
  };
  const reset = () => setT({ x: 0, y: 0 });

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block"
      style={{ transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform 0.25s cubic-bezier(0.2,0.8,0.2,1)" }}
    >
      <div className={className}>{children}</div>
    </div>
  );

  if (as === "a" && href) {
    return <a href={href} onClick={onClick}>{inner}</a>;
  }
  return <button type="button" onClick={onClick}>{inner}</button>;
}
