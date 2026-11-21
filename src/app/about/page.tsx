import Link from "next/link";
import PageHero from "@/components/PageHero";
import BottleArt from "@/components/BottleArt";
import CraftProcess from "@/components/CraftProcess";
import Stats from "@/components/Stats";

export const metadata = { title: "About" };

const values = [
  { title: "Authentic Ingredients", text: "Real oud, real rose, real amber. No shortcuts and no filler." },
  { title: "Small Batches", text: "We blend in limited quantities so every bottle gets full attention." },
  { title: "Made to Last", text: "High oil concentration means a scent that stays from morning to midnight." },
];

export default function AboutPage() {
  return (
    <main className="bg-lux-black">
      <PageHero
        eyebrow="Our Story"
        title="A house built on memory"
        subtitle="We believe a fragrance is more than a scent. It is the first thing people feel and the last thing they forget."
      />

      {/* story */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 md:grid-cols-2 md:gap-20 md:pb-32">
        <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-lux-gold/20 bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,75,0.2),#1a130e_70%)]">
          {/* TODO: yahan brand/founder ki asli photo lagao */}
          <BottleArt tone="#7a4a14" className="h-3/4 w-auto" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">How it began</p>
          <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-5xl">
            From a small idea to a signature
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-lux-ivory/70 md:text-base">
            <p>
              It started with one question: why do the most beautiful perfumes feel so out of reach? We set out to
              create fragrances with the depth of the world&apos;s great houses, made with care and priced with respect.
            </p>
            <p>
              Today every bottle is still blended in small batches. Each one carries the same promise: rich notes,
              lasting presence and a story you can wear.
            </p>
          </div>
          <p className="mt-8 font-lux-serif text-2xl italic text-lux-gold">&mdash; Founder Name</p>
        </div>
      </section>

      <CraftProcess />

      {/* values */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">What we stand for</p>
          <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">Our promise</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} className="rounded-2xl border border-lux-gold/20 bg-lux-espresso/50 p-8 text-center">
              <span className="font-lux-serif text-3xl text-lux-gold">0{i + 1}</span>
              <h3 className="mt-4 font-lux-serif text-2xl text-lux-ivory">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-lux-ivory/65">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Stats />

      <section className="px-6 py-24 text-center md:py-32">
        <h2 className="font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">
          Find the scent that is you
        </h2>
        <Link
          href="/collection"
          className="shimmer mt-10 inline-block rounded-full bg-lux-gold px-12 py-4 text-xs font-medium uppercase tracking-[0.35em] text-lux-black"
        >
          Discover the Collection
        </Link>
      </section>
    </main>
  );
}