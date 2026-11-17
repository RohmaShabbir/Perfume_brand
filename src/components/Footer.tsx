"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: yahan baad mein email service / database connect hoga
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-lux-gold/20 bg-lux-black px-6 pt-20 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* newsletter */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">Join the inner circle</p>
          <h3 className="mt-4 font-lux-serif text-3xl font-light italic text-lux-ivory md:text-4xl">
            First access to new batches
          </h3>
          {sent ? (
            <p className="mt-6 font-lux-serif text-xl italic text-lux-gold">Welcome to the circle. Thank you.</p>
          ) : (
            <form onSubmit={submit} className="mt-6 flex max-w-sm items-center border-b border-lux-gold/50 pb-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent text-sm text-lux-ivory placeholder:text-lux-ivory/40 focus:outline-none"
              />
              <button type="submit" className="text-[11px] uppercase tracking-[0.3em] text-lux-gold hover:text-lux-ivory">
                Join
              </button>
            </form>
          )}
        </div>

        {/* explore */}
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-lux-gold">Explore</p>
          <ul className="space-y-3 text-sm text-lux-ivory/70">
            {site.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-lux-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* care */}
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-lux-gold">Care</p>
          <ul className="space-y-3 text-sm text-lux-ivory/70">
            <li><Link href="/contact" className="transition hover:text-lux-gold">Shipping & Delivery</Link></li>
            <li><Link href="/contact" className="transition hover:text-lux-gold">Returns</Link></li>
            <li><Link href="/contact" className="transition hover:text-lux-gold">FAQ</Link></li>
          </ul>
        </div>

        {/* connect */}
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-lux-gold">Connect</p>
          <ul className="space-y-3 text-sm text-lux-ivory/70">
            <li><a href="#" className="transition hover:text-lux-gold">Instagram</a></li>
            <li><a href="#" className="transition hover:text-lux-gold">Facebook</a></li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="transition hover:text-lux-gold">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* giant outline name */}
      <p
        aria-hidden
        className="mt-16 select-none text-center font-lux-serif text-[24vw] font-light leading-[0.8] tracking-[0.04em] text-transparent md:text-[18vw]"
        style={{ WebkitTextStroke: "1px rgba(201,162,75,0.35)" }}
      >
        {site.name}
      </p>

      <div className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-lux-gold/10 py-6 text-[10px] uppercase tracking-[0.25em] text-lux-ivory/40 md:flex-row">
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Crafted with care</span>
      </div>
    </footer>
  );
}