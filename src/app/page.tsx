import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Food from "./components/Food";
import About from "./components/About";
import Visit from "./components/Visit";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
export default function Page() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main" tabIndex={-1}><div id="top" /><Hero /><Food /><About /><Visit /><Reservation /></main><Footer /></>;
}
