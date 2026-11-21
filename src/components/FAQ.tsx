"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How long does delivery take?", a: "Orders usually arrive within 3 to 5 working days across Pakistan. Major cities are often faster." },
  { q: "Do you offer Cash on Delivery?", a: "Yes. You can pay in cash when your order arrives, or order directly through WhatsApp." },
  { q: "Are your perfumes authentic?", a: "Every bottle is blended by us in small batches. Nothing is resold or diluted." },
  { q: "How long does the scent last?", a: "Most of our blends last 6 to 10 hours on skin. Check the longevity meter on each product." },
  { q: "Can I return or exchange a bottle?", a: "If your bottle arrives damaged or wrong, contact us within 48 hours and we will make it right." },
  { q: "Do you offer gift wrapping?", a: "Yes. Mention it in your order message and we will wrap it in our signature box." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">Good to know</p>
        <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-5xl">
          Frequently asked
        </h2>
      </div>

      <div className="border-t border-lux-gold/20">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-lux-gold/20">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`font-lux-serif text-xl transition-colors md:text-2xl ${
                    isOpen ? "text-lux-gold" : "text-lux-ivory group-hover:text-lux-gold"
                  }`}
                >
                  {f.q}
                </span>
                <Plus
                  size={20}
                  className={`shrink-0 text-lux-gold transition-transform duration-500 ${isOpen ? "rotate-[135deg]" : ""}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 text-sm leading-relaxed text-lux-ivory/70 md:text-base">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}