"use client";

import Image from "next/image";
import { Calendar, Crown, MapPin } from "lucide-react";
import { Vendor } from "@/types/types";
import AddressCard from "./AddressCard";
import StatPill from "./StatPill";
import Link from "next/link";

interface VendorProfileViewProps {
  vendor: Partial<Vendor>;
  onEdit: () => void;
}

function formatDate(value: unknown): string | null {
  if (!value) return null;
  const asAny = value as { toDate?: () => Date };
  const d = typeof asAny?.toDate === "function" ? asAny.toDate() : new Date(value as string);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function VendorProfileView({ vendor, onEdit }: VendorProfileViewProps) {
  const memberSince = formatDate(vendor.createdAt);
  const subscription = vendor.subscription;

  return (
    <div className="min-h-screen bg-[#faf3ea] pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f120c] via-[#4a2c1a] to-[#c8632a] px-6 py-8">
        <button
          onClick={onEdit}
          className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#3a2418] shadow-sm transition hover:bg-[#faf3ea]"
        >
          Edit Profile
        </button>

        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-[#faf3ea] bg-white">
            {vendor.logo ? (
              <Image src={vendor.logo} alt={vendor.businessName ?? "Vendor"} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl text-[#c8632a]">
                {vendor.businessName?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#f5a572]">Vendor</p>
            <h1
              className="mt-0.5 text-2xl font-bold text-[#f5e6c8]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {vendor.businessName || "Your kitchen"}
            </h1>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#f5e6c8]/80">
              {vendor.ownerName && <span>{vendor.ownerName}</span>}
              {vendor.address?.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} />
                  {[vendor.address.city, vendor.address.country].filter(Boolean).join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Stats — only real fields we have */}
        <div className="-mt-6 mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {memberSince && <StatPill icon={Calendar} label="Vendor since" value={memberSince} />}
          {subscription && <StatPill icon={Crown} label="Plan" value={subscription.plan} />}
        </div>

        {vendor.description && (
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
              About
            </h2>
            <p className="text-sm text-[#3a2418]">{vendor.description}</p>
          </div>
        )}

        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
            Business address
          </h2>
          {vendor.address ? (
            <AddressCard
              address={{
                id: "primary",
                label: vendor.address.label,
                street: vendor.address.street,
                city: vendor.address.city,
                country: vendor.address.country,
              }}
            />
          ) : (
            <p className="py-4 text-sm text-[#a68a72]">No address added yet.</p>
          )}
        </div>

        {subscription && (
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
              Subscription
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#3a2418]">{subscription.plan} plan</p>
                <p className="text-xs capitalize text-[#a68a72]">{subscription.status}</p>
              </div>
              <button
                onClick={onEdit}
                className="rounded-xl border border-[#e4d3c0] px-4 py-2 text-xs font-semibold text-[#3a2418] transition hover:border-[#c8632a]/40"
              >
                Manage
              </button>
            </div>
          </div>
        )}

        {/* Promo */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#fbe4cf] p-6 sm:flex-row sm:items-center">
          <div>
            <h3
              className="font-bold text-[#3a2418]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Grow your food business
            </h3>
            <p className="mt-1 text-xs text-[#a68a72]">Add more meals and reach more customers.</p>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-xl bg-[#c8632a] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#b3551f]"
          >
            + Add New Meal
          </Link>
        </div>
      </div>
    </div>
  );
}