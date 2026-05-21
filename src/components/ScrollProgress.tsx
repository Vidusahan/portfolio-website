"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[9997] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan via-violet to-amber transition-[width] duration-75"
        style={{ width: `${p}%`, boxShadow: "0 0 12px #00d4ff" }}
      />
    </div>
  );
}
