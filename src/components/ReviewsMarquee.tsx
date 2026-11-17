const reviews = [
  { name: "Ayesha K.", city: "Karachi", text: "Compliments all night. The oud settles into something warm and unforgettable." },
  { name: "Hamza R.", city: "Lahore", text: "Lasted more than 10 hours. The packaging alone feels like a gift." },
  { name: "Sana M.", city: "Islamabad", text: "Soft, rich and never overpowering. I finally found my signature scent." },
  { name: "Bilal A.", city: "Karachi", text: "Delivery was fast and the bottle arrived perfectly wrapped." },
  { name: "Mehwish T.", city: "Faisalabad", text: "Rose Velours is pure romance. Everyone asks what I am wearing." },
  { name: "Usman Q.", city: "Dubai", text: "Better than perfumes triple the price. Absolutely worth it." },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="w-[300px] shrink-0 rounded-2xl border border-lux-gold/20 bg-lux-espresso/60 p-6 md:w-[380px]">
      <div className="mb-4 text-sm tracking-[0.3em] text-lux-gold">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <blockquote className="font-lux-serif text-lg italic leading-snug text-lux-ivory/90 md:text-xl">
        &ldquo;{r.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-[10px] uppercase tracking-[0.3em] text-lux-ivory/50">
        {r.name} &middot; {r.city}
      </figcaption>
    </figure>
  );
}

export default function ReviewsMarquee() {
  return (
    <section className="overflow-hidden bg-lux-black py-24 md:py-32">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-lux-gold">Words from our clients</p>
        <h2 className="mt-4 font-lux-serif text-4xl font-light italic text-lux-ivory md:text-6xl">
          Loved, worn, remembered
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-lux-black to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-lux-black to-transparent md:w-40" />
        <div className="marquee flex w-max gap-5 pr-5">
          {[...reviews, ...reviews].map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}