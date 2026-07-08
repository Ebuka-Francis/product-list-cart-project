"use client";

import React, { useState, useEffect } from "react";
import FoodContainer from "../foodcomp";
import { CartProduct } from "@/types/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FoodItemsCompProps {
  activeCategory?: string;
  search?: string;
}

export default function FoodItemsComp({
  activeCategory = "All",
  search = "",
}: FoodItemsCompProps) {
  const [meals, setMeals] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "meals"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: CartProduct[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CartProduct, "id">),
        }));
        setMeals(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore meals listener failed:", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Filter by category and search
  const filtered = meals.filter((meal) => {
    const matchesCategory =
      activeCategory === "All" ||
      meal.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      !search ||
      meal.name?.toLowerCase().includes(search.toLowerCase()) ||
      meal.place?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{ background: "white", boxShadow: "0 2px 8px rgba(28,17,9,0.06)" }}
          >
            <div className="h-[150px] w-full" style={{ background: "#EDE0D0" }} />
            <div className="p-4 space-y-2">
              <div className="h-3 rounded-full w-1/3" style={{ background: "#EDE0D0" }} />
              <div className="h-4 rounded-full w-3/4" style={{ background: "#EDE0D0" }} />
              <div className="flex justify-between mt-3">
                <div className="h-4 rounded-full w-1/4" style={{ background: "#EDE0D0" }} />
                <div className="h-4 rounded-full w-1/4" style={{ background: "#EDE0D0" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl mb-4">🍽</span>
        <p className="font-semibold text-base" style={{ color: "#1C1109" }}>
          No meals found
        </p>
        <p className="text-sm mt-1" style={{ color: "#A07050" }}>
          {search ? `No results for "${search}"` : "Nothing in this category yet"}
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .food-card-wrapper .card-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
          display: block;
        }
      `}</style>
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="food-card-wrapper rounded-2xl overflow-visible transition-all duration-200"
            style={{
              background: "white",
              boxShadow: "0 2px 8px rgba(28,17,9,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 8px 28px rgba(28,17,9,0.12)";
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 2px 8px rgba(28,17,9,0.06)";
              (e.currentTarget as HTMLDivElement).style.transform = "none";
            }}
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