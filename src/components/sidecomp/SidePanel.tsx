"use client";

import Image from "next/image";
import { User, ShoppingCart } from "lucide-react";
import useBearStore from "@/store/stateManagement";// adjust to your actual store path
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// Dummy data for now — swap for Firestore later


interface SidePanelProps {
  onCartClick: () => void;
}

export default function SidePanel({ onCartClick }: SidePanelProps) {
      const { user } = useAuth();
  const carts = useBearStore((state) => state.carts);
  const cartCount = carts.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="sticky top-6  w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-sm">
      {/* Top bar: profile + cart */}
      {user && (
      <div className="flex items-center justify-between border-b border-[#f0e6d8] px-5 py-4">
        <Link href="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a] transition hover:bg-[#f0e0cc]"
          aria-label="Profile"
        >
          <User size={18} />
        </Link>

        <button
          onClick={onCartClick}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a] transition hover:bg-[#f0e0cc]"
          aria-label="Open cart"
        >
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c8632a] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      )}

      {/* Mini apartment ads list */}
      <div>
      <Image src="/meal-app-sidebanner.png" alt="Side Banner" width={300} height={200} className="w-full rounded-lg" />
      </div>
    </div>
  );
}