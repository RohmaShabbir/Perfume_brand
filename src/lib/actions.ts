"use client";
import gsap from "gsap";
import { useCart } from "./cart";

export function flyToCart(from: HTMLElement | null, done?: () => void) {
  const target = document.getElementById("cart-btn");
  if (!from || !target) return done?.();

  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const sx = a.left + a.width / 2;
  const sy = a.top + a.height / 2;

  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${sx - 10}px`,
    top: `${sy - 10}px`,
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#c9a24b",
    boxShadow: "0 0 22px 4px rgba(201,162,75,.7)",
    zIndex: "300",
    pointerEvents: "none",
  });
  document.body.appendChild(dot);

  const dx = b.left + b.width / 2 - sx;
  const dy = b.top + b.height / 2 - sy;
  gsap.to(dot, { x: dx, duration: 0.9, ease: "power1.inOut" });
  gsap.to(dot, {
    y: dy,
    scale: 0.4,
    duration: 0.9,
    ease: "power2.in",
    onComplete: () => {
      dot.remove();
      gsap.fromTo(target, { scale: 1.3 }, { scale: 1, duration: 0.6, ease: "back.out(3)" });
      done?.();
    },
  });
}

export function addToCartFx(id: string, ml: number, qty: number, from: HTMLElement | null) {
  const { add, setQuick, openCart } = useCart.getState();
  add(id, ml, qty);
  flyToCart(from, () => openCart());
  setQuick(null);
}

export function buyNow(id: string, ml: number, qty: number) {
  const { add, setQuick, openCart } = useCart.getState();
  add(id, ml, qty);
  setQuick(null);
  openCart();
}