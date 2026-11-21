import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import BottleShowcase from "@/components/BottleShowcase";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import OrderCTA from "@/components/OrderCTA";
import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <section className="flex min-h-screen items-center justify-center bg-lux-espresso">
        <p className="font-lux-serif text-4xl italic text-lux-gold">3D Bottle Showcase: coming next</p>
      </section> */}
      <BottleShowcase />
      <FeaturedCollection />
      <Quiz />
      <ReviewsMarquee />
      <OrderCTA />
    </main>
  );
}
