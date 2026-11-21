import { products, formatPrice } from "./products";
import { site } from "./site";

export type Reply = {
  text: string;
  productIds?: string[];
  chips?: string[];
  link?: { label: string; href: string };
};

export const defaultChips = ["Recommend a perfume", "Prices", "Delivery", "Cash on delivery"];

export const intro: Reply = {
  text: "Hi, I'm Rohma, your fragrance guide. Ask me about our perfumes, prices or delivery, or let me help you find your signature scent.",
  chips: defaultChips,
};

const URDU = new Set([
  "kya", "kitne", "kitna", "qeemat", "kimat", "kaise", "kese", "hai", "hain", "mujhe", "chahiye", "chaiye",
  "khushbu", "din", "kab", "nahi", "nahin", "aap", "ap", "salam", "bhai", "behan", "kon", "konsa", "kaunsa",
  "acha", "achi", "theek", "shukriya", "shukria", "ka", "ki", "ke", "mein", "main", "mera", "meri", "karo", "kar",
  "milega", "milti", "asli", "tohfa", "sardi", "garmi", "pyar", "biwi", "ammi", "abu", "kharid",
]);

const moods = [
  {
    words: ["romantic", "romance", "date", "love", "pyar", "floral", "flower", "feminine"],
    ids: ["rose-velours", "vanille-blanche"],
    en: "For something romantic, these two are loved: soft, floral and a little dreamy.",
    ur: "Romantic mood ke liye ye dono bohat pasand ki jati hain: naram, floral aur dreamy.",
  },
  {
    words: ["fresh", "clean", "summer", "garmi", "cool", "light", "crisp", "breezy"],
    ids: ["bleu-minuit", "santal-nuit"],
    en: "For a fresh, light feel, try these. They stay crisp even in the heat.",
    ur: "Fresh aur halki khushbu ke liye ye try karein. Garmi mein bhi crisp rehti hain.",
  },
  {
    words: ["warm", "cozy", "sweet", "winter", "sardi", "vanilla", "gourmand"],
    ids: ["amber-royale", "vanille-blanche"],
    en: "Warm and cozy is these two: glowing amber and creamy vanilla.",
    ur: "Warm aur cozy ke liye ye dono best hain: glowing amber aur creamy vanilla.",
  },
  {
    words: ["bold", "strong", "smoky", "oud", "night", "evening", "party", "mysterious", "intense"],
    ids: ["noir-oud", "amber-royale"],
    en: "For bold and unforgettable, go for these. Deep, smoky and made for evenings.",
    ur: "Bold aur yaadgar khushbu ke liye ye lein. Gehri, smoky aur raat ke liye bani hain.",
  },
  {
    words: ["office", "work", "daily", "everyday", "formal", "professional", "college", "university"],
    ids: ["bleu-minuit", "santal-nuit"],
    en: "For work and everyday wear, these are polished and never loud.",
    ur: "Office aur roz ke liye ye perfect hain: polished aur kabhi loud nahi.",
  },
  {
    words: ["woody", "wood", "sandalwood", "cedar"],
    ids: ["santal-nuit", "noir-oud"],
    en: "If you love woods, these two are deep and refined.",
    ur: "Agar aap ko woody khushbu pasand hai to ye dono gehri aur refined hain.",
  },
];

export function getReply(raw: string): Reply {
  const s = raw.toLowerCase().trim();
  const tokens = new Set(s.split(/[^a-z]+/).filter(Boolean));
  const ur = [...tokens].some((t) => URDU.has(t));
  const t = (en: string, u: string) => (ur ? u : en);
  // chhote lafz token se, lambay lafz substring se match hote hain
  const hit = (...words: string[]) => words.some((w) => (w.length <= 4 ? tokens.has(w) : s.includes(w)));

  const more: string[] = ["Recommend a perfume", "Prices", "Contact"];

  if (tokens.size <= 4 && hit("hi", "hello", "hey", "salam", "assalam", "aoa", "hola")) {
    return {
      text: t(
        "Hello and welcome! I'm Rohma. How can I help you today?",
        "Assalam o Alaikum! Main Rohma hoon. Aaj main aap ki kya madad kar sakti hoon?"
      ),
      chips: defaultChips,
    };
  }

  if (hit("thanks", "thank", "shukriya", "shukria", "jazak")) {
    return {
      text: t("You are most welcome. Anything else I can help with?", "Aap ka shukriya! Kuch aur poochna ho to bataiye."),
      chips: more,
    };
  }

  if (hit("bye", "goodbye", "allah hafiz", "khuda hafiz")) {
    return { text: t("Goodbye, and may your day smell wonderful.", "Allah Hafiz! Aap ka din khushbu se bhara rahe.") };
  }

  // kisi perfume ka naam
  const named = products.find(
    (p) => s.includes(p.name.toLowerCase()) || tokens.has(p.name.toLowerCase().split(" ")[0])
  );
  if (named) {
    return {
      text: t(
        `${named.name}: ${named.tagline}. ${named.description} Prices start from ${formatPrice(named.sizes[0].price)}.`,
        `${named.name} ek ${named.family.toLowerCase()} khushbu hai: ${named.tagline}. Qeemat ${formatPrice(named.sizes[0].price)} se shuru hoti hai.`
      ),
      productIds: [named.id],
      chips: ["Recommend a perfume", "Delivery", "Cash on delivery"],
    };
  }

  // COD delivery se pehle check hota hai
  if (hit("cod", "cash", "payment", "pay", "easypaisa", "jazzcash", "card")) {
    return {
      text: t(
        "Yes, you can pay cash on delivery, or place your order directly on WhatsApp. More payment options will be added soon.",
        "Ji, Cash on Delivery available hai, ya aap seedha WhatsApp par order kar sakte hain. Doosre payment options jald add honge."
      ),
      link: { label: "Order on WhatsApp", href: `https://wa.me/${site.whatsapp}` },
      chips: ["Delivery", "Prices"],
    };
  }

  if (hit("price", "cost", "qeemat", "kimat", "kitne", "kitna", "rate", "how much")) {
    const lines = products.map((p) => `${p.name}: from ${formatPrice(p.sizes[0].price)}`).join("\n");
    return {
      text: t(`Here are our starting prices:\n${lines}\n\nLarger sizes cost a little more.`, `Ye hain hamari starting qeematein:\n${lines}\n\nBade size ki qeemat thori zyada hoti hai.`),
      chips: ["Recommend a perfume", "Delivery"],
    };
  }

  if (hit("deliver", "shipping", "ship", "kitne din", "kab tak", "kab milega", "courier", "dispatch", "arrive")) {
    return {
      text: t(
        "Orders usually arrive within 3 to 5 working days across Pakistan. Major cities are often faster.",
        "Order aam tor par Pakistan mein 3 se 5 working din mein pohanch jata hai. Bade shehron mein aksar jaldi aa jata hai."
      ),
      chips: ["Cash on delivery", "Prices"],
    };
  }

  if (hit("authentic", "original", "asli", "fake", "genuine", "real")) {
    return {
      text: t(
        "Every bottle is blended by us in small batches. Nothing is resold or diluted.",
        "Har bottle hum khud chhote batches mein banate hain. Kuch bhi resell ya dilute nahi hota."
      ),
      chips: ["Recommend a perfume", "Delivery"],
    };
  }

  if (hit("lasting", "lasts", "longevity", "stay", "tikta", "tikti", "hours", "projection")) {
    const best = [...products].sort((a, b) => b.longevity - a.longevity).slice(0, 2);
    return {
      text: t(
        "Most of our blends last 6 to 10 hours on skin. These two last the longest:",
        "Hamari zyada tar khushbuein skin par 6 se 10 ghante chalti hain. Ye dono sab se zyada der tak rehti hain:"
      ),
      productIds: best.map((p) => p.id),
      chips: ["Prices", "Delivery"],
    };
  }

  if (hit("gift", "tohfa", "present", "wrap", "birthday", "anniversary")) {
    return {
      text: t(
        "Perfume makes a lovely gift. These are our most gifted scents, and we can wrap your order in our signature box. Just mention it in your order message.",
        "Perfume ek khoobsurat tohfa hai. Ye sab se zyada gift hone wali khushbuein hain, aur hum signature box mein wrap bhi kar dete hain. Bas order mein bata dein."
      ),
      productIds: ["rose-velours", "amber-royale"],
      chips: ["Prices", "Delivery"],
    };
  }

  if (hit("contact", "whatsapp", "call", "number", "phone", "email", "talk", "human", "agent")) {
    return {
      text: t(
        "You can reach our team on WhatsApp. We usually reply within 24 hours.",
        "Aap hamari team se WhatsApp par rabta kar sakte hain. Hum aam tor par 24 ghante mein jawab dete hain."
      ),
      link: { label: "Chat on WhatsApp", href: `https://wa.me/${site.whatsapp}` },
    };
  }

  if (hit("order", "buy", "purchase", "kharid", "cart", "checkout")) {
    return {
      text: t(
        "Easy: pick a perfume, choose a size and tap Add to Cart. Then Checkout sends your order to us on WhatsApp.",
        "Bohat aasan: perfume chunein, size select karein aur Add to Cart dabayein. Phir Checkout aap ka order WhatsApp par hum tak bhej deta hai."
      ),
      chips: ["Recommend a perfume", "Cash on delivery"],
    };
  }

  const men = hit("men", "mens", "male", "gents", "him", "husband", "boyfriend", "brother", "father", "dad", "bhai", "abu");
  const women = hit("women", "womens", "female", "ladies", "her", "wife", "girlfriend", "sister", "mother", "mom", "behan", "ammi", "biwi");
  if (men !== women) {
    const cat = men ? "men" : "women";
    const list = products.filter((p) => p.category === cat || p.category === "unisex").slice(0, 3);
    return {
      text: t(
        `Here are our picks for ${cat === "men" ? "him" : "her"}. Unisex scents work beautifully too.`,
        `${cat === "men" ? "Mardon" : "Khawateen"} ke liye ye hamari pasandeeda khushbuein hain. Unisex scents bhi bohat achhi lagti hain.`
      ),
      productIds: list.map((p) => p.id),
      chips: ["Prices", "Delivery"],
    };
  }

  for (const m of moods) {
    if (hit(...m.words)) {
      return { text: t(m.en, m.ur), productIds: m.ids, chips: ["Prices", "Delivery", "Cash on delivery"] };
    }
  }

  if (hit("recommend", "suggest", "best", "konsa", "kaunsa", "which", "choose", "bestseller", "popular", "help me")) {
    return {
      text: t(
        "Happy to help. What kind of mood are you after? Or take a look at our top three:",
        "Zaroor. Aap kis tarah ka mood chahte hain? Ya hamare top teen dekhein:"
      ),
      productIds: ["noir-oud", "rose-velours", "amber-royale"],
      chips: ["Something romantic", "Fresh for summer", "Bold and smoky", "For the office"],
    };
  }

  return {
    text: t(
      "I am still learning, so I may not have the answer to that. I can help with scents, prices, delivery and orders, or you can chat with our team.",
      "Main abhi seekh rahi hoon, is ka jawab shayad mere paas nahi. Main khushbu, qeemat, delivery aur order mein madad kar sakti hoon, ya aap hamari team se baat kar lein."
    ),
    link: { label: "Chat on WhatsApp", href: `https://wa.me/${site.whatsapp}` },
    chips: defaultChips,
  };
}