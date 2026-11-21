"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, X } from "lucide-react";
import Mascot from "./Mascot";
import BottleArt from "./BottleArt";
import { useCart } from "@/lib/cart";
import { addToCartFx } from "@/lib/actions";
import { defaultChips, getReply, intro } from "@/lib/assistant";
import { formatPrice, getProduct } from "@/lib/products";

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  productIds?: string[];
  link?: { label: string; href: string };
};

function MiniProduct({ id }: { id: string }) {
  const p = getProduct(id);
  const setQuick = useCart((s) => s.setQuick);
  const btn = useRef<HTMLButtonElement>(null);
  if (!p) return null;
  const size = p.sizes[1] ?? p.sizes[0];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-lux-gold/25 bg-black/30 p-2.5">
      <BottleArt tone={p.tone} className="h-14 w-auto shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-lux-serif text-lg leading-tight text-lux-ivory">{p.name}</p>
        <p className="text-[11px] text-lux-ivory/55">From {formatPrice(p.sizes[0].price)}</p>
        <div className="mt-1.5 flex gap-2">
          <button
            onClick={() => setQuick(p.id)}
            className="rounded-full border border-lux-gold/40 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-lux-gold transition hover:border-lux-gold"
          >
            View
          </button>
          <button
            ref={btn}
            onClick={() => addToCartFx(p.id, size.ml, 1, btn.current)}
            className="rounded-full bg-lux-gold px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-lux-black transition hover:brightness-110"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: intro.text }]);
  const [chips, setChips] = useState<string[]>(intro.chips ?? defaultChips);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [bubble, setBubble] = useState(false);

  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // chhota greeting bubble
  useEffect(() => {
    const a = setTimeout(() => setBubble(true), 6000);
    const b = setTimeout(() => setBubble(false), 18000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  // chat ke andar neeche scroll
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  // Esc se band
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { id: idRef.current++, from: "user", text: t }]);
    setInput("");
    setChips([]);
    setTyping(true);
    const r = getReply(t);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { id: idRef.current++, from: "bot", text: r.text, productIds: r.productIds, link: r.link }]);
      setTyping(false);
      setChips(r.chips ?? defaultChips);
    }, 650 + Math.random() * 500);
  };

  const toggle = () => {
    setOpen((o) => !o);
    setBubble(false);
  };

  return (
    <>
      {/* greeting bubble */}
      <AnimatePresence>
        {bubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="fixed bottom-[92px] right-5 z-40 flex max-w-[220px] items-start gap-2 rounded-2xl rounded-br-sm bg-lux-ivory px-4 py-3 text-sm text-lux-black shadow-xl"
          >
            <button onClick={toggle} className="text-left">
              Hi, I&apos;m Rohma. Need help choosing a scent?
            </button>
            <button onClick={() => setBubble(false)} aria-label="Dismiss" className="mt-0.5 text-lux-black/40 hover:text-lux-black">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mascot button */}
      <motion.button
        onClick={toggle}
        aria-label={open ? "Close assistant" : "Open assistant"}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-lux-gold/60 bg-lux-espresso shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >
        <Mascot className="h-12 w-auto" />
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 left-3 right-3 z-40 flex h-[min(560px,72svh)] flex-col overflow-hidden rounded-2xl border border-lux-gold/40 bg-lux-black shadow-[0_20px_80px_rgba(0,0,0,0.8)] sm:left-auto sm:right-5 sm:w-[380px]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-lux-gold/20 bg-lux-espresso px-4 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-lux-gold/40 bg-lux-black">
                <Mascot className="h-8 w-auto" />
              </div>
              <div className="flex-1">
                <p className="font-lux-serif text-xl leading-none text-lux-ivory">Rohma</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-lux-gold/80">Your fragrance guide</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-lux-ivory/50 transition hover:text-lux-gold">
                <X size={18} />
              </button>
            </div>

            {/* messages */}
            <div ref={listRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[88%] space-y-2 ${m.from === "user" ? "items-end" : ""}`}>
                    <div
                      className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "rounded-br-sm bg-lux-gold text-lux-black"
                          : "rounded-bl-sm border border-lux-gold/20 bg-lux-espresso text-lux-ivory/90"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.productIds?.map((id) => <MiniProduct key={id} id={id} />)}
                    {m.link && (
                      <a
                        href={m.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-full border border-lux-gold px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
                      >
                        {m.link.label}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-lux-gold/20 bg-lux-espresso px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-lux-gold"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* quick chips */}
            {chips.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {chips.map((c) => (
                  <button
                    key={c}
                    onClick={() => send(c)}
                    className="rounded-full border border-lux-gold/35 px-3 py-1.5 text-[11px] text-lux-gold transition hover:border-lux-gold hover:bg-lux-gold/10"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-lux-gold/20 bg-lux-espresso px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a scent..."
                className="min-w-0 flex-1 bg-transparent px-2 text-[16px] text-lux-ivory placeholder:text-lux-ivory/35 focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || typing}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-lux-gold text-lux-black transition hover:brightness-110 disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>

            <p className="bg-lux-espresso pb-2 text-center text-[9px] uppercase tracking-[0.25em] text-lux-ivory/30">
              Virtual assistant
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}