"use client";

import Image from "next/image";

export const formatDollars = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

import React from "react";
import useBearStore from "@/store/stateManagement";
import { CartProduct } from "@/types/types";

const FoodContainer: React.FC<CartProduct> = ({
  id,
  name,
  imageUrl,
  price,
  // quantity,
  product,
  category,
  completed,
  place,
}) => {
  const { carts, setToggle } = useBearStore();
  const addToCart = useBearStore((state) => state.addItemToCart);
  const decreament = useBearStore((state) => state.decrementItemQuantity);

  const cartItem = carts.find((item) => item.id === id);

  const handleChange = () => {
    setToggle(id);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      {/* ── Image block ── */}
      <div className="relative">
        <div className={completed ? "border-2 border-[#c73a0f] rounded-lg overflow-hidden" : "rounded-lg overflow-hidden"}>
          <Image src={imageUrl ?? "/placeholder.png"}  alt={name} className="card-image" width={300} height={300} />
        </div>

        {/* Add to cart / counter button */}
        {completed ? (
          <div className="h-12 absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-[160px] bg-[#c73a0f] cursor-pointer text-white rounded-full flex gap-3 items-center justify-evenly shadow-lg shadow-[#c73a0f]/30 z-10">
            <button
              onClick={() => decreament(id)}
              className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center"
            >
              <Image src="/icon-decrement-quantity.svg" alt="Decrease" width={18} height={18} />
            </button>
            <p className="font-semibold tabular-nums">{cartItem?.quantity || 0}</p>
            <button
              onClick={handleChange}
              className="border border-white rounded-full w-[18px] h-[18px] flex items-center justify-center"
            >
              <Image src="/icon-increment-quantity.svg" alt="Increase" width={18} height={18} />
            </button>
          </div>
        ) : (
          <div
            onClick={handleChange}
            className="h-12 absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-[160px] cursor-pointer bg-white text-black border hover:border-[#c73a0f] border-gray-300 rounded-full flex gap-2 items-center justify-center shadow-md z-10"
          >
            <Image src="/icon-add-to-cart.svg" alt="Add to Cart" width={20} height={20} />
            <p className="font-sans text-[15px] text-black font-semibold">Add to cart</p>
          </div>
        )}
      </div>

      {/* ── Text block ── */}
      <div className="pt-8 px-3 pb-3 flex flex-col gap-1">
        {/* Category badge */}
        <span className="self-start text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          {category}
        </span>

        {/* Meal name */}
        <h2 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-1">
          {name}
        </h2>

        {/* Price + location row */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-[#c73a0f] font-bold text-[17px] tracking-tight">
            ₦{price}
          </p>

          <span className="flex items-center gap-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#c73a0f">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-[12px] font-medium text-gray-500 truncate max-w-[90px]">{place}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodContainer;