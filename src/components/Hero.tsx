"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      video.current?.play().catch(() => {});
      window.dispatchEvent(new Event("hero:start"));
    };

    window.addEventListener("preloader:done", start);
    const fallback = setTimeout(start, 5500);

    return () => {
      window.removeEventListener("preloader:done", start);
      clearTimeout(fallback);
    };
  }, []);

  // sirf scroll indicator halka sa fade-in hota hai
  useGSAP(
    () => {
      gsap.set(".hero-scroll", { opacity: 0, y: 20 });

      const run = () => {
        gsap.to(".hero-scroll", { opacity: 1, y: 0, duration: 1, delay: 2.5 });
      };

      window.addEventListener("hero:start", run, { once: true });
      return () => window.removeEventListener("hero:start", run);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden bg-lux-black">
      {/* Background Video - Continuous Loop */}
      <video
        ref={video}
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.jpg"
        muted={muted}
        autoPlay
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-left"
      />

      {/* halka neeche ka gradient (scroll indicator ke liye) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-lux-ivory/70">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-lux-gold to-transparent" />
      </div>

      {/* Sound Toggle (mascot se door) */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label="Toggle sound"
        className="absolute bottom-8 right-24 z-20 rounded-full border border-lux-gold/40 bg-black/20 p-3 text-lux-gold backdrop-blur transition hover:border-lux-gold md:right-28"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </section>
  );
}




// -------

// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { Volume2, VolumeX } from "lucide-react";
// import { site } from "@/lib/site";

// const TEXT_DELAY = 3.4;

// export default function Hero() {
//   const root = useRef<HTMLElement>(null);
//   const video = useRef<HTMLVideoElement>(null);
//   const [muted, setMuted] = useState(true);

//   useEffect(() => {
//     let started = false;

//     const start = () => {
//       if (started) return;
//       started = true;

//       video.current?.play().catch(() => {});

//       window.dispatchEvent(new Event("hero:start"));
//     };

//     window.addEventListener("preloader:done", start);

//     const fallback = setTimeout(start, 5500);

//     return () => {
//       window.removeEventListener("preloader:done", start);
//       clearTimeout(fallback);
//     };
//   }, []);

//   useGSAP(
//     () => {
//       gsap.set(".hero-char", {
//         opacity: 0,
//         y: 30,
//         filter: "blur(14px)",
//       });

//       gsap.set(".hero-sub, .hero-cta, .hero-scroll", {
//         opacity: 0,
//         y: 20,
//       });

//       const run = () => {
//         const tl = gsap.timeline({
//           delay: TEXT_DELAY,
//         });

//         tl.to(".hero-char", {
//           opacity: 1,
//           y: 0,
//           filter: "blur(0px)",
//           duration: 1.4,
//           ease: "power3.out",
//           stagger: 0.05,
//         })
//           .to(
//             ".hero-sub",
//             { opacity: 1, y: 0, duration: 1 },
//             "-=0.6"
//           )
//           .to(
//             ".hero-cta",
//             { opacity: 1, y: 0, duration: 1 },
//             "-=0.6"
//           )
//           .to(
//             ".hero-scroll",
//             { opacity: 1, y: 0, duration: 1 },
//             "-=0.6"
//           );
//       };

//       window.addEventListener("hero:start", run, {
//         once: true,
//       });

//       return () => {
//         window.removeEventListener("hero:start", run);
//       };
//     },
//     { scope: root }
//   );

//   return (
//     <section
//       ref={root}
//       className="relative h-svh w-full overflow-hidden bg-lux-black"
//     >
//       {/* Background Video - Continuous Loop */}
//       <video
//         ref={video}
//         src="/videos/hero.mp4"
//         poster="/videos/hero-poster.jpg"
//         muted={muted}
//         autoPlay
//         loop
//         playsInline
//         preload="auto"
//         className="absolute inset-0 h-full w-full object-cover object-left"
//       />

//       {/* Dark Overlays */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/50" />

//       <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-transparent to-transparent" />

//       {/* Hero Content */}
//       <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-6 md:items-end md:pr-[8vw] md:text-right">

//         <h1 className="font-lux-serif text-4xl font-light leading-[1.05] text-lux-ivory drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl md:text-7xl lg:text-8xl">
//           {site.tagline.map((line, li) => (
//             <span
//               key={li}
//               className={`block ${
//                 li === 1
//                   ? "italic text-lux-gold"
//                   : ""
//               }`}
//             >
//               {[...line].map((c, i) => (
//                 <span
//                   key={i}
//                   className="hero-char inline-block whitespace-pre"
//                 >
//                   {c}
//                 </span>
//               ))}
//             </span>
//           ))}
//         </h1>

//         <p className="hero-sub mt-5 max-w-md text-[10px] uppercase tracking-[0.2em] text-lux-ivory/80 sm:text-xs md:mt-6 md:text-sm md:tracking-[0.3em]">
//           {site.sub}
//         </p>

//         <a
//           href="/collection"
//           className="hero-cta mt-7 rounded-full border border-lux-gold px-8 py-3 text-[10px] uppercase tracking-[0.2em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black sm:px-10 sm:py-3.5 sm:text-xs sm:tracking-[0.3em] md:mt-10"
//         >
//           Discover the Collection
//         </a>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-lux-ivory/70">
//         Scroll
//         <span className="h-10 w-px bg-gradient-to-b from-lux-gold to-transparent" />
//       </div>

//       {/* Sound Toggle */}
//       <button
//         onClick={() => setMuted((m) => !m)}
//         aria-label="Toggle sound"
//         className="absolute bottom-7 right-5 z-20 rounded-full border border-lux-gold/40 bg-black/20 p-3 text-lux-gold backdrop-blur transition hover:border-lux-gold md:right-8"
//       >
//         {muted ? (
//           <VolumeX size={16} />
//         ) : (
//           <Volume2 size={16} />
//         )}
//       </button>
//     </section>
//   );
// }
