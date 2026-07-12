"use client";

import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import useBearStore from "@/store/stateManagement";// adjust to your actual store path

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const carts = useBearStore((state) => state.carts);
  const addItemToCart = useBearStore((state) => state.addItemToCart);
  const decrementItemQuantity = useBearStore((state) => state.decrementItemQuantity);
  const removeItemFromCart = useBearStore((state) => state.removeItemFromCart);
  const clearCart = useBearStore((state) => state.clearCart);

  // NOTE: adjust `item.name`, `item.price`, `item.image` below to match
  // whatever fields your Product/CartProduct type actually uses.
  const total = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-[#faf3ea] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e4d3c0] px-5 py-4">
          <h2 className="text-lg font-bold text-[#3a2418]">Your Cart ({carts.length})</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#3a2418] transition hover:bg-[#f0e0cc]"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {carts.length === 0 ? (
            <p className="mt-10 text-center text-sm text-[#a68a72]">
              Your added items will appear here
            </p>
          ) : (
            <ul className="space-y-4">
              {carts.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#f5f2ee] text-xs text-[#a68a72]">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#3a2418]">{item.name}</p>
                    <p className="text-xs text-[#a68a72]">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementItemQuantity(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e4d3c0] text-[#3a2418] transition hover:bg-[#f0e0cc]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-4 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => addItemToCart(item)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e4d3c0] text-[#3a2418] transition hover:bg-[#f0e0cc]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-[#c8632a] transition hover:text-[#b3551f]"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {carts.length > 0 && (
          <div className="border-t border-[#e4d3c0] px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#3a2418]">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <button className="w-full rounded-xl bg-[#c8632a] py-3 text-sm font-semibold text-white transition hover:bg-[#b3551f]">
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="mt-2 w-full text-center text-xs text-[#a68a72] hover:underline"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}