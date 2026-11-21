"use client";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { addToCartFx } from "@/lib/actions";
import { formatPrice, products } from "@/lib/products";

type Option = { label: string; sub: string; score: Record<string, number> };
type Question = { q: string; options: Option[] };

const questions: Question[] = [
  {
    q: "How do you want to feel?",
    options: [
      { label: "Bold & mysterious", sub: "Deep, smoky, unforgettable", score: { "noir-oud": 3, "santal-nuit": 2, "amber-royale": 1 } },
      { label: "Soft & romantic", sub: "Floral, delicate, dreamy", score: { "rose-velours": 3, "vanille-blanche": 2 } },
      { label: "Warm & cozy", sub: "Sweet, glowing, comforting", score: { "amber-royale": 3, "vanille-blanche": 2, "santal-nuit": 1 } },
      { label: "Fresh & clean", sub: "Crisp, bright, modern", score: { "bleu-minuit": 3, "santal-nuit": 1 } },
    ],
  },
  {
    q: "Where will you wear it?",
    options: [
      { label: "Evening out", sub: "Dinners, events, nights", score: { "noir-oud": 2, "amber-royale": 2, "rose-velours": 1 } },
      { label: "Everyday", sub: "Easy, versatile, personal", score: { "bleu-minuit": 2, "santal-nuit": 2, "vanille-blanche": 1 } },
      { label: "A special date", sub: "Memorable and magnetic", score: { "rose-velours": 2, "vanille-blanche": 2, "noir-oud": 1 } },
      { label: "Work & office", sub: "Polished, never loud", score: { "bleu-minuit": 2, "santal-nuit": 2, "rose-velours": 1 } },
    ],
  },
  {
    q: "Which season suits you?",
    options: [
      { label: "Summer", sub: "Light and breezy", score: { "bleu-minuit": 3, "rose-velours": 1 } },
      { label: "Winter", sub: "Rich and enveloping", score: { "noir-oud": 2, "amber-royale": 2, "vanille-blanche": 1 } },
      { label: "Spring & autumn", sub: "Balanced and soft", score: { "santal-nuit": 2, "rose-velours": 2, "amber-royale": 1 } },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const setQuick = useCart((s) => s.setQuick);
  const addBtn = useRef<HTMLButtonElement>(null);

  const done = step >= questions.length;

  const ranked = useMemo(() => {
    const totals: Record<string, number> = {};
    picks.forEach((optIdx, qi) => {
      const sc = questions[qi].options[optIdx].score;
      Object.entries(sc).forEach(([id, v]) => (totals[id] = (totals[id] ?? 0) + v));
    });
    return products
      .map((p) => ({ p, s: totals[p.id] ?? 0 }))
      .sort((a, b) => b.s - a.s)
      .map((x) => x.p);
  }, [picks]);

  const choose = (i: number) => {
    setPicks((p) => [...p, i]);
    setStep((s) => s + 1);
  };
  const back = () => {
    setPicks((p) => p.slice(0, -1));
    setStep((s) => Math.max(0, s - 1));
  };
  const retake = () => {
    setPicks([]);
    setStep(0);
  };

  const top = ranked[0];
  const second = ranked[1];

  return (
    <section className="relative overflow-hidden bg-lux-espresso px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,75,0.14),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">Find your signature</p>
          <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">
            Choose Your Scent
          </h2>
        </div>

        {/* progress */}
        <div className="mx-auto mb-12 flex max-w-xs gap-2">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-px flex-1 transition-colors duration-500 ${i < step ? "bg-lux-gold" : "bg-lux-ivory/20"}`}
            />
          ))}
        </div>

        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q${step}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <p className="mb-8 text-center font-lux-serif text-3xl italic text-lux-ivory md:text-4xl">
                  {questions[step].q}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {questions[step].options.map((o, i) => (
                    <button
                      key={o.label}
                      onClick={() => choose(i)}
                      className="group rounded-2xl border border-lux-gold/25 bg-lux-black/40 p-6 text-left transition hover:border-lux-gold hover:bg-lux-gold/10"
                    >
                      <span className="block font-lux-serif text-2xl text-lux-ivory transition group-hover:text-lux-gold">
                        {o.label}
                      </span>
                      <span className="mt-1 block text-sm text-lux-ivory/55">{o.sub}</span>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={back}
                    className="mx-auto mt-8 block text-[11px] uppercase tracking-[0.3em] text-lux-ivory/50 transition hover:text-lux-gold"
                  >
                    &larr; Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="mb-6 text-center text-[11px] uppercase tracking-[0.4em] text-lux-gold">Your match</p>
                <div className="grid items-center gap-8 rounded-2xl border border-lux-gold/30 bg-lux-black/50 p-8 md:grid-cols-[1fr_1.3fr] md:p-10">
                  <div className="flex justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,75,0.22),transparent_65%)] py-4">
                    <BottleArt tone={top.tone} className="h-52 w-auto md:h-64" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-lux-serif text-5xl font-light italic text-lux-ivory">{top.name}</h3>
                    <p className="mt-2 text-sm text-lux-ivory/60">{top.tagline}</p>
                    <p className="mt-5 text-xs leading-relaxed tracking-wide text-lux-gold">
                      {[...top.notes.top, ...top.notes.heart, ...top.notes.base].slice(0, 5).join("  ·  ")}
                    </p>
                    <p className="mt-5 font-lux-serif text-2xl text-lux-ivory">From {formatPrice(top.sizes[0].price)}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button
                        ref={addBtn}
                        onClick={() => addToCartFx(top.id, (top.sizes[1] ?? top.sizes[0]).ml, 1, addBtn.current)}
                        className="shimmer rounded-full bg-lux-gold px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-lux-black"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => setQuick(top.id)}
                        className="rounded-full border border-lux-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-lux-gold transition hover:bg-lux-gold/10"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 text-center">
                  <p className="text-sm text-lux-ivory/60">
                    Also consider{" "}
                    <button
                      onClick={() => setQuick(second.id)}
                      className="font-lux-serif text-lg italic text-lux-gold underline-offset-4 hover:underline"
                    >
                      {second.name}
                    </button>
                  </p>
                  <button
                    onClick={retake}
                    className="text-[11px] uppercase tracking-[0.3em] text-lux-ivory/50 transition hover:text-lux-gold"
                  >
                    Retake the quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}