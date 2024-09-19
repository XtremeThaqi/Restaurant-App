import WarningMessage from "./components/WarningMessage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Food from "./components/Food";
import About from "./components/About";
import Open from "./components/Open";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <div className="overflow-x-hidden">
        <WarningMessage />
        <Navbar />
        <Hero />
        <Food />
        <About />
        <Open />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
