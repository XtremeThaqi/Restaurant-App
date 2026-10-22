import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Food from "./components/Food";
import About from "./components/About";
import Visit from "./components/Visit";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
export default function Page() {
  return <SmoothScroll><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main" tabIndex={-1}><div id="top" tabIndex={-1} /><div className="stacked-intro"><Hero /><Food /></div><About /><Visit /><Reservation /></main><Footer /></SmoothScroll>;
}
