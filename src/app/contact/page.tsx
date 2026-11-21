import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="bg-lux-black">
      <PageHero
        eyebrow="Get in touch"
        title="We would love to hear from you"
        subtitle="Questions about a scent, an order or a gift? Write to us and we will reply within 24 hours."
      />

      <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-8 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <ContactForm />

        <aside className="space-y-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-lux-gold">WhatsApp</p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-lux-serif text-2xl text-lux-ivory transition hover:text-lux-gold"
            >
              Chat with us
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-lux-gold">Email</p>
            <a href={`mailto:${site.email}`} className="mt-3 inline-block font-lux-serif text-2xl text-lux-ivory transition hover:text-lux-gold">
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-lux-gold">Studio</p>
            <p className="mt-3 font-lux-serif text-2xl text-lux-ivory">{site.city}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-lux-gold">Hours</p>
            <p className="mt-3 text-sm leading-relaxed text-lux-ivory/70">
              Monday to Saturday
              <br />
              11:00 AM to 8:00 PM
            </p>
          </div>
        </aside>
      </section>

      <FAQ />
    </main>
  );
}