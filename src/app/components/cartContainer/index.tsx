


"use client";
import React, { useState } from "react";
import useBearStore from "@/store/stateManagement";
import CartItems from "./cartItems";
import { CartProduct } from "@/types/types";
import Modal from "../modals";
import CartConfrimation from "../cart-confirmation";

function Carts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useBearStore((state) => state.carts); // Access cart items from Zustand
  const foodie: CartProduct[] = cart;

  // Calculate total price of items in the cart
   const total = foodie.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <div className="max-w-2xl w-full">
      {cart && cart.length < 1 ? (
        <div className="w-full h-[250px] bg-white p-3 rounded-xl">
          <h2 className="text-[#c73a0f] font-sans font-bold text-2xl">
            Your Cart({cart.length})
          </h2>
          <div className="flex flex-col items-center">
            <img src="/illustration-empty-cart.svg" alt="empty-cart-image" />
            <p>Your added items will appear here</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-3 rounded-xl">
          <h2 className="text-[#c73a0f] font-sans font-bold text-2xl">
            Your Cart({cart.length})
          </h2>
          {foodie.map((item, idx) => (
            <CartItems
              key={idx}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              category={item.category || "Uncategorized"}
              id={item.id}
              product={item}
              completed={item.completed || false}
            />
          ))}
          <div className="flex justify-between items-center h-16 border-t mt-4 pt-4">
            <p className="font-semibold">Order Total:</p>
            <h3 className="text-lg font-bold">{`$${total.toFixed(2)}`}</h3>
          </div>
          <div className="flex justify-center gap-1 p-3 bg-[#f4edeb] rounded-lg w-full mx-auto">
            <img src="/icon-carbon-neutral.svg" alt="carbon image" />
            <p className="font-sans text-[14px]">
              This is a <span className="font-semibold">Carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button onClick={openModal} className="bg-[#c73a0f] hover:bg-[#260f08] text-white w-full h-10 mt-5 rounded-full">
            Confirm Order
          </button>
        </div>
      )}
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal} >
    <CartConfrimation 
    id={""} name={""} price={0} quantity={0} category={""} />
      
    </Modal>
    </>
  );
}

export default Carts;





