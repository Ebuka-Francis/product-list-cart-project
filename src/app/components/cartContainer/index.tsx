'use client';
import React from 'react';
import useBearStore from '@/store/stateManagement';
import CartItems from './cartItems';
import { Product } from '@/types/types';
 

interface CartsItm {
  name: string;
  quantity: number;
  price: number;
}


function Carts() {
  const {carts } = useBearStore();
const foodie: Product[] = carts;
  return (
    <>
    {carts && carts.length < 1 ? 
    <div className='max-w-2xl w-[100%] h-[250px] bg-white p-3 rounded-xl' >
        <h2 className='text-[#c73a0f]  font-sans font-bold text-2xl '>Your Cart(0)</h2>
        <div className='flex flex-col items-center'>
            <img src="/illustration-empty-cart.svg" alt="empty-cart-image" />
            <p>Your added items will apear here</p>

        </div>
    </div>
    :
    <div className='max-w-2xl w-[100%] h-[250px] bg-white p-3 rounded-xl' >
    <h2 className='text-[#c73a0f]  font-sans font-bold text-2xl '>Your Cart(0)</h2>
     {foodie.map((item, idx) => <CartItems name={item.name} quantity={item.quantity} price={item.price} category={''} id={''} /> )}

    </div>
}
    </>
  )
}

export default Carts;
