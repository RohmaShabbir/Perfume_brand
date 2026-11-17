"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { addToCartFx } from "@/lib/actions";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  const setQuick = useCart((s) => s.setQuick);
  const btn = useRef<HTMLButtonElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const sx = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const sy = useTransform(my, [-0.5, 0.5], [0, 100]);
  const shine = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, rgba(201,162,75,0.22), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const defaultSize = p.sizes[1] ?? p.sizes[0];

  return (
    <div style={{ perspective: 1000 }}>
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl border border-lux-gold/20 bg-gradient-to-b from-lux-espresso to-lux-black p-4 transition-colors hover:border-lux-gold/60 md:p-5"
      >
        <button
          onClick={() => setQuick(p.id)}
          aria-label={`View ${p.name}`}
          className="relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl"
        >
          <div className="absolute inset-x-6 bottom-6 h-24 rounded-full bg-lux-gold/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
          <BottleArt
            tone={p.tone}
            className="relative mx-auto h-full w-auto transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.04]"
          />
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: shine }} />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-lux-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Quick view
          </span>
        </button>

        <div className="mt-4 space-y-1.5" style={{ transform: "translateZ(30px)" }}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-lux-gold/80">
            {p.category} &middot; {p.family}
          </p>
          <h3 className="font-lux-serif text-2xl text-lux-ivory">{p.name}</h3>
          <p className="text-sm text-lux-ivory/60">{p.tagline}</p>
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-lux-ivory/80">From {formatPrice(p.sizes[0].price)}</span>
            <button
              ref={btn}
              onClick={() => addToCartFx(p.id, defaultSize.ml, 1, btn.current)}
              className="rounded-full border border-lux-gold px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}