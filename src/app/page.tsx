// import Carts from "../components/cartContainer";
import Hero from "../components/hero";
import AddsComp from "../components/addscomp/AddsComp";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-6 lg:gap-8 lg:p-8 p-0"
      style={{ background: "#FBF6EF" }}
    >
      <Hero />
      <AddsComp />

    </div>
  );
}