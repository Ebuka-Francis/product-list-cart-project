"use client";

import { Home, Gift, CookingPot, Heart, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

const highlights = [
  { icon: Home, label: "For Home Cooks" },
  { icon: Gift, label: "Homemade with Care" },
  { icon: CookingPot, label: "Home Service & Delivery" },
  { icon: Heart, label: "Made with Love" },
];

export default function Footer() {
  const { user } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    await signOut(auth);
  };

  return (
    <footer className="bg-[#2b1810] px-6 py-4 fixed bottom-0 left-0 w-full z-50">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
        {highlights.map(({ icon: Icon, label }, i) => (
          <div key={label} className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#f5e6c8]">
              <Icon size={16} strokeWidth={1.75} />
              <span className="whitespace-nowrap text-xs font-medium">{label}</span>
            </div>
            {i < highlights.length - 1 && (
              <span className="hidden h-4 w-px bg-[#f5e6c8]/20 sm:block" />
            )}
          </div>
        ))}

        {user && (
          <>
            <span className="hidden h-4 w-px bg-[#f5e6c8]/20 sm:block" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-medium text-[#f5a572] transition hover:text-[#f5e6c8]"
            >
              <LogOut size={16} strokeWidth={1.75} />
              Logout
            </button>
          </>
        )}
      </div>
    </footer>
  );
}