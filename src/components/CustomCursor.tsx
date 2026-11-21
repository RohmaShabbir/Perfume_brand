"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // sirf mouse wale devices par
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });

    gsap.set([ring.current, dot.current], { opacity: 0 });

    const move = (e: MouseEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hot = !!t?.closest("a, button, [role='button'], input, textarea, select, label");
      gsap.to(ring.current, {
        scale: hot ? 1.7 : 1,
        backgroundColor: hot ? "rgba(201,162,75,0.12)" : "rgba(201,162,75,0)",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const leave = () => gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-lux-gold/70"
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-lux-gold"
      />
    </>
  );
}