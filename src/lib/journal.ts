export type Block = { type: "p" | "h" | "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tone: string; // cover ka rang
  productId: string; // article ke end mein kaun sa perfume dikhana hai
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-to-make-perfume-last",
    title: "5 ways to make your perfume last longer",
    category: "Perfume Tips",
    date: "Nov 2026",
    readTime: "4 min read",
    excerpt: "Small habits that make a big difference to how long your fragrance stays on skin.",
    tone: "#7a4a14",
    productId: "amber-royale",
    body: [
      { type: "p", text: "A beautiful fragrance deserves to be noticed from morning to night. The good news is that how you wear it matters almost as much as what you wear." },
      { type: "h", text: "1. Apply on moisturised skin" },
      { type: "p", text: "Dry skin lets fragrance fade faster. A light unscented moisturiser gives the perfume something to hold on to." },
      { type: "h", text: "2. Target your pulse points" },
      { type: "p", text: "Wrists, neck and behind the ears are warm areas that help a scent bloom and project." },
      { type: "quote", text: "Spray, do not rub. Rubbing your wrists together can break down the delicate top notes." },
      { type: "h", text: "3. Spray from a little distance" },
      { type: "p", text: "Hold the bottle around 15 to 20 centimetres away so the mist spreads evenly instead of soaking one spot." },
      { type: "h", text: "4. Layer your fragrance" },
      { type: "p", text: "Pair your perfume with a matching body lotion or apply it after a shower, when skin is warm and slightly damp." },
      { type: "h", text: "5. Store it well" },
      { type: "p", text: "Heat, light and humidity age a perfume quickly. Keep the bottle in a cool, dark place, not in the bathroom." },
    ],
  },
  {
    slug: "what-is-oud",
    title: "What is oud, and why is it so precious?",
    category: "Scent Guides",
    date: "Oct 2026",
    readTime: "5 min read",
    excerpt: "The story of the dark, resinous wood that perfumers call liquid gold.",
    tone: "#4a2c0c",
    productId: "noir-oud",
    body: [
      { type: "p", text: "Oud comes from the agarwood tree. When the heartwood is affected by a certain mould, the tree responds by producing a dark, fragrant resin." },
      { type: "h", text: "Why is it so rare?" },
      { type: "p", text: "Only a small share of trees produce this resin, and it takes many years to form. That scarcity is a big part of why genuine oud is so valued." },
      { type: "quote", text: "Smoky, sweet, leathery and a little mysterious, there is nothing else quite like it." },
      { type: "h", text: "How does it smell?" },
      { type: "p", text: "Rich and woody with hints of smoke, leather and balsam. Blended with rose or amber, it turns warm and velvety." },
      { type: "h", text: "How to wear it" },
      { type: "p", text: "Oud is powerful, so start with one or two sprays. It shines in the evening and in cooler weather." },
    ],
  },
  {
    slug: "scents-for-every-season",
    title: "Summer or winter: which fragrance for which season?",
    category: "Scent Guides",
    date: "Oct 2026",
    readTime: "4 min read",
    excerpt: "Heat and cold change how a perfume behaves. Here is how to choose.",
    tone: "#1f3a5f",
    productId: "bleu-minuit",
    body: [
      { type: "p", text: "The same perfume can feel completely different in July and in January. Warm air makes scents expand quickly, while cold air keeps them close to the skin." },
      { type: "h", text: "In the heat" },
      { type: "p", text: "Choose fresher, lighter notes like bergamot, lavender and mint. They feel clean and do not become overwhelming." },
      { type: "h", text: "In the cold" },
      { type: "p", text: "Rich notes like amber, vanilla, oud and sandalwood glow in cooler air and feel cosy and comforting." },
      { type: "quote", text: "When in doubt, wear fewer sprays in the heat and a little more in the cold." },
    ],
  },
  {
    slug: "find-your-signature-scent",
    title: "How to find your signature scent",
    category: "Perfume Tips",
    date: "Sep 2026",
    readTime: "5 min read",
    excerpt: "A simple, unhurried way to choose a fragrance you will love for years.",
    tone: "#8a2f45",
    productId: "rose-velours",
    body: [
      { type: "p", text: "A signature scent is the one people connect with you. Finding it takes a little patience, but it is worth it." },
      { type: "h", text: "Start with what you already love" },
      { type: "p", text: "Notice the flowers, foods and places you are drawn to. Rose, vanilla, wood or citrus often point to a scent family you will enjoy." },
      { type: "h", text: "Test on skin, not paper" },
      { type: "p", text: "Fragrance changes with your skin. Try one or two at a time and see how they smell after a few hours." },
      { type: "quote", text: "Judge a perfume by its dry down, not its first spray." },
      { type: "h", text: "Live with it for a day" },
      { type: "p", text: "Wear it through a full day before you decide. The scent you still enjoy at night is the one to keep." },
    ],
  },
];

export const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);