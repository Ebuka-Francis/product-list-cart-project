"use client";

import React, { useState } from "react";
import FoodItemsComp from "../fooditems";
import AddMealModal from "../modals/AddMealModal";

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMealAdded = () => {
    // onSnapshot already handles real-time updates,
    // but this can be used to trigger any extra UI feedback
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-[700px] w-full">
      <div className="flex justify-between sm:mb-4 mb-8 items-center">
        <h1 className="text-black font-sans font-bold text-4xl">Desserts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-[1px] border-[#c73a0f] text-black px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#c73a0f] hover:text-white transition-colors duration-200"
        >
          + Add meals
        </button>
      </div>

      <FoodItemsComp key={refreshKey} />

      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMealAdded={handleMealAdded}
      />
    </div>
  );
}

export default Hero;