import Link from "next/link";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function FeaturedCollection() {
  return (
    <section className="bg-lux-black px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">Signature Scents</p>
          <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">
            The Collection
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/collection"
            className="inline-block rounded-full border border-lux-gold px-10 py-3.5 text-xs uppercase tracking-[0.3em] text-lux-gold transition hover:bg-lux-gold hover:text-lux-black"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}