"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const steps = [
  { n: "01", title: "Sourcing", text: "We choose rare oud, damask rose and amber from trusted growers, one harvest at a time." },
  { n: "02", title: "Blending", text: "Our perfumers layer top, heart and base notes by hand until the balance feels effortless." },
  { n: "03", title: "Maturation", text: "Every blend rests in the dark for weeks, letting the notes deepen and settle." },
  { n: "04", title: "Bottling", text: "Each bottle is filled and sealed by hand, with a gold cap that closes with a quiet click." },
  { n: "05", title: "Quality Check", text: "Before leaving us, every batch is tested for longevity, clarity and consistency." },
];

export default function CraftProcess() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const dist = () => (track.current ? track.current.scrollWidth - window.innerWidth : 0);
        gsap.to(track.current, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          ".craft-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + dist(),
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-lux-espresso py-20 md:flex md:h-svh md:items-center md:py-0">
      <div ref={track} className="flex flex-col gap-12 px-6 md:w-max md:flex-row md:items-center md:gap-16 md:px-[8vw]">
        {/* intro panel */}
        <div className="md:w-[380px] md:shrink-0">
          <p className="text-[11px] uppercase tracking-[0.45em] text-lux-gold">The Craft</p>
          <h2 className="mt-4 font-lux-serif text-5xl font-light italic leading-tight text-lux-ivory md:text-6xl">
            Made slowly, on purpose
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-lux-ivory/70">
            Five careful steps stand between a rare ingredient and the bottle on your shelf.
          </p>
        </div>

        {steps.map((s) => (
          <article
            key={s.n}
            className="relative rounded-2xl border border-lux-gold/20 bg-lux-black/50 p-8 md:w-[400px] md:shrink-0"
          >
            <span
              className="font-lux-serif text-8xl leading-none text-transparent"
              style={{ WebkitTextStroke: "1px rgba(201,162,75,0.6)" }}
            >
              {s.n}
            </span>
            <h3 className="mt-6 font-lux-serif text-3xl text-lux-ivory">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-lux-ivory/70">{s.text}</p>
          </article>
        ))}
      </div>

      {/* gold progress line (desktop) */}
      <div className="absolute inset-x-[8vw] bottom-12 hidden h-px bg-lux-ivory/10 md:block">
        <div className="craft-line h-px w-full origin-left bg-lux-gold" />
      </div>
    </section>
  );
}