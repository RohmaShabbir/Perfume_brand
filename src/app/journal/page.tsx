import PageHero from "@/components/PageHero";
import JournalList from "@/components/JournalList";

export const metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <main className="bg-lux-black">
      <PageHero
        eyebrow="The Journal"
        title="Stories, guides and scent notes"
        subtitle="Learn how to wear, choose and love fragrance a little more."
      />
      <JournalList />
    </main>
  );
}