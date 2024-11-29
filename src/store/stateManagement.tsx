'use client';
import { create } from 'zustand';
import { Product }from '../types/types';
import { CartProduct }from '../types/types';


interface BearState {
  decrementItemQuantity: any;
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


// 'use client';

// import { create } from 'zustand';
// import { Product, CartProduct } from '../types/types';

// // Define the state interface
// interface CartState {
//   carts: CartProduct[]; // Array of items in the cart
//   count: number; // Optional: Total item count in the cart
//   addItemToCart: (item: Product) => void; // Function to add a product to the cart
//   removeItemFromCart: (id: string) => void; // Function to remove a product from the cart
//   clearCart: () => void; // Function to clear the cart
// }

// // Create the Zustand store
// const useCartStore = create<CartState>()((set, get) => ({
//   carts: [],
//   count: 0,

//   // Add item to cart
//   addItemToCart: (item) => {
//     const carts = get().carts;

//     // Check if the item already exists in the cart
//     const itemExists = carts.find((cartItem) => cartItem.id === item.id);

//     if (itemExists) {
//       // Update the quantity if the item exists
//       set({
//         carts: carts.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         ),
//       });
//     } else {
//       // Add the new item to the cart
//       set({
//         carts: [...carts, { ...item, quantity: 1 }], // Default quantity is 1
//       });
//     }
//     console.log("Updated carts:", ...carts);
//     console.log('new items>>>>>>>>', itemExists);

//   },

//   // Remove item from cart
//   removeItemFromCart: (id) => {
//     const carts = get().carts;

//     // Filter out the item with the given ID
//     set({
//       carts: carts.filter((cartItem) => cartItem.id !== id),
//     });
//   },


// }));


// export default useCartStore;






