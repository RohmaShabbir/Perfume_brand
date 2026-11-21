import BottleArt from "./BottleArt";
import type { Post } from "@/lib/journal";

export default function Cover({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 30% 20%, ${post.tone}, #0b0907 78%)` }}
    >
      <BottleArt tone={post.tone} className="h-3/4 w-auto opacity-90 drop-shadow-[0_0_30px_rgba(201,162,75,0.25)]" />
      <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.3em] text-lux-gold/80">
        {post.category}
      </span>
    </div>
  );
}