'use client';
import { create } from 'zustand';
import { Product }from '../types/types';
import { CartProduct }from '../types/types';


interface BearState {
  decrementItemQuantity: (id: string) => void;
  count: number
  // toggle: boolean
  carts: CartProduct[]
  setToggle:(id: string) => void;
    removeItemFromCart: (id: string) => void; // Function to remove a product from the cart
  addItemToCart: (item: Product) => void;
    clearCart: () => void; 
}

const useBearStore = create<BearState>()((set,get) => ({
  count: 0,
  carts: [],
  toggle: false,
  setToggle: (id) => {
    set((state) => ({
      carts: state.carts.map((cart) =>
        cart.id === id
          ? { ...cart, completed: true }
          : cart
      ),
    }));
    console.log("Toggled cart item:", id);
  },

  addItemToCart: (item) => {
    const carts = get().carts;
  
    const itemExists = carts.find((cartItem) => cartItem.id === item.id);
  
    if (itemExists) {
      // Update the quantity of the existing item
      set({
        carts: carts.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      });
    } else {
      // Add the new item to the cart with `completed` initialized
      set({
        carts: [...carts, { ...item, quantity: 1, completed: true }],
      });
    }
  
    console.log("Updated carts:", get().carts);
  },
  
    // Remove item from cart
  removeItemFromCart: (id) => {
    const carts = get().carts;

    // Filter out the item with the given ID
    set({
      carts: carts.filter((cartItem) => cartItem.id !== id),
    });
  },
  decrementItemQuantity: (id: string) => {
    const carts = get().carts;

    set({
      carts: carts
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0), // Remove items with 0 quantity
    });
  },

    // Clear the cart
  clearCart: () => {
    set({
      carts: [],
    });
  },
  
  
}))





export default useBearStore;









