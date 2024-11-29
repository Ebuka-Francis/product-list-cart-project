import React from "react";
import { CartProduct } from "@/types/types";
import { formatDollars } from "../foodcomp";
import useBearStore from "@/store/stateManagement";

const CartConfrimation: React.FC<CartProduct> = () => {
  const carts = useBearStore((state) => state.carts);
  const clearCart = useBearStore((state) => state.clearCart);

  // const handleStartNewOrder = () => {
  //   clearCart();
  //  closeModal();
  // }
  const total = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="p-[1rem] flex flex-col gap-3 ">
      <img className="w-[50px]" src="/icon-order-confirmed.svg" alt="" />
        <div>
      <h2 className="text-[30px] font-bold ">Order Confirmed</h2>
      <p className='text-[14px] font-sans p-[0px] opacity-60' >we hope you enjoy your food</p>
        </div>
        <div className="bg-[#f4edeb] " >

      {carts.map((item) => (
        <div key={item.id} className="flex justify-between items-start mt-4 border-b border-[#3e3e41]">
          <div className="flex justify-between items-center w-[100%] p-3">
            <div className="flex gap-3 items-center">
            <img className="w-[50px] rounded-md " src={item.imageUrl} alt="" />
            <div className="flex flex-col ">
            <h4 className="font-sans text-[15px] text-black font-semibold">
              {item.name}
            </h4>

            <div className="flex gap-6">
              <p className="text-[#c73a0f] font-sans text-[15px] font-medium">
                {item.quantity}x
              </p>
              <p className="font-sans text-[15px] text-black font-semibold opacity-60">
                {formatDollars(item.price)}
              </p>
            </div>
            </div>
            </div>
          <button className="text-black font-sans font-semibold p-[3px]">
            {formatDollars(item.price)}
          </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between p-3 items-center">
        <p>total order</p> <p className="text-[30px] font-sans font-semibold" >{formatDollars(total)}</p>
      </div>
        </div>

      <button onClick={clearCart}  className="bg-[#c73a0f] font-sans hover:bg-[#260f08] text-white w-full h-10 mt-5 rounded-full">
            Start New Order
          </button>
    </div>
  );
};

export default CartConfrimation;
