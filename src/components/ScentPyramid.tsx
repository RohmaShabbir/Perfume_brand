"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BottleArt from "./BottleArt";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

const tiers = [
  { key: "top", label: "Top Notes", hint: "The opening. What you smell first.", w: "w-[46%]" },
  { key: "heart", label: "Heart Notes", hint: "The soul of the scent.", w: "w-[72%]" },
  { key: "base", label: "Base Notes", hint: "The lasting trail on your skin.", w: "w-full" },
] as const;

type Key = (typeof tiers)[number]["key"];

const notesByTier = Object.fromEntries(
  tiers.map((t) => [t.key, [...new Set(products.flatMap((p) => p.notes[t.key]))]])
) as Record<Key, string[]>;

export default function ScentPyramid() {
  const [tier, setTier] = useState<Key>("heart");
  const [note, setNote] = useState<string | null>(null);
  const setQuick = useCart((s) => s.setQuick);

  const matches = note
    ? products.filter((p) => [...p.notes.top, ...p.notes.heart, ...p.notes.base].includes(note))
    : [];

  return (
    <section className="bg-lux-espresso px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">Understand the layers</p>
          <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">The Scent Pyramid</h2>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* pyramid */}
          <div className="flex flex-col items-center gap-3">
            {tiers.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTier(t.key);
                  setNote(null);
                }}
                className={`${t.w} rounded-md border px-4 py-5 text-center transition-all duration-500 ${
                  tier === t.key
                    ? "border-lux-gold bg-lux-gold/15 text-lux-gold"
                    : "border-lux-gold/20 text-lux-ivory/60 hover:border-lux-gold/60"
                }`}
              >
                <span className="font-lux-serif text-xl">{t.label}</span>
              </button>
            ))}
          </div>

          {/* notes of selected tier */}
          <div>
            <p className="font-lux-serif text-2xl italic text-lux-ivory">{tiers.find((t) => t.key === tier)!.hint}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {notesByTier[tier].map((n) => (
                <button
                  key={n}
                  onClick={() => setNote(n === note ? null : n)}
                  className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    note === n
                      ? "border-lux-gold bg-lux-gold text-lux-black"
                      : "border-lux-gold/30 text-lux-ivory/80 hover:border-lux-gold"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="mt-8 min-h-[120px]">
              <AnimatePresence mode="wait">
                {note && (
                  <motion.div
                    key={note}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-lux-ivory/50">
                      Perfumes with {note}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {matches.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setQuick(p.id)}
                          className="flex items-center gap-3 rounded-xl border border-lux-gold/25 p-3 pr-5 transition hover:border-lux-gold"
                        >
                          <BottleArt tone={p.tone} className="h-14 w-auto" />
                          <span className="font-lux-serif text-lg text-lux-ivory">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}