"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/lib/cart";

const BottleScene = dynamic(() => import("./BottleScene"), {
  ssr: false,
  loading: () => null,
});

const stages = [
  {
    label: "Top Notes",
    title: "Saffron & Bergamot",
    text: "The first impression. Bright, golden and impossible to ignore, it opens within seconds of touching skin.",
  },
  {
    label: "Heart Notes",
    title: "Oud & Rose",
    text: "The soul of the fragrance. Deep smoky oud meets velvet rose, and this is the part people remember.",
  },
  {
    label: "Base Notes",
    title: "Amber & Musk",
    text: "The lasting trail. Warm amber and soft musk stay on your skin for hours, long after you leave the room.",
  },
];

export default function BottleShowcase() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(false);
  const setQuick = useCart((s) => s.setQuick);

  // section screen par ho tabhi 3D render ho (performance)
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        onUpdate: (self) => {
          progress.current = self.progress;
          const s = Math.min(2, Math.floor(self.progress * 3));
          setStage((prev) => (prev === s ? prev : s));
          gsap.set(".sc-bar", { scaleY: self.progress });
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative h-svh w-full overflow-hidden bg-[radial-gradient(ellipse_at_70%_45%,#2a1d10_0%,#0b0907_65%)]"
    >
      {/* heading */}
      <p className="absolute left-1/2 top-24 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.45em] text-lux-gold md:top-28">
        The Anatomy of a Scent
      </p>

      {/* 3D canvas */}
      <div className="absolute inset-0">
        <BottleScene progress={progress} active={active} />
      </div>

      {/* mobile ke liye neeche dark gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent md:hidden" />

      {/* text */}
      <div className="absolute inset-x-6 bottom-10 z-10 text-center md:inset-x-auto md:bottom-auto md:left-[8vw] md:top-1/2 md:max-w-md md:-translate-y-1/2 md:text-left">
        <p className="mb-4 font-lux-serif text-sm tracking-[0.3em] text-lux-gold/70">
          0{stage + 1} / 03
        </p>

        <div className="grid">
          {stages.map((s, i) => (
            <div
              key={s.label}
              className={`[grid-area:1/1] transition-all duration-700 ${
                stage === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">{s.label}</p>
              <h2 className="mt-3 font-lux-serif text-4xl font-light italic leading-tight text-lux-ivory md:text-6xl">
                {s.title}
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-lux-ivory/70 md:mx-0 md:text-base">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setQuick("noir-oud")}
          className="mt-7 rounded-full border border-lux-gold px-8 py-3 text-[11px] uppercase tracking-[0.3em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
        >
          Shop Noir Oud
        </button>
      </div>

      {/* progress bar (right side) */}
      <div className="absolute right-5 top-1/2 z-10 hidden h-40 w-px -translate-y-1/2 bg-lux-ivory/15 md:right-10 md:block">
        <div className="sc-bar h-full w-px origin-top scale-y-0 bg-lux-gold" />
      </div>
    </section>
  );
}





// -------------------------------------


// "use client";
// import dynamic from "next/dynamic";
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { useCart } from "@/lib/cart";

// const BottleScene = dynamic(() => import("./BottleScene"), {
//   ssr: false,
//   loading: () => null,
// });

// const stages = [
//   {
//     label: "Top Notes",
//     title: "Saffron & Bergamot",
//     text: "The first impression. Bright, golden and impossible to ignore, it opens within seconds of touching skin.",
//   },
//   {
//     label: "Heart Notes",
//     title: "Oud & Rose",
//     text: "The soul of the fragrance. Deep smoky oud meets velvet rose, and this is the part people remember.",
//   },
//   {
//     label: "Base Notes",
//     title: "Amber & Musk",
//     text: "The lasting trail. Warm amber and soft musk stay on your skin for hours, long after you leave the room.",
//   },
// ];

// export default function BottleShowcase() {
//   const root = useRef<HTMLElement>(null);
//   const progress = useRef(0);
//   const [stage, setStage] = useState(0);
//   const [active, setActive] = useState(false);
//   const setQuick = useCart((s) => s.setQuick);

//   // section screen par ho tabhi 3D render ho (performance)
//   useEffect(() => {
//     const el = root.current;
//     if (!el) return;
//     const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "200px" });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   useGSAP(
//     () => {
//       gsap.registerPlugin(ScrollTrigger);
//       ScrollTrigger.create({
//         trigger: root.current,
//         start: "top top",
//         end: "+=300%",
//         pin: true,
//         onUpdate: (self) => {
//           progress.current = self.progress;
//           const s = Math.min(2, Math.floor(self.progress * 3));
//           setStage((prev) => (prev === s ? prev : s));
//           gsap.set(".sc-bar", { scaleY: self.progress });
//         },
//       });
//     },
//     { scope: root }
//   );

//   return (
//     <section
//       ref={root}
//       className="relative h-svh w-full overflow-hidden bg-[radial-gradient(ellipse_at_70%_45%,#2a1d10_0%,#0b0907_65%)]"
//     >
//       {/* heading */}
//       <p className="absolute left-1/2 top-24 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.45em] text-lux-gold md:top-28">
//         The Anatomy of a Scent
//       </p>

//       {/* 3D canvas */}
//       <div className="absolute inset-0">
//         <BottleScene progress={progress} active={active} />
//       </div>

//       {/* mobile ke liye neeche dark gradient */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent md:hidden" />

//       {/* text */}
//       <div className="absolute inset-x-6 bottom-10 z-10 text-center md:inset-x-auto md:bottom-auto md:left-[8vw] md:top-1/2 md:max-w-md md:-translate-y-1/2 md:text-left">
//         <p className="mb-4 font-lux-serif text-sm tracking-[0.3em] text-lux-gold/70">
//           0{stage + 1} / 03
//         </p>

//         <div className="grid">
//           {stages.map((s, i) => (
//             <div
//               key={s.label}
//               className={`[grid-area:1/1] transition-all duration-700 ${
//                 stage === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
//               }`}
//             >
//               <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">{s.label}</p>
//               <h2 className="mt-3 font-lux-serif text-4xl font-light italic leading-tight text-lux-ivory md:text-6xl">
//                 {s.title}
//               </h2>
//               <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-lux-ivory/70 md:mx-0 md:text-base">
//                 {s.text}
//               </p>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => setQuick("noir-oud")}
//           className="mt-7 rounded-full border border-lux-gold px-8 py-3 text-[11px] uppercase tracking-[0.3em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
//         >
//           Shop Noir Oud
//         </button>
//       </div>

//       {/* progress bar (right side) */}
//       <div className="absolute right-5 top-1/2 z-10 hidden h-40 w-px -translate-y-1/2 bg-lux-ivory/15 md:right-10 md:block">
//         <div className="sc-bar h-full w-px origin-top scale-y-0 bg-lux-gold" />
//       </div>
//     </section>
//   );
// }