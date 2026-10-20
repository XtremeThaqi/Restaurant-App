import Image from "next/image";
import hero from "./images/image-bg.jpg";
import Icon from "./Icon";
export default function Hero() {
  return <section className="hero" aria-labelledby="hero-heading">
    <Image className="hero-image" src={hero} alt="" fill priority sizes="100vw" quality={80} />
    <div className="hero-shade" />
    <div className="container hero-content">
      <p className="eyebrow light"><span className="small-line" /> The BLINI table</p>
      <h1 id="hero-heading">Good food.<br />Better <em>company.</em></h1>
      <p className="hero-description">A little discovery. A long conversation.<br />Explore a restaurant concept made for the moments around the table.</p>
      <div className="actions"><a className="button button-clay" href="#menu">Explore menu <Icon name="arrow-up-right" /></a><a className="button button-ghost" href="#reservations">Reserve a table <span className="demo-tag">Demo</span></a></div>
    </div>
    <div className="container hero-bottom"><span>Food, conversation & a slower pace</span><a href="#menu">Discover BLINI <Icon name="arrow-down" /></a></div>
  </section>;
}
