

import React from "react";
import { formatDollars } from "../../foodcomp";
import { CartProduct } from "@/types/types";
import useBearStore from "@/store/stateManagement";



const CartItems: React.FC<CartProduct> = ({name,quantity, price, id}) => {
  const deleteCart = useBearStore(state => state.removeItemFromCart)
  const { setToggle} = useBearStore()

  const handleDelte = (id: string) => {
    deleteCart(id)
    setToggle(id)
  }

  return (
    <>
    <div className="flex justify-between items-start p-[10px] mt-4 border-b border-[#a1a1aa]">
      <div className="flex flex-col gap-1">
        <h4 className="font-sans text-[15px] text-black font-semibold">{name}</h4>
        <div className="flex gap-6">
          <p className="text-[#c73a0f] font-sans text-[15px] font-medium">{quantity}x</p>
          <p className="font-sans text-[15px] text-black font-semibold opacity-60">
            {formatDollars(price)}
          </p>
        </div>
      </div>
      <button onClick={() => handleDelte(id)} className="border border-[#333] rounded-lg opacity-25 hover:opacity-90 p-[3px]">
        <img className="hover:text-black" src="/icon-remove-item.svg" alt="Remove" />
      </button>
    </div>
    </>
  );
};

export default CartItems;

