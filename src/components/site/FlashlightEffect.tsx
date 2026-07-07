"use client";

import { useEffect, useRef, useState } from "react";

export function FlashlightEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };
    const handleEnter = () => setActive(true);
    const handleLeave = () => setActive(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden transition-opacity duration-300 lg:block"
      style={{
        opacity: active ? 1 : 0,
        background:
          "radial-gradient(450px at var(--x, 50%) var(--y, 50%), rgba(34, 211, 238, 0.3), rgba(14, 165, 233, 0.1) 35%, transparent 70%)",
      }}
    />
  );
}
