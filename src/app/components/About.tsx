import Image from "next/image";
import about from "./images/about-img.webp";
import Icon from "./Icon";
export default function About() {
  return <section id="story" tabIndex={-1} className="section story-section" aria-labelledby="story-heading"><div className="container story-grid">
    <figure className="story-photo"><div className="story-image"><Image src={about} alt="Atmosphere photograph from the original BLINI concept" fill sizes="(max-width: 767px) 90vw, 46vw" /></div><figcaption>A feeling, before the first course.</figcaption></figure>
    <div className="story-copy"><p className="eyebrow">02 / Our story</p><h2 id="story-heading">More than a meal.<br /><em>A moment to share.</em></h2><p className="lead">The idea behind BLINI is simple: give good food and good company room to come together.</p><p>This independent portfolio project explores the feeling of a welcoming restaurant through food photography, a menu of international dishes and a thoughtfully paced digital experience.</p><p>BLINI is a fictional restaurant. There is no operating venue, service or customer history behind this concept.</p><a className="text-link" href="#menu">Find your inspiration <Icon name="arrow-up-right" /></a><div className="story-signature" aria-hidden="true">Pull up a chair.</div></div>
  </div></section>;
}
