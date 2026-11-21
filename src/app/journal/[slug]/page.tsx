import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import ShopFromArticle from "@/components/ShopFromArticle";
import { getPost, posts } from "@/lib/journal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post?.title ?? "Journal", description: post?.excerpt };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="bg-lux-black pb-28 pt-32 md:pt-40">
      <article className="mx-auto max-w-2xl px-6">
        <Link href="/journal" className="text-[11px] uppercase tracking-[0.3em] text-lux-gold/80 transition hover:text-lux-gold">
          &larr; Journal
        </Link>

        <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-lux-gold">{post.category}</p>
        <h1 className="mt-4 font-lux-serif text-4xl font-light italic leading-[1.1] text-lux-ivory md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-lux-ivory/45">
          {post.date} &middot; {post.readTime}
        </p>

        <Cover post={post} className="mt-10 aspect-[16/10] rounded-2xl border border-lux-gold/20" />

        <div className="mt-12 space-y-6">
          {post.body.map((b, i) => {
            if (b.type === "h")
              return (
                <h2 key={i} className="pt-4 font-lux-serif text-3xl text-lux-ivory">
                  {b.text}
                </h2>
              );
            if (b.type === "quote")
              return (
                <blockquote key={i} className="my-10 border-l-2 border-lux-gold pl-6 font-lux-serif text-2xl italic leading-snug text-lux-gold">
                  {b.text}
                </blockquote>
              );
            return (
              <p key={i} className="text-base leading-[1.85] text-lux-ivory/75">
                {b.text}
              </p>
            );
          })}
        </div>

        <ShopFromArticle productId={post.productId} />
      </article>

      <section className="mx-auto mt-10 max-w-4xl px-6">
        <p className="mb-8 text-center text-[11px] uppercase tracking-[0.4em] text-lux-gold">Keep reading</p>
        <div className="grid gap-8 sm:grid-cols-2">
          {more.map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <div className="overflow-hidden rounded-2xl border border-lux-gold/20">
                <Cover post={p} className="aspect-[4/3] transition duration-700 group-hover:scale-[1.05]" />
              </div>
              <h3 className="mt-4 font-lux-serif text-2xl text-lux-ivory transition group-hover:text-lux-gold">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}