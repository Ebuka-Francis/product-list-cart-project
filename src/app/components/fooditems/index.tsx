import React from 'react';
import { FOODITEMS } from '../../../datas/data';
import FoodContainer from '../foodcomp';
import './foodItems.css';
import { CartProduct } from '@/types/types';
// import { Product } from '@/types/types';
import { Product } from '@/types/types';

// Define the type for each food item
interface FoodItem {
  id: string;   
  category: string;
  desktop: string;
  name?: string;
  price: number;
  quantity: number;
  product: Product[];
}

// Ensure FOODITEMS is an array of FoodItem objects
const foodItems: Product[] = FOODITEMS;

export default function FoodItemsComp() {
  return (
    <div className='container max-w-[800px]  ' >
      {foodItems.map((item, idx) => (
        // <img key={idx} src={item.desktop} alt={item.name || "Food item"} />
        <FoodContainer key={idx} quantity={item.quantity} imageUrl={item.imageUrl} name={item.category} description={item.name} price={item.price} category={item.category} id={''} product={foodItems}  />
      ))}
    </div>
  );
}

 