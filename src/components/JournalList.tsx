"use client";
import Link from "next/link";
import { useState } from "react";
import Cover from "./Cover";
import { categories, posts, type Post } from "@/lib/journal";

function Meta({ p }: { p: Post }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.25em] text-lux-ivory/45">
      {p.date} &middot; {p.readTime}
    </p>
  );
}

export default function JournalList() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const [featured, ...rest] = list;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-6 py-2 text-xs uppercase tracking-[0.25em] transition ${
              cat === c
                ? "border-lux-gold bg-lux-gold text-lux-black"
                : "border-lux-gold/30 text-lux-ivory/70 hover:border-lux-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/journal/${featured.slug}`}
          className="group mb-14 grid overflow-hidden rounded-2xl border border-lux-gold/20 md:grid-cols-2"
        >
          <Cover post={featured} className="aspect-[4/3] transition duration-700 group-hover:scale-[1.03] md:aspect-auto md:min-h-[380px]" />
          <div className="flex flex-col justify-center bg-lux-espresso/60 p-8 md:p-12">
            <Meta p={featured} />
            <h2 className="mt-4 font-lux-serif text-4xl font-light italic leading-tight text-lux-ivory transition group-hover:text-lux-gold md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-lux-ivory/70">{featured.excerpt}</p>
            <span className="mt-8 text-[11px] uppercase tracking-[0.3em] text-lux-gold">Read article</span>
          </div>
        </Link>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
            <div className="overflow-hidden rounded-2xl border border-lux-gold/20">
              <Cover post={p} className="aspect-[4/3] transition duration-700 group-hover:scale-[1.05]" />
            </div>
            <div className="mt-5">
              <Meta p={p} />
              <h3 className="mt-2 font-lux-serif text-2xl text-lux-ivory transition group-hover:text-lux-gold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-lux-ivory/60">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}