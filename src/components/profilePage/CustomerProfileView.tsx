"use client";

import Image from "next/image";
import { Mail, Phone, Calendar, MapPin } from "lucide-react";
import { AppUser} from "@/types/types";
import AddressCard from "./AddressCard";
import StatPill from "./StatPill";
import Link from "next/link";

interface CustomerProfileViewProps {
  appUser: Partial<AppUser>;
  onEdit: () => void;
}

function formatMemberSince(value: unknown): string | null {
  if (!value) return null;
  const asAny = value as { toDate?: () => Date };
  const d = typeof asAny?.toDate === "function" ? asAny.toDate() : new Date(value as string);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function CustomerProfileView({ appUser, onEdit }: CustomerProfileViewProps) {
  const memberSince = formatMemberSince(appUser.createdAt);

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
            {appUser.profileImage ? (
              <Image src={appUser.profileImage} alt={appUser.fullName ?? "Profile"} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl text-[#c8632a]">
                {appUser.fullName?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#f5a572]">Welcome back</p>
            <h1
              className="mt-0.5 text-2xl font-bold text-[#f5e6c8]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {appUser.fullName || "Your profile"}
            </h1>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#f5e6c8]/80">
              {appUser.email && (
                <span className="flex items-center gap-1.5">
                  <Mail size={12} />
                  {appUser.email}
                </span>
              )}
              {appUser.phoneNumber && (
                <span className="flex items-center gap-1.5">
                  <Phone size={12} />
                  {appUser.phoneNumber}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-[35px]">
        {/* Stats — only real fields we have */}
        <div className="-mt-6 mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {memberSince && <StatPill icon={Calendar} label="Member since" value={memberSince} />}
          <StatPill icon={MapPin} label="Saved addresses" value={String(appUser.address?.length ?? 0)} />
        </div>

        {/* Addresses */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
            Saved addresses
          </h2>
          {appUser.address && appUser.address.length > 0 ? (
            appUser.address.map((addr) => <AddressCard key={addr.id} address={addr} />)
          ) : (
            <p className="py-4 text-sm text-[#a68a72]">No addresses saved yet.</p>
          )}
          <button
            onClick={onEdit}
            className="mt-3 w-full rounded-xl border border-dashed border-[#e4d3c0] py-2.5 text-xs font-semibold text-[#c8632a] transition hover:border-[#c8632a]/50"
          >
            + Add or edit address
          </button>
        </div>

        {/* Promo */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#fbe4cf] p-6 sm:flex-row sm:items-center">
          <div>
            <h3
              className="font-bold text-[#3a2418]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Craving something new?
            </h3>
            <p className="mt-1 text-xs text-[#a68a72]">Explore meals from home cooks near you.</p>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-xl bg-[#c8632a] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#b3551f]"
          >
            Explore meals
          </Link>
        </div>
      </div>
    </div>
  );
}