"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

const filters = ["all", "men", "women", "unisex"] as const;

export default function CollectionGrid() {
  const [f, setF] = useState<(typeof filters)[number]>("all");
  const list = f === "all" ? products : products.filter((p) => p.category === f);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={`rounded-full border px-6 py-2 text-xs uppercase tracking-[0.25em] transition ${
              f === x
                ? "border-lux-gold bg-lux-gold text-lux-black"
                : "border-lux-gold/30 text-lux-ivory/70 hover:border-lux-gold"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProductCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}