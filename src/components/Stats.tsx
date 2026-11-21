"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const stats = [
  { value: 5000, suffix: "+", label: "Bottles delivered" },
  { value: 3200, suffix: "+", label: "Happy clients" },
  { value: 12, suffix: "", label: "Signature blends" },
  { value: 4, suffix: "", label: "Years of craft" },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("en-US")),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="border-y border-lux-gold/20 bg-lux-black px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-lux-serif text-5xl text-lux-gold md:text-6xl">
              <span className="stat-num" data-target={s.value}>0</span>
              {s.suffix}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-lux-ivory/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}