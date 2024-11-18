import React from "react";
import { formatDollars } from "../../foodcomp";
import { Product } from "@/types/types";

// interface CartItems {
//   name: string;
//   quantity: number;
//   price: number;
// }

const CartItems: React.FC<Product> = ({ name, quantity, price }) => {
  return (
    <div>
      <div>
        <h4>{name}</h4>
        <div>
          <p>{quantity}</p>
          <div>
            <p>@{price}</p>
            <p>{formatDollars(price)}</p>
          </div>
        </div>
      </div>
      <button>
        {" "}
        <img src="/icon-remove-item.svg" alt="" />{" "}
      </button>
    </div>
  );
};

export default CartItems;
