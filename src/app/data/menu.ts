import type { StaticImageData } from "next/image";
import sushi from "../components/images/img1.jpg";
import ramen from "../components/images/img2.jpg";
import soup from "../components/images/img3.jpg";
import kebab from "../components/images/img4.jpg";
import duck from "../components/images/img5.jpg";
import paella from "../components/images/img6.jpeg";
import strudel from "../components/images/img7.jpg";
import padThai from "../components/images/img8.jpg";
import goulash from "../components/images/img9.jpg";
import lasagna from "../components/images/img10.jpg";
import chicken from "../components/images/img11.jpg";
import curry from "../components/images/img12.jpg";

export const categories = ["All dishes", "Main courses", "Soups & bowls", "Desserts"] as const;
export type Category = (typeof categories)[number];
export interface Dish {
  id: string;
  name: string;
  category: Exclude<Category, "All dishes">;
  description: string;
  image: StaticImageData;
  illustrativePrice: number;
}
// Original concept dishes and USD amounts, retained as illustrative content.
// These are not verified offerings, recipes, prices, or allergen declarations.
export const dishes: readonly Dish[] = [
  { id: "sushi", name: "Sushi", category: "Main courses", description: "Vinegared rice with a colourful selection of accompaniments.", image: sushi, illustrativePrice: 19.55 },
  { id: "ramen", name: "Ramen", category: "Soups & bowls", description: "Wheat noodles in a savoury broth with traditional toppings.", image: ramen, illustrativePrice: 7.75 },
  { id: "tom-yam", name: "Tom Yam Goong", category: "Soups & bowls", description: "A fragrant shrimp soup with herbs, citrus and chilli.", image: soup, illustrativePrice: 6 },
  { id: "kebab", name: "Kebab", category: "Main courses", description: "Seasoned meat with garlic and black pepper.", image: kebab, illustrativePrice: 2.75 },
  { id: "peking-duck", name: "Peking duck", category: "Main courses", description: "Roast duck with cucumber, spring onion and sweet bean sauce.", image: duck, illustrativePrice: 40 },
  { id: "paella", name: "Paella", category: "Main courses", description: "A Spanish rice dish with vegetables and aromatic seasoning.", image: paella, illustrativePrice: 25 },
  { id: "strudel", name: "Apfelstrudel", category: "Desserts", description: "Delicate pastry filled with apples and cinnamon.", image: strudel, illustrativePrice: 6 },
  { id: "pad-thai", name: "Pad Thai", category: "Main courses", description: "Stir-fried noodles with tofu, peanuts, vegetables and lime.", image: padThai, illustrativePrice: 13 },
  { id: "goulash", name: "Goulash", category: "Soups & bowls", description: "A warming stew with paprika, carrots and potatoes.", image: goulash, illustrativePrice: 4 },
  { id: "lasagna", name: "Lasagna", category: "Main courses", description: "Layers of pasta, meat, tomato sauce and cheese.", image: lasagna, illustrativePrice: 12 },
  { id: "fried-chicken", name: "Fried chicken", category: "Main courses", description: "Crisp chicken with a seasoned flour coating.", image: chicken, illustrativePrice: 7 },
  { id: "massaman", name: "Massaman curry", category: "Main courses", description: "A rich Thai curry with warm, aromatic spices.", image: curry, illustrativePrice: 17 },
];
export function filterDishes(category: Category) {
  return category === "All dishes" ? dishes : dishes.filter(dish => dish.category === category);
}
const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const formatPrice = (amount: number) => priceFormat.format(amount);
