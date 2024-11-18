// Define the interface for each food item
import { Product } from "@/types/types";
interface FoodItem {
  id: string;   
  thumbnail?: string;
  mobile?: string;
  tablet?: string;
  desktop: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// Define FOODITEMS as an array of FoodItem objects
export const FOODITEMS: Product[] = [
  {
    id: '',
    imageUrl: "/image-waffle-desktop.jpg",
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-creme-brulee-desktop.jpg",
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-macaron-desktop.jpg",
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-tiramisu-desktop.jpg",
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "./image-baklava-desktop.jpg",
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-meringue-desktop.jpg",
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-cake-desktop.jpg",
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-brownie-desktop.jpg",
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
  {
    id: '',
    imageUrl: "/image-panna-cotta-desktop.jpg",
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    quantity: 1,
    product: {
      id: 0,
      name: "",
      price: 0
    }
  },
];
