"use client";

import React, { useState, useEffect } from "react";
import FoodContainer from "../foodcomp";
//@ts-ignore
import "./foodItems.css";
import { CartProduct } from "@/types/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FoodItemsComp() {
  const [meals, setMeals] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "meals"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: CartProduct[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CartProduct, "id">),
      }));
      setMeals(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6 mt-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="bg-gray-200 h-[200px] w-full" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Override card-image to be uniform height & cover across all cards */}
      <style>{`
        .food-card-wrapper .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          border-radius: 7px;
        }
      `}</style>

     <div className="grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-6 mt-4">
        {meals.map((item, idx) => (
          <div
            key={idx}
            className="food-card-wrapper border border-gray-200 rounded-xl overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
          >
            <FoodContainer
              id={item.id}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
              name={item.name}
              description={item.description}
              price={item.price}
              category={item.category}
              product={item}
              completed={item.completed}
              place={item.place}
            />
          </div>
        ))}
      </div>
    </>
  );
}