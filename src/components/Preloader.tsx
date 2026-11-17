"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          window.dispatchEvent(new Event("preloader:done"));
          if (root.current) root.current.style.display = "none";
        },
      });
      tl.fromTo(".pl-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" })
        .fromTo(
          ".pl-mark",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.4"
        )
        .to(".pl-inner", { opacity: 0, duration: 0.5 }, "+=0.5")
        .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-lux-black"
    >
      <div className="pl-inner flex flex-col items-center gap-6">
        <div className="pl-line h-px w-48 origin-left bg-lux-gold" />
        <span className="pl-mark font-lux-serif text-5xl tracking-[0.5em] text-lux-gold pl-[0.5em]">
          {site.monogram}
        </span>
      </div>
    </div>
  );
}