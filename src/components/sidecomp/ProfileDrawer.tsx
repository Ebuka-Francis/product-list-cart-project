"use client";

import { useEffect, useState } from "react";
import { X, Store, ShoppingBag, Check } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

type Role = "vendor" | "customer";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const { user } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;

    const fetchRole = async () => {
      setLoading(true);
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().role) {
        setRole(snap.data().role as Role);
      }
      setLoading(false);
    };

    fetchRole();
  }, [isOpen, user]);

  const handleSelectRole = async (selected: Role) => {
    if (!user) return;
    setRole(selected);
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { role: selected, email: user.email },
        { merge: true }
      );
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer — slides from the left */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-[#faf3ea] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e4d3c0] px-5 py-4">
          <h2 className="text-lg font-bold text-[#3a2418]">Your Profile</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#3a2418] transition hover:bg-[#f0e0cc]"
            aria-label="Close profile"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {!user ? (
            <p className="text-center text-sm text-[#a68a72]">
              Please log in to set up your profile.
            </p>
          ) : (
            <>
              <p className="mb-1 text-sm text-[#a68a72]">Signed in as</p>
              <p className="mb-6 truncate text-sm font-semibold text-[#3a2418]">
                {user.email}
              </p>

              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
                How will you use Chef at Home?
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleSelectRole("customer")}
                  disabled={loading || saving}
                  className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                    role === "customer"
                      ? "border-[#c8632a] bg-[#c8632a]/10"
                      : "border-[#e4d3c0] bg-white hover:border-[#c8632a]/40"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a]">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#3a2418]">Customer</p>
                    <p className="text-xs text-[#a68a72]">Browse meals and add to cart</p>
                  </div>
                  {role === "customer" && <Check size={18} className="text-[#c8632a]" />}
                </button>

                <button
                  onClick={() => handleSelectRole("vendor")}
                  disabled={loading || saving}
                  className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                    role === "vendor"
                      ? "border-[#c8632a] bg-[#c8632a]/10"
                      : "border-[#e4d3c0] bg-white hover:border-[#c8632a]/40"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf3ea] text-[#c8632a]">
                    <Store size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#3a2418]">Vendor</p>
                    <p className="text-xs text-[#a68a72]">List and add meals for sale</p>
                  </div>
                  {role === "vendor" && <Check size={18} className="text-[#c8632a]" />}
                </button>
              </div>

              {saving && (
                <p className="mt-4 text-center text-xs text-[#a68a72]">Saving...</p>
              )}
              {saved && !saving && (
                <p className="mt-4 text-center text-xs text-[#c8632a]">Saved ✓</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}