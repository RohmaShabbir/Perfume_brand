"use client";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export default function ShopFromArticle({ productId }: { productId: string }) {
  const setQuick = useCart((s) => s.setQuick);
  const p = getProduct(productId);
  if (!p) return null;

  return (
    <div className="my-16 flex flex-col items-center gap-6 rounded-2xl border border-lux-gold/25 bg-lux-espresso/60 p-8 text-center sm:flex-row sm:text-left">
      <BottleArt tone={p.tone} className="h-32 w-auto shrink-0" />
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-lux-gold">Shop this scent</p>
        <h3 className="mt-2 font-lux-serif text-3xl text-lux-ivory">{p.name}</h3>
        <p className="mt-1 text-sm text-lux-ivory/60">
          {p.tagline} &middot; From {formatPrice(p.sizes[0].price)}
        </p>
      </div>
      <button
        onClick={() => setQuick(p.id)}
        className="rounded-full border border-lux-gold px-8 py-3 text-[11px] uppercase tracking-[0.3em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
      >
        View
      </button>
    </div>
  );
}