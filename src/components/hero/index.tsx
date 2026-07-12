"use client";

import Image from "next/image";
import React, { useState } from "react";
import FoodItemsComp from "../fooditems";
import AddMealModal from "../modals/AddMealModal";
import AuthModal from "../authModal";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/Useuserrole";
import { SquareMenu } from "lucide-react";

const CATEGORIES = ["All", "Desserts", "Main Course", "Drinks", "Snacks"];

function Hero() {
 const { user, loading } = useAuth();
 const { role, loading: roleLoading } = useUserRole();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  const handleMealAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full">
          <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => {
          // runs after a successful login/signup/google auth
          console.log("logged in!");
        }}
      />
      {/* ── Dark Hero Banner ── */}
      <div
        className="rounded-none lg:rounded-2xl overflow-hidden mb-6"
        style={{
          background: "linear-gradient(135deg, #2C1F10 0%, #5A3218 60%, #8B4A1E 100%)",
        }}
      >
        {/* Top bar: title + add button */}
      <div className="flex items-center justify-between px-6 pt-6 pb-0">
        <div className="flex items-center gap-3">
          <Image src="/meals-logo.png" alt="Hero Image" width={70} height={70} className="rounded-[50%]" />

          <h1
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              color: "#F5E6C8",
              fontSize: "clamp(24px, 4vw, 34px)",
            }}
          >
            What are you<br />craving today?
          </h1>
        </div>

   {!loading && !roleLoading && (
  user ? (
    role === "vendor" ? (
      <button
        onClick={() => setIsModalOpen(true)}
        className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
        style={{
          border: "1.5px dashed #D4631A",
          background: "rgba(212, 99, 26, 0.1)",
          color: "#F5A572",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4631A";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(212, 99, 26, 0.1)";
          e.currentTarget.style.color = "#F5A572";
        }}
      >
        + Add meals
      </button>
    ) : null
  ) : (
    <button
      onClick={() => setAuthOpen(true)}
      className="rounded-full bg-[#c8632a] px-4 py-2 text-sm font-semibold text-white"
    >
      Login
    </button>
  )
)}
<div className="block shrink-0 rounded-full md:hidden p-2 text-white transition hover:bg-[#b3551f]">
  <SquareMenu />
</div>
      </div>

        {/* Search bar */}
        <div className="px-6 py-5">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A07050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search meals, kitchens…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#F5E6C8" }}
            />
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="flex flex-wrap gap-2 mb-5 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeCategory === cat ? "#1C1109" : "white",
              color: activeCategory === cat ? "#F5E6C8" : "#6B4C30",
              boxShadow:
                activeCategory === cat
                  ? "none"
                  : "0 1px 3px rgba(0,0,0,0.08)",
              border: "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Section Heading ── */}
      <div className="mb-4 px-1">
        <h2
          className="font-bold"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            color: "#1C1109",
            fontSize: "22px",
          }}
        >
          {activeCategory === "All" ? "All Meals" : activeCategory}
        </h2>
      </div>

      {/* ── Food Grid ── */}
      <FoodItemsComp
        key={refreshKey}
        activeCategory={activeCategory}
        search={search}
      />

      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMealAdded={handleMealAdded}
      />
    </div>
  );
}

export default Hero;