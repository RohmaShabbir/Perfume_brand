"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { id: string; ml: number; qty: number };

type State = {
  items: CartItem[];
  cartOpen: boolean;
  quickId: string | null;
  add: (id: string, ml: number, qty?: number) => void;
  setQty: (id: string, ml: number, qty: number) => void;
  remove: (id: string, ml: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  setQuick: (id: string | null) => void;
};

export const useCart = create<State>()(
  persist(
    (set) => ({
      items: [],
      cartOpen: false,
      quickId: null,
      add: (id, ml, qty = 1) =>
        set((s) => {
          const found = s.items.find((i) => i.id === id && i.ml === ml);
          if (found) {
            return { items: s.items.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i)) };
          }
          return { items: [...s.items, { id, ml, qty }] };
        }),
      setQty: (id, ml, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => !(i.id === id && i.ml === ml))
              : s.items.map((i) => (i.id === id && i.ml === ml ? { ...i, qty } : i)),
        })),
      remove: (id, ml) => set((s) => ({ items: s.items.filter((i) => !(i.id === id && i.ml === ml)) })),
      clear: () => set({ items: [] }),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      setQuick: (id) => set({ quickId: id }),
    }),
    { name: "maison-cart", partialize: (s) => ({ items: s.items }) }
  )
);