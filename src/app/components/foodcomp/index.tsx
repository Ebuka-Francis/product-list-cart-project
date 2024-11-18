"use client";
// import React from "react";
// import { useState } from "react";
// import useBearStore from "@/store/stateManagement";
// import { CartProduct } from "@/types/types";
// import { Product } from "@/types/types";



// interface CardProps {
//   id: string;   
//   title?: string;
//   description?: string;
//   image?: string; // Optional
//   price: number;
//   key: string | number;
//   quantity: number;
//   product: Product;
//   // foodItem: Product[];
//   // exchangeRateToUSD: number;
// }

export const  formatDollars = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// // const formatToDollars = (value: number, exchangeRateToUSD: number): string => {
// //   const valueInUSD = value * exchangeRateToUSD;
// //   return new Intl.NumberFormat("en-US", {
// //     style: "currency",
// //     currency: "USD",
// //   }).format(valueInUSD);
// // };

// const FoodContainer: React.FC<CartProduct> = ({
//   name,
//   description,
//   imageUrl,
//   price,
//   quantity,
//   product
// }) => {
//   const [data, setData] = useState<boolean>(false);

//   const count = useBearStore(state => state.bears);
//   // const addItemToCart = useBearStore(state => state.addItemToCart);
//   const { addItemToCart } = useBearStore();

//   const handleChange = () => {
//     addItemToCart(product)
//     setData((prevstate) => !prevstate);
//   };

//   return (
//     <div className="flex gap-5 justify-start flex-col ">
//       <div className="">
//         <div className={data ? "border-2 border-[#c73a0f] rounded-lg" : ""}>
//           <img src={imageUrl} alt={name} className="card-image" />
//         </div>
//         {data ? (
//           <div
//             onClick={handleChange}
//             className="h-12 mx-auto mt-[-20px] relative w-[170px] bg-[#c73a0f] cursor-pointer text-white rounded-full flex gap-3 items-center justify-evenly "
//           >
//             <button className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
//               {" "}
//               <img src="/icon-decrement-quantity.svg" alt="" />{" "}
//             </button>

//             <p>{quantity} {count} </p>
//             <button className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center ">
//               {" "}
//               <img src="/icon-increment-quantity.svg" alt="" />{" "}
//             </button>
//           </div>
//         ) : (
//           <div
//             onClick={() => addItemToCart}
//             className="h-12 mx-auto mt-[-20px] relative w-[170px] cursor-pointer bg-[#fff] text-black  border hover:border-[#c73a0f] border-solid border-gray-300 rounded-full flex gap-3 items-center justify-center "
//           >
//             <button>
//               {" "}
//               <img src="icon-add-to-cart.svg" alt="" />
//             </button>
//             <p className="font-sans text-[16px]  text-black font-semibold opacity-90">
//               Add to cart
//             </p>
//           </div>
//         )}
//       </div>
//       <div>
//         <h2 className="text-[16px]  font-sans p-[0px] opacity-25 ">{name}</h2>
//         <p className=" font-sans text-[18px]  text-black font-semibold opacity-90">
//           {description}
//         </p>
//         <p className="text-[#c73a0f] font-sans text-[20px] font-medium ">
//           {" "}
//           {formatDollars(price)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FoodContainer;


import React from "react";
import { useState } from "react";
import useBearStore from "@/store/stateManagement";
import { CartProduct, Product } from "@/types/types";
// import { formatDollars } from "@/utils/formatDollars"; // Assuming formatDollars is in a utils folder

interface FoodContainerProps extends CartProduct {
  product:Product;
}

const FoodContainer: React.FC<FoodContainerProps> = ({
  id,
  name,
  description,
  imageUrl,
  price,
  quantity,
  product,
}) => {
  const [data, setData] = useState(false);
  const count = useBearStore((state) => state.bears);
  const { addItemToCart } = useBearStore();

  const handleChange = () => {
    addItemToCart(product);
    setData((prevState) => !prevState);
  };

  return (
    <div className="flex gap-5 justify-start flex-col ">
      <div>
        <div className={data ? "border-2 border-[#c73a0f] rounded-lg" : ""}>
          <img src={imageUrl} alt={name} className="card-image" />
        </div>
        {data ? (
          <div
            onClick={handleChange}
            className="h-12 relative mx-auto mt-[-20px] w-[170px] bg-[#c73a0f] cursor-pointer text-white rounded-full flex gap-3 items-center justify-evenly "
          >
            <button className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
              <img src="/icon-decrement-quantity.svg" alt="Decrease" />
            </button>
            <p>{quantity} {count}</p>f
            <button className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
              <img src="/icon-increment-quantity.svg" alt="Increase" />
            </button>
          </div>
        ) : (
          <div
            onClick={handleChange}
            className="h-12 relative mx-auto mt-[-20px] w-[170px] cursor-pointer bg-white text-black border hover:border-[#c73a0f] border-gray-300 rounded-full flex gap-3 items-center justify-center "
          >
            <button>
              <img src="icon-add-to-cart.svg" alt="Add to Cart" />
            </button>
            <p className="font-sans text-[16px] text-black font-semibold opacity-90">
              Add to cart
            </p>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-[16px] font-sans p-[0px] opacity-25">{name}</h2>
        <p className="font-sans text-[18px] text-black font-semibold opacity-90">
          {description}
        </p>
        <p className="text-[#c73a0f] font-sans text-[20px] font-medium">
          {formatDollars(price)}
        </p>
      </div>
    </div>
  );
};

export default FoodContainer;
