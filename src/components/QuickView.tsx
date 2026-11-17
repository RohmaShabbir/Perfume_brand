"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { addToCartFx, buyNow } from "@/lib/actions";
import { formatPrice, getProduct, products, type Product } from "@/lib/products";

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] uppercase tracking-[0.25em] text-lux-ivory/60">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-px w-full bg-lux-ivory/15">
        <div className="h-px bg-lux-gold" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  );
}

function Body({ p }: { p: Product }) {
  const setQuick = useCart((s) => s.setQuick);
  const [ml, setMl] = useState(p.sizes[1]?.ml ?? p.sizes[0].ml);
  const [qty, setQty] = useState(1);
  const addBtn = useRef<HTMLButtonElement>(null);
  const price = p.sizes.find((s) => s.ml === ml)!.price;
  const related = products.filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <div className="grid md:grid-cols-2">
      {/* left: bottle */}
      <div className="relative flex min-h-[260px] items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,75,0.18),transparent_65%)] p-6 md:min-h-[560px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <BottleArt tone={p.tone} className="h-56 w-auto md:h-96" />
          </motion.div>
        </motion.div>
      </div>

      {/* right: details */}
      <div className="space-y-5 p-6 md:p-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-lux-gold">
            {p.category} &middot; {p.family}
          </p>
          <DialogTitle className="mt-2 font-lux-serif text-4xl font-normal text-lux-ivory">{p.name}</DialogTitle>
          <DialogDescription className="mt-1 font-lux-serif text-lg italic text-lux-ivory/60">
            {p.tagline}
          </DialogDescription>
        </div>

        <p className="text-sm leading-relaxed text-lux-ivory/75">{p.description}</p>

        <div className="space-y-2 border-y border-lux-gold/20 py-4 text-sm">
          {(
            [
              ["Top", p.notes.top],
              ["Heart", p.notes.heart],
              ["Base", p.notes.base],
            ] as const
          ).map(([label, arr]) => (
            <div key={label} className="flex gap-4">
              <span className="w-14 text-[10px] uppercase tracking-[0.25em] text-lux-gold">{label}</span>
              <span className="text-lux-ivory/80">{arr.join(", ")}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Meter label="Longevity" value={p.longevity} />
          <Meter label="Projection" value={p.projection} />
        </div>

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-lux-ivory/60">Size</p>
          <div className="flex gap-2">
            {p.sizes.map((s) => (
              <button
                key={s.ml}
                onClick={() => setMl(s.ml)}
                className={`rounded-full border px-4 py-2 text-xs tracking-widest transition ${
                  ml === s.ml
                    ? "border-lux-gold bg-lux-gold text-lux-black"
                    : "border-lux-gold/30 text-lux-ivory/80 hover:border-lux-gold"
                }`}
              >
                {s.ml}ml
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-lux-serif text-3xl text-lux-gold">{formatPrice(price * qty)}</span>
          <div className="flex items-center gap-3 rounded-full border border-lux-gold/30 px-3 py-1.5">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Less">
              <Minus size={14} />
            </button>
            <span className="w-5 text-center text-sm">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="More">
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            ref={addBtn}
            onClick={() => addToCartFx(p.id, ml, qty, addBtn.current)}
            className="flex-1 rounded-full border border-lux-gold py-3.5 text-xs uppercase tracking-[0.25em] text-lux-gold transition hover:bg-lux-gold/10"
          >
            Add to Cart
          </button>
          <button
            onClick={() => buyNow(p.id, ml, qty)}
            className="flex-1 rounded-full bg-lux-gold py-3.5 text-xs uppercase tracking-[0.25em] text-lux-black transition hover:brightness-110"
          >
            Buy Now
          </button>
        </div>

        <div className="pt-2">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-lux-ivory/50">You may also like</p>
          <div className="flex gap-3">
            {related.map((r) => (
              <button
                key={r.id}
                onClick={() => setQuick(r.id)}
                className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-lux-gold/15 p-2 transition hover:border-lux-gold/60"
              >
                <BottleArt tone={r.tone} className="h-14 w-auto" />
                <span className="text-[11px] text-lux-ivory/70">{r.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickView() {
  const quickId = useCart((s) => s.quickId);
  const setQuick = useCart((s) => s.setQuick);
  const product = quickId ? getProduct(quickId) : undefined;

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && setQuick(null)}>
      <DialogContent
        data-lenis-prevent
        className="max-h-[92svh] gap-0 overflow-y-auto rounded-2xl border-lux-gold/30 bg-lux-espresso p-0 text-lux-ivory sm:max-w-4xl max-sm:bottom-0 max-sm:top-auto max-sm:translate-y-0 max-sm:rounded-b-none"
      >
        {product && <Body key={product.id} p={product} />}
      </DialogContent>
    </Dialog>
  );
}