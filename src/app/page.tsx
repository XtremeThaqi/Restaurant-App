import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Page() {
  return (
    <>
      <div className="m-0 p-0 bg-black">
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
