import Brand from "./Brand";
import { projectUrl } from "../data/restaurant";
import Icon from "./Icon";
export default function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div><a href="#top" aria-label="BLINI home"><Brand /></a><p>Good food. Better company.</p></div><nav aria-label="Footer navigation"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#visit">Visit</a><a href="#reservations">Reservations</a></nav><div className="footer-project"><span className="eyebrow">The project</span><a className="text-link" href={projectUrl}>View on GitHub <Icon name="arrow-up-right" /></a></div></div><p className="footer-disclosure">BLINI is a fictional restaurant concept created for portfolio purposes. No real orders or reservations are accepted. Menu items, prices, and opening hours are illustrative.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} BLINI.</span><a href="#top">Back to top <Icon name="arrow-up" /></a></div></div></footer>;
}
