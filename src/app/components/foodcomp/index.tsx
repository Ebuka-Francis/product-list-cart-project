"use client";

export const formatDollars = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// // // const formatToDollars = (value: number, exchangeRateToUSD: number): string => {
// // //   const valueInUSD = value * exchangeRateToUSD;
// // //   return new Intl.NumberFormat("en-US", {
// // //     style: "currency",
// // //     currency: "USD",
// // //   }).format(valueInUSD);
// // // };

import React from "react";
import { useState } from "react";
import useBearStore from "@/store/stateManagement";
import { CartProduct, Product } from "@/types/types";

const FoodContainer: React.FC<CartProduct> = ({
  id,
  name,
  description,
  imageUrl,
  price,
  quantity,
  product,
  category,
  // completed
}) => {
  const { carts, setToggle } = useBearStore();

  const addToCart = useBearStore((state) => state.addItemToCart);
  const decreament = useBearStore((state) => state.decrementItemQuantity)

 // Find the current item in the cart to check its `completed` state
 const cartItem = carts.find((item) => item.id === id);
 const completed = cartItem?.completed || false;

  const handleChange = () => {
    setToggle(id);


    // Check if product exists and add it to the cart
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="flex gap-5 justify-start flex-col ">
      <div>
        <div className={completed ? "border-2 border-[#c73a0f] rounded-lg" : ""}>
          <img src={imageUrl} alt={name} className="card-image" />
        </div>
        {completed  ? (
          <div
            // onClick={ handleChange}
            className="h-12 relative mx-auto mt-[-20px] w-[170px] bg-[#c73a0f] cursor-pointer text-white rounded-full flex gap-3 items-center justify-evenly "
          >
            <button onClick={() => decreament(id)} className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
              <img src="/icon-decrement-quantity.svg" alt="Decrease" />
            </button>
            <p>{cartItem?.quantity || 0} </p>
            <button onClick={handleChange} className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center">
              <img src="/icon-increment-quantity.svg" alt="Increase" />
            </button>
          </div>
        ) : (
          <div
            onClick={ handleChange}
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
        <h2 className="text-[16px] font-sans p-[0px] opacity-60">{name}</h2>
        <p className="font-sans text-[18px] text-black font-semibold opacity-90">
          {category}
        </p>
        <p className="text-[#c73a0f] font-sans text-[20px] font-medium">
          {formatDollars(price)}
        </p>
      </div>
    </div>
  );
};

export default FoodContainer;
