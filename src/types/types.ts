


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
