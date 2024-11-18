'use client';
import { create } from 'zustand';
import { Product }from '../types/types';
import { CartProduct }from '../types/types';


interface BearState {
  bears: number
  carts: CartProduct[]
  addItemToCart: (item: Product) => void;
}

const useBearStore = create<BearState>()((set,get) => ({
  bears: 0,
  carts: [],
 addItemToCart: (item) => {
    const itemExists = get().carts.find(
      (cartItem) => cartItem.id === item.id
    );

    if (itemExists) {
      if (typeof itemExists.quantity === "number") {
        itemExists.quantity++;
      }

      set({ carts: [...get().carts] });
    } else {
      set({ carts: [...get().carts, { ...item, quantity: 1 }] });
    }
  },

}))





export default useBearStore;