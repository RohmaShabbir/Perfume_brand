"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ShoppingBag } from "lucide-react";
import { site } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useMounted } from "@/lib/useMounted";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  // cart ka data
  const mounted = useMounted();
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const openCart = useCart((s) => s.openCart);

  // pill chhoti/bari scroll direction se
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 4) return;
      setCompact(y > 80 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // overlay open/close
  useEffect(() => {
    const el = document.getElementById("menu-overlay");
    if (!el) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(el, { display: "flex" });
      gsap.fromTo(
        el,
        { clipPath: "circle(0% at 50% 36px)" },
        { clipPath: "circle(150% at 50% 36px)", duration: 1, ease: "power4.inOut" }
      );
      gsap.fromTo(
        ".menu-link",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.35 }
      );
    } else if (getComputedStyle(el).display !== "none") {
      gsap.to(el, {
        clipPath: "circle(0% at 50% 36px)",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(el, { display: "none" });
          document.body.style.overflow = "";
        },
      });
    }
  }, [open]);

  return (
    <>
      {/* floating pill */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        className={`fixed left-1/2 top-5 z-[70] -translate-x-1/2 rounded-full border border-lux-gold/40 bg-white/5 text-lux-gold backdrop-blur-xl transition-all duration-500 hover:border-lux-gold ${
          compact ? "scale-90 px-5 py-2" : "px-8 py-3"
        }`}
      >
        <span className="font-lux-serif text-xl tracking-[0.35em] pl-[0.35em]">
          {open ? "CLOSE" : site.monogram}
        </span>
      </button>

      {/* right side: order + cart */}
      <div className="fixed right-4 top-5 z-[70] flex items-center gap-3 md:right-8">
        <Link
          href="/collection"
          className="hidden rounded-full border border-lux-gold px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black md:block"
        >
          Order
        </Link>
        <button
          id="cart-btn"
          onClick={openCart}
          aria-label="Cart"
          className="relative rounded-full border border-lux-gold/40 bg-white/5 p-3 text-lux-gold backdrop-blur-xl transition hover:border-lux-gold"
        >
          <ShoppingBag size={18} strokeWidth={1.4} />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-lux-gold text-[10px] font-medium text-lux-black">
            {mounted ? count : 0}
          </span>
        </button>
      </div>

      {/* full-screen menu */}
      <div
        id="menu-overlay"
        style={{ display: "none" }}
        className="fixed inset-0 z-[60] flex-col items-center justify-center bg-lux-espresso"
      >
        <nav className="flex flex-col items-center gap-2 md:gap-4">
          {site.links.map((l) => (
            <span key={l.href} className="block overflow-hidden">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="menu-link block font-lux-serif text-5xl italic text-lux-ivory transition hover:text-lux-gold md:text-7xl"
              >
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
        <p className="absolute bottom-8 text-xs uppercase tracking-[0.4em] text-lux-gold/70">
          {site.name}
        </p>
      </div>
    </>
  );
}