

import React from "react";
import { FOODITEMS } from "../../../datas/data";
import FoodContainer from "../foodcomp";
import "./foodItems.css";
import { CartProduct } from "@/types/types";

export default function FoodItemsComp() {
  return (
    <div className="container max-w-[800px]">
      {FOODITEMS.map((item, idx) => (
        <FoodContainer
          key={idx}
          id={item.id}
          quantity={item.quantity}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          price={item.price}
          category={item.category}
          product={item} // Pass the item itself as the product
          completed={item.completed}        />
      ))}
    </div>
  );
}

 