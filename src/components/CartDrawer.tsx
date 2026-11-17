"use client";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { useMounted } from "@/lib/useMounted";
import { formatPrice, getProduct } from "@/lib/products";
import { site } from "@/lib/site";

export default function CartDrawer() {
  const mounted = useMounted();
  const { items, cartOpen, closeCart, setQty, remove } = useCart();

  const lines = items
    .map((i) => {
      const p = getProduct(i.id);
      const size = p?.sizes.find((s) => s.ml === i.ml);
      return p && size ? { ...i, p, price: size.price } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const left = Math.max(0, site.freeShippingFrom - subtotal);
  const progress = Math.min(100, (subtotal / site.freeShippingFrom) * 100);

  const message =
    `Hello ${site.name}, I would like to order:\n` +
    lines.map((l) => `- ${l.p.name} ${l.ml}ml x${l.qty} = ${formatPrice(l.price * l.qty)}`).join("\n") +
    `\n\nSubtotal: ${formatPrice(subtotal)}`;
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <Sheet open={cartOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-lux-gold/20 bg-lux-espresso p-0 text-lux-ivory sm:max-w-md"
      >
        <SheetHeader className="border-b border-lux-gold/20 p-6">
          <SheetTitle className="font-lux-serif text-3xl font-normal text-lux-ivory">Your Bag</SheetTitle>
          <SheetDescription className="text-xs uppercase tracking-[0.25em] text-lux-gold/80">
            Complimentary sample with every order
          </SheetDescription>
        </SheetHeader>

        {!mounted || lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
            <BottleArt className="h-28 w-auto opacity-40" />
            <p className="font-lux-serif text-2xl italic text-lux-ivory/70">Your bag is empty</p>
            <a
              href="/collection"
              onClick={closeCart}
              className="rounded-full border border-lux-gold px-8 py-3 text-xs uppercase tracking-[0.25em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
            >
              Explore the Collection
            </a>
          </div>
        ) : (
          <>
            <div data-lenis-prevent className="flex-1 space-y-5 overflow-y-auto p-6">
              {lines.map((l) => (
                <div key={`${l.id}-${l.ml}`} className="flex gap-4 border-b border-lux-gold/10 pb-5">
                  <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-lg bg-black/30">
                    <BottleArt tone={l.p.tone} className="h-20 w-auto" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-lux-serif text-xl">{l.p.name}</p>
                        <p className="text-xs text-lux-ivory/50">{l.ml}ml</p>
                      </div>
                      <button onClick={() => remove(l.id, l.ml)} aria-label="Remove" className="self-start text-lux-ivory/40 hover:text-lux-gold">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-lux-gold/30 px-3 py-1">
                        <button onClick={() => setQty(l.id, l.ml, l.qty - 1)} aria-label="Less">
                          <Minus size={13} />
                        </button>
                        <span className="w-4 text-center text-sm">{l.qty}</span>
                        <button onClick={() => setQty(l.id, l.ml, l.qty + 1)} aria-label="More">
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm text-lux-gold">{formatPrice(l.price * l.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-lux-gold/20 p-6">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-lux-ivory/60">
                  {left > 0 ? `${formatPrice(left)} away from free delivery` : "You've unlocked free delivery"}
                </p>
                <div className="h-px w-full bg-lux-ivory/15">
                  <div className="h-px bg-lux-gold transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-lux-ivory/60">Subtotal</span>
                <span className="font-lux-serif text-3xl text-lux-gold">{formatPrice(subtotal)}</span>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full bg-lux-gold py-4 text-center text-xs uppercase tracking-[0.3em] text-lux-black transition hover:brightness-110"
              >
                Checkout
              </a>
              <button onClick={closeCart} className="w-full text-center text-[11px] uppercase tracking-[0.25em] text-lux-ivory/50 hover:text-lux-gold">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}