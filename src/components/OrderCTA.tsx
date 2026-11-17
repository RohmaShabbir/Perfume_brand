"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";

export default function OrderCTA() {
  const root = useRef<HTMLElement>(null);
  const setQuick = useCart((s) => s.setQuick);
  const [count, setCount] = useState(site.stockTotal);
  const hero = getProduct("noir-oud");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".cta-reveal", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
      });

      // stock counter niche ghat kar asli number par ruke
      const obj = { v: site.stockTotal };
      gsap.to(obj, {
        v: site.stockLeft,
        duration: 2.4,
        ease: "power2.out",
        onUpdate: () => setCount(Math.round(obj.v)),
        scrollTrigger: { trigger: root.current, start: "top 55%", once: true },
      });

      gsap.to(".cta-bottle", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  const pct = (site.stockLeft / site.stockTotal) * 100;

  return (
    <section
      ref={root}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-lux-black px-6 py-24"
    >
      {/* spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(201,162,75,0.28),transparent_55%)]" />
      <div className="glow-pulse absolute left-1/2 top-[38%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lux-gold/20 blur-[100px]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="cta-bottle cta-reveal">
          <BottleArt tone={hero?.tone} className="h-64 w-auto drop-shadow-[0_0_45px_rgba(201,162,75,0.45)] md:h-96" />
        </div>

        <p className="cta-reveal mt-10 text-[11px] uppercase tracking-[0.45em] text-lux-gold">Limited Batch</p>
        <h2 className="cta-reveal mt-4 font-lux-serif text-5xl font-light italic leading-tight text-lux-ivory md:text-7xl">
          Once it&apos;s gone, it&apos;s gone
        </h2>
        <p className="cta-reveal mt-5 max-w-md text-sm leading-relaxed text-lux-ivory/70 md:text-base">
          Every batch is blended in small quantities. When the last bottle is sold, the next batch is weeks away.
        </p>

        {/* stock meter */}
        <div className="cta-reveal mt-10 w-full max-w-sm">
          <div className="mb-3 flex items-end justify-between">
            <span className="font-lux-serif text-5xl text-lux-gold">{count}</span>
            <span className="pb-1 text-[10px] uppercase tracking-[0.3em] text-lux-ivory/60">
              of {site.stockTotal} bottles left
            </span>
          </div>
          <div className="h-px w-full bg-lux-ivory/15">
            <div className="h-px bg-lux-gold transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <button
          onClick={() => setQuick("noir-oud")}
          className="shimmer cta-reveal mt-12 rounded-full bg-lux-gold px-14 py-5 text-xs font-medium uppercase tracking-[0.35em] text-lux-black transition hover:brightness-110"
        >
          Order Now
        </button>
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="cta-reveal mt-6 text-[11px] uppercase tracking-[0.3em] text-lux-ivory/50 transition hover:text-lux-gold"
        >
          or order on WhatsApp
        </a>
      </div>
    </section>
  );
}