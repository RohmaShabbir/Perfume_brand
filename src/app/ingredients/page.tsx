import Link from "next/link";
import PageHero from "@/components/PageHero";
import IngredientShowcase from "@/components/IngredientShowcase";
import ScentPyramid from "@/components/ScentPyramid";

export const metadata = { title: "Ingredients" };

const sourcing = [
  { n: "01", title: "Harvest", text: "Ingredients are gathered in season from trusted growers, when their aroma is at its peak." },
  { n: "02", title: "Extraction", text: "Gentle extraction keeps the natural character of each material intact." },
  { n: "03", title: "Blending", text: "Our perfumers layer each note by hand, then let the blend rest and mature." },
];

export default function IngredientsPage() {
  return (
    <main className="bg-lux-black">
      <PageHero
        eyebrow="The Art of Scent"
        title="Where every fragrance begins"
        subtitle="Tap an ingredient to discover its story, its mood and the perfumes it lives in."
      />
      <IngredientShowcase />
      <ScentPyramid />

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">From source to bottle</p>
          <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">Our sourcing</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {sourcing.map((s) => (
            <div key={s.n} className="rounded-2xl border border-lux-gold/20 bg-lux-espresso/50 p-8">
              <span
                className="font-lux-serif text-7xl leading-none text-transparent"
                style={{ WebkitTextStroke: "1px rgba(201,162,75,0.6)" }}
              >
                {s.n}
              </span>
              <h3 className="mt-5 font-lux-serif text-2xl text-lux-ivory">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-lux-ivory/65">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28 text-center">
        <Link
          href="/collection"
          className="shimmer inline-block rounded-full bg-lux-gold px-12 py-4 text-xs font-medium uppercase tracking-[0.35em] text-lux-black"
        >
          Shop the Collection
        </Link>
      </section>
    </main>
  );
}