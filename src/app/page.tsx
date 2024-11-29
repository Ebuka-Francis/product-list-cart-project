import Carts from "./components/cartContainer";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className=" flex flex-col lg:flex-row lg:justify-center px-[10px] gap-[40px] my-10 max-w-6xl mx-auto bg-[#f4edeb]">
      <Hero />
      <Carts />
      
    </div>
  );
}
