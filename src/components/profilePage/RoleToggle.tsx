"use client";

import { Store, ShoppingBag } from "lucide-react";

interface RoleToggleProps {
  onChange: (role: "customer" | "vendor") => void;
}

export default function RoleToggle({ onChange }: RoleToggleProps) {
  return (
    <div className="w-full max-w-sm space-y-3">
      <button
        onClick={() => onChange("customer")}
        className="flex w-full items-center gap-4 rounded-2xl border border-[#e4d3c0] bg-white px-4 py-4 text-left transition hover:border-[#c8632a]/40"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a]">
          <ShoppingBag size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#3a2418]">Customer</p>
          <p className="text-xs text-[#a68a72]">Browse meals and add to cart</p>
        </div>
      </button>

      <button
        onClick={() => onChange("vendor")}
        className="flex w-full items-center gap-4 rounded-2xl border border-[#e4d3c0] bg-white px-4 py-4 text-left transition hover:border-[#c8632a]/40"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a]">
          <Store size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#3a2418]">Vendor</p>
          <p className="text-xs text-[#a68a72]">List and sell your meals</p>
        </div>
      </button>
    </div>
  );
}