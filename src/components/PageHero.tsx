export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative overflow-hidden px-6 pb-16 pt-36 text-center md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,75,0.16),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-lux-gold">{eyebrow}</p>
        <h1 className="mt-5 font-lux-serif text-5xl font-light italic leading-[1.05] text-lux-ivory md:text-7xl">
          {title}
        </h1>
        <span className="mx-auto mt-8 block h-px w-24 bg-lux-gold" />
        {subtitle && (
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-lux-ivory/70 md:text-base">{subtitle}</p>
        )}
      </div>
    </header>
  );
}