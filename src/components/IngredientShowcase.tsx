"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ingredients } from "@/lib/ingredients";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function IngredientShowcase() {
  const [id, setId] = useState(ingredients[0].id);
  const setQuick = useCart((s) => s.setQuick);
  const sel = ingredients.find((i) => i.id === id)!;

  const found = products.filter((p) =>
    [...p.notes.top, ...p.notes.heart, ...p.notes.base].some((n) => n.toLowerCase().includes(sel.keyword))
  );

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
      {/* orbs */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
        {ingredients.map((ing, i) => (
          <button
            key={ing.id}
            onClick={() => setId(ing.id)}
            className="group flex flex-col items-center gap-4"
            aria-pressed={id === ing.id}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              whileHover={{ scale: 1.08 }}
              className={`h-24 w-24 rounded-full transition-all duration-500 md:h-32 md:w-32 ${
                id === ing.id ? "ring-2 ring-lux-gold ring-offset-4 ring-offset-lux-black" : ""
              }`}
              style={{
                background: `radial-gradient(circle at 30% 28%, ${ing.colors[0]}, ${ing.colors[1]})`,
                boxShadow: `0 20px 50px -12px ${ing.colors[0]}66`,
              }}
            />
            <span
              className={`text-[11px] uppercase tracking-[0.3em] transition ${
                id === ing.id ? "text-lux-gold" : "text-lux-ivory/60 group-hover:text-lux-ivory"
              }`}
            >
              {ing.name}
            </span>
          </button>
        ))}
      </div>

      {/* mood card */}
      <div className="mt-16 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="grid gap-8 rounded-2xl border border-lux-gold/25 bg-lux-espresso/60 p-8 md:grid-cols-[1fr_1.4fr] md:p-12"
            style={{ backgroundImage: `radial-gradient(circle at 0% 0%, ${sel.colors[0]}22, transparent 55%)` }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-lux-gold">{sel.family}</p>
              <h3 className="mt-3 font-lux-serif text-5xl font-light italic text-lux-ivory md:text-6xl">{sel.name}</h3>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-lux-ivory/50">Origin: {sel.origin}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {sel.moods.map((m) => (
                  <span key={m} className="rounded-full border border-lux-gold/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-lux-gold">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-lux-ivory/75 md:text-base">{sel.description}</p>
              <p className="mb-3 mt-8 text-[10px] uppercase tracking-[0.3em] text-lux-ivory/50">Found in</p>
              {found.length ? (
                <div className="flex flex-wrap gap-3">
                  {found.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setQuick(p.id)}
                      className="rounded-full border border-lux-gold/30 px-5 py-2 font-lux-serif text-lg text-lux-ivory transition hover:border-lux-gold hover:text-lux-gold"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-lux-ivory/50">Coming soon in a future blend.</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}