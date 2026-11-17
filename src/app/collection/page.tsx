import CollectionGrid from "@/components/CollectionGrid";

export const metadata = { title: "Collection" };

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-lux-black px-5 pb-28 pt-36 md:px-10">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">The Collection</p>
        <h1 className="mt-4 font-lux-serif text-5xl font-light italic text-lux-ivory md:text-7xl">
          Scents worth remembering
        </h1>
        <span className="mx-auto mt-8 block h-px w-24 bg-lux-gold" />
      </header>
      <div className="mx-auto max-w-7xl">
        <CollectionGrid />
      </div>
    </main>
  );
}