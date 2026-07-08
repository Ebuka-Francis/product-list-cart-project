"use client";

import Image from "next/image";

export const formatDollars = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

import React from "react";
import useBearStore from "@/store/stateManagement";
import { CartProduct } from "@/types/types";

const ACCENT = "#D4631A";
const ACCENT_LIGHT = "#F5EDE0";
const DARK = "#1C1109";

const FoodContainer: React.FC<CartProduct> = ({
  id,
  name,
  imageUrl,
  price,
  product,
  category,
  completed,
  place,
}) => {
  const { carts, setToggle } = useBearStore();
  const addToCart = useBearStore((state) => state.addItemToCart);
  const decreament = useBearStore((state) => state.decrementItemQuantity);

  const cartItem = carts.find((item) => item.id === id);

  const handleAdd = () => {
    setToggle(id);
    if (product) addToCart(product);
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden">
      {/* ── Image block ── */}
      <div className="relative overflow-hidden" style={{ borderRadius: "14px 14px 0 0" }}>
        {/* Quantity badge (top-right) */}
        {completed && cartItem && cartItem.quantity > 0 && (
          <div
            className="absolute top-2 right-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: ACCENT }}
          >
            ×{cartItem.quantity}
          </div>
        )}

        {/* Image with terracotta ring when in cart */}
        <div
          className="overflow-hidden"
          style={{
            outline: completed ? `2.5px solid ${ACCENT}` : "none",
            outlineOffset: "-2px",
            borderRadius: "14px 14px 0 0",
          }}
        >
          <Image
            src={imageUrl ?? "/placeholder.png"}
            alt={name}
            className="card-image"
            width={300}
            height={300}
            priority
            style={{ borderRadius: 0 }}
          />
        </div>

        {/* ── Add to cart / counter pill (overlapping bottom) ── */}
        {completed ? (
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] flex items-center justify-evenly gap-2 z-10"
            style={{
              width: "148px",
              height: "44px",
              background: ACCENT,
              borderRadius: "100px",
              boxShadow: `0 4px 16px ${ACCENT}55`,
              color: "white",
            }}
          >
            <button
              onClick={() => decreament(id)}
              className="flex items-center justify-center rounded-full border border-white"
              style={{ width: "22px", height: "22px" }}
              aria-label="Decrease"
            >
              <Image
                src="/icon-decrement-quantity.svg"
                alt="Decrease"
                width={12}
                height={12}
              />
            </button>
            <span className="font-bold tabular-nums text-base">
              {cartItem?.quantity ?? 0}
            </span>
            <button
              onClick={handleAdd}
              className="flex items-center justify-center rounded-full border border-white"
              style={{ width: "22px", height: "22px" }}
              aria-label="Increase"
            >
              <Image
                src="/icon-increment-quantity.svg"
                alt="Increase"
                width={12}
                height={12}
              />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] flex items-center justify-center gap-2 z-10 font-semibold text-sm transition-all duration-200 group"
            style={{
              width: "148px",
              height: "44px",
              background: "white",
              borderRadius: "100px",
              border: `1px solid #EDE0D0`,
              color: DARK,
              boxShadow: "0 2px 10px rgba(28,17,9,0.1)",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = ACCENT;
              btn.style.color = "white";
              btn.style.border = `1px solid ${ACCENT}`;
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "white";
              btn.style.color = DARK;
              btn.style.border = "1px solid #EDE0D0";
            }}
          >
            <Image
              src="/icon-add-to-cart.svg"
              alt="Add to Cart"
              width={18}
              height={18}
              style={{ width: "auto", height: "auto" }}
            />
            Add to cart
          </button>
        )}
      </div>

      {/* ── Text block ── */}
      <div
        className="flex flex-col gap-1 px-4 pb-4"
        style={{ paddingTop: "30px" }}
      >
        {/* Category badge */}
        <span
          className="self-start text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: ACCENT_LIGHT, color: ACCENT }}
        >
          {category}
        </span>

        {/* Meal name */}
        <h2
          className="text-sm font-bold leading-snug line-clamp-1 mt-1"
          style={{ color: DARK }}
        >
          {name}
        </h2>

        {/* Price + location row */}
        <div className="flex items-center justify-between mt-1">
          <p
            className="font-bold text-base tracking-tight"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              color: ACCENT,
            }}
          >
            ₦{Number(price).toLocaleString()}
          </p>

          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill={ACCENT}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span
              className="text-[11px] font-medium truncate max-w-[80px]"
              style={{ color: "#A07050" }}
            >
              {place}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodContainer;