import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Food from "./components/Food";
import About from "./components/About";
import Visit from "./components/Visit";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import Icon from "./components/Icon";
export default function Page() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main" tabIndex={-1}><div id="top" /><Hero /><div className="concept-ribbon"><div className="container"><Icon name="asterisk" className="ribbon-symbol" /><p>A restaurant imagined. <span>A portfolio concept, with no real orders or bookings.</span></p><a href="#story">Meet the concept <Icon name="arrow-up-right" /></a></div></div><Food /><About /><Visit /><Reservation /></main><Footer /></>;
}
