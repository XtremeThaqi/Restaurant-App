import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Food from './components/Food';

export default function Page() {
  return (
    <>
      <div className="m-0 p-0 bg-black">
        <Navbar />
        <Hero />
        <Food/>
      </div>
    </>
  );
}
