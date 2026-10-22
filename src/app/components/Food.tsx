"use client";
import { useState } from "react";
import Image from "next/image";
import { categories, filterDishes, formatPrice, type Category } from "../data/menu";

export default function Food() {
  const [category, setCategory] = useState<Category>("All dishes");
  const visible = filterDishes(category);
  return <section id="menu" tabIndex={-1} className="section menu-section" aria-labelledby="menu-heading">
    <div className="container">
      <div className="section-heading"><div><p className="eyebrow">01 / The menu</p><h2 id="menu-heading">A world of flavour.<br /><em>One table.</em></h2></div><div className="heading-aside"><p>From comforting bowls to something sweet. Find a dish that catches your eye.</p></div></div>
      <div className="menu-controls"><div className="filters" role="group" aria-label="Filter menu by category">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="dish-grid" onClick={() => setCategory(item)}>{item}</button>)}</div><p className="dish-count" role="status">{visible.length} {visible.length === 1 ? "dish" : "dishes"}</p></div>
      <div id="dish-grid" className="dish-grid">{visible.map((dish, index) => <article className="dish-card" key={dish.id}>
        <div className="dish-image"><Image src={dish.image} alt={dish.name + " — illustrative food photograph"} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 45vw, 380px" quality={75} /><span className="dish-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
        <div className="dish-body"><p className="dish-category">{dish.category}</p><div className="dish-title"><h3>{dish.name}</h3><span aria-label={"Sample price " + formatPrice(dish.illustrativePrice)}>{formatPrice(dish.illustrativePrice)}</span></div><p>{dish.description}</p></div>
      </article>)}</div>
    </div>
  </section>;
}
