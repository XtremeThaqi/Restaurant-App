import Brand from "./Brand";
import { projectUrl } from "../data/restaurant";
export default function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div><a href="#top" aria-label="BLINI home"><Brand /></a><p>Good food. Better company.<br />A fictional restaurant, thoughtfully imagined.</p></div><nav aria-label="Footer navigation"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#visit">Visit</a><a href="#reservations">Reservation demo</a></nav><div className="footer-project"><span className="eyebrow">Behind the concept</span><p>A restaurant website by Erblin Thaqi.</p><a className="text-link" href={projectUrl}>Explore the project <span aria-hidden="true">↗</span></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BLINI. Portfolio concept.</span><span>No real orders or reservations.</span><a href="#top">Back to top ↑</a></div></div></footer>;
}
