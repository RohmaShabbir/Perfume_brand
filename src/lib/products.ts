export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: "men" | "women" | "unisex";
  family: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  sizes: { ml: number; price: number }[];
  longevity: number; // 1-10
  projection: number; // 1-10
  tone: string; // bottle ke andar ka rang
};

export const products: Product[] = [
  {
    id: "noir-oud",
    name: "Noir Oud",
    tagline: "Smoke, leather and midnight",
    category: "unisex",
    family: "Woody Oriental",
    description: "A deep, smoky oud wrapped in saffron and warm amber. Made for evenings that never end.",
    notes: { top: ["Saffron", "Bergamot"], heart: ["Oud", "Rose"], base: ["Amber", "Musk"] },
    sizes: [{ ml: 30, price: 6500 }, { ml: 50, price: 9500 }, { ml: 100, price: 15000 }],
    longevity: 9, projection: 8, tone: "#7a4a14",
  },
  {
    id: "rose-velours",
    name: "Rose Velours",
    tagline: "Velvet petals at dusk",
    category: "women",
    family: "Floral",
    description: "Damask rose softened with vanilla and white musk. Romantic, soft and unforgettable.",
    notes: { top: ["Pink Pepper", "Lychee"], heart: ["Damask Rose", "Peony"], base: ["Vanilla", "White Musk"] },
    sizes: [{ ml: 30, price: 6000 }, { ml: 50, price: 8800 }, { ml: 100, price: 14000 }],
    longevity: 7, projection: 6, tone: "#8a2f45",
  },
  {
    id: "amber-royale",
    name: "Amber Royale",
    tagline: "Liquid gold on skin",
    category: "unisex",
    family: "Amber",
    description: "Warm amber, honey and sandalwood. A rich, glowing scent that feels like luxury itself.",
    notes: { top: ["Cardamom", "Orange"], heart: ["Honey", "Labdanum"], base: ["Amber", "Sandalwood"] },
    sizes: [{ ml: 30, price: 6800 }, { ml: 50, price: 9800 }, { ml: 100, price: 15500 }],
    longevity: 8, projection: 7, tone: "#a8741a",
  },
  {
    id: "santal-nuit",
    name: "Santal Nuit",
    tagline: "Quiet power, after dark",
    category: "men",
    family: "Woody",
    description: "Creamy sandalwood, cedar and a hint of black pepper. Confident, calm and refined.",
    notes: { top: ["Black Pepper", "Lemon"], heart: ["Cedar", "Iris"], base: ["Sandalwood", "Vetiver"] },
    sizes: [{ ml: 30, price: 6200 }, { ml: 50, price: 9000 }, { ml: 100, price: 14500 }],
    longevity: 8, projection: 6, tone: "#3d4a3a",
  },
  {
    id: "vanille-blanche",
    name: "Vanille Blanche",
    tagline: "Soft, sweet, addictive",
    category: "women",
    family: "Gourmand",
    description: "Madagascan vanilla with warm tonka and a touch of jasmine. Cozy, sweet and magnetic.",
    notes: { top: ["Mandarin", "Pear"], heart: ["Jasmine", "Orchid"], base: ["Vanilla", "Tonka Bean"] },
    sizes: [{ ml: 30, price: 5800 }, { ml: 50, price: 8500 }, { ml: 100, price: 13500 }],
    longevity: 7, projection: 7, tone: "#b88a4a",
  },
  {
    id: "bleu-minuit",
    name: "Bleu Minuit",
    tagline: "Cold air, hot nights",
    category: "men",
    family: "Aromatic",
    description: "Fresh bergamot and lavender over a deep musky base. Sharp, modern and clean.",
    notes: { top: ["Bergamot", "Mint"], heart: ["Lavender", "Geranium"], base: ["Musk", "Patchouli"] },
    sizes: [{ ml: 30, price: 5600 }, { ml: 50, price: 8200 }, { ml: 100, price: 13000 }],
    longevity: 6, projection: 7, tone: "#1f3a5f",
  },
];

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
export const getProduct = (id: string) => products.find((p) => p.id === id);