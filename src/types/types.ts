// type Products = {
//   id: number;
//   name: string;
//   price: number;
// };
// export interface CartProduct {
//     category: string;
//     id: string;           // Unique identifier for the product
//     name: string;         // Name of the product
//     price: number;        // Price of the product
//     quantity: number;     // Quantity of this product in the cart
//     imageUrl?: string;    // Optional: URL of the product image
//     description?: string;
//     product: Products; 
    
//   }

//   export interface Product {
//     category: string;
//     id: string;           // Unique identifier for the product
//     name: string;         // Name of the product
//     price: number;        // Price of the product
//     quantity: number;     // Quantity of this product in the cart
//     imageUrl?: string;    // Optional: URL of the product image
//     description?: string; 
//     product: Products; 
//          // Optional: Available stock quantity
//   }

// type Products = {
//   id: number;
//   name: string;
//   price: number;
// };

// export interface Product {
//   category: string;
//   id: string;           // Unique identifier for the product
//   name: string;         // Name of the product
//   price: number;        // Price of the product
//   quantity: number;     // Quantity of this product
//   imageUrl?: string;    // Optional: URL of the product image
//   description?: string; 
//   product: Products;
// }

// export interface CartProduct extends Product {
//   quantity: number;     // Quantity of this product in the cart
// }


export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
  category: string;
  completed?: boolean;
}

export interface CartProduct extends Product {
  product?: Product; // Specific quantity for cart usage
}


export type Products = Product[];
