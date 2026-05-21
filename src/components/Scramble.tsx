"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  className?: string;
  trigger?: boolean;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Scramble({ text, className = "", trigger = true }: Props) {
  const [out, setOut] = useState(text);
  const fired = useRef(false);

  useEffect(() => {
    if (!trigger || fired.current) return;
    fired.current = true;
    const final = text;
    let frame = 0;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < final.length; i++) {
      queue.push({ from: "", to: final[i], start: Math.floor(Math.random() * 20), end: Math.floor(Math.random() * 30) + 20 });
    }
    let raf = 0;
    const update = () => {
      let complete = 0;
      let str = "";
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) { complete++; str += q.to; }
        else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          str += `<span style="color:#00d4ff">${q.char}</span>`;
        } else { str += q.from; }
      }
      setOut(str);
      if (complete === queue.length) return;
      frame++;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [trigger, text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: out }} />;
}
