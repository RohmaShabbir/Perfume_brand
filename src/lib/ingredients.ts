export type Ingredient = {
  id: string;
  name: string;
  origin: string;
  family: string;
  description: string;
  moods: string[];
  colors: [string, string];
  keyword: string; // products ke notes mein isi se match hota hai
};

export const ingredients: Ingredient[] = [
  {
    id: "oud", name: "Oud", origin: "Southeast Asia", family: "Woody, Resinous", keyword: "oud",
    description: "A dark, resinous wood prized for its smoky, leathery depth. One of the most precious materials in perfumery.",
    moods: ["Bold", "Mysterious", "Evening"], colors: ["#a9741f", "#2b1a08"],
  },
  {
    id: "rose", name: "Rose", origin: "Taif and Bulgaria", family: "Floral", keyword: "rose",
    description: "Velvety, romantic and slightly honeyed. Damask rose gives a fragrance its soft, unforgettable heart.",
    moods: ["Romantic", "Elegant", "Timeless"], colors: ["#d4607f", "#4a1325"],
  },
  {
    id: "amber", name: "Amber", origin: "Blend of resins", family: "Warm, Sweet", keyword: "amber",
    description: "A glowing blend of resins that feels like warm skin. It gives a scent its richness and staying power.",
    moods: ["Warm", "Sensual", "Cozy"], colors: ["#e0a23a", "#4a2d08"],
  },
  {
    id: "vanilla", name: "Vanilla", origin: "Madagascar", family: "Gourmand", keyword: "vanilla",
    description: "Creamy, soft and comforting. Real vanilla adds sweetness without ever feeling childish.",
    moods: ["Comforting", "Soft", "Inviting"], colors: ["#e8d3a0", "#5a4420"],
  },
  {
    id: "saffron", name: "Saffron", origin: "Iran and Kashmir", family: "Spicy", keyword: "saffron",
    description: "Delicate threads with a leathery, honeyed spice. A little saffron makes an opening feel luxurious.",
    moods: ["Rich", "Exotic", "Confident"], colors: ["#e07a1f", "#4a1c05"],
  },
  {
    id: "sandalwood", name: "Sandalwood", origin: "India", family: "Creamy Wood", keyword: "sandalwood",
    description: "Smooth, milky and meditative. It wraps a perfume in a calm, creamy warmth.",
    moods: ["Calm", "Refined", "Grounded"], colors: ["#c99b6a", "#3a2614"],
  },
  {
    id: "jasmine", name: "Jasmine", origin: "Egypt and India", family: "White Floral", keyword: "jasmine",
    description: "Heady, sweet and slightly animalic. Jasmine adds the glow that makes a scent feel alive.",
    moods: ["Sensual", "Radiant", "Night"], colors: ["#f3ead0", "#6b5c2a"],
  },
  {
    id: "musk", name: "Musk", origin: "Modern lab-made", family: "Skin Scent", keyword: "musk",
    description: "Clean, soft and close to the skin. Modern musk smooths every note and makes a scent linger.",
    moods: ["Clean", "Intimate", "Quiet"], colors: ["#cfc3b0", "#4a4236"],
  },
];