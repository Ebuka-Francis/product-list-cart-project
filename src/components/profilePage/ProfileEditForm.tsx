"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { AppUser, Gender, SubscriptionPlan, Vendor } from "@/types/types";
import SubscriptionPlans from "../subscription";
import { Camera } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "profiles");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url as string;
}

interface ProfileEditFormProps {
  role: "customer" | "vendor";
  appUser: Partial<AppUser> | null;
  vendor: Partial<Vendor> | null;
  onSaved: () => void;
  onCancel?: () => void;
}

export default function ProfileEditForm({
  role,
  appUser,
  vendor,
  onSaved,
  onCancel,
}: ProfileEditFormProps) {
  const { user } = useAuth();

  const existingAddr = appUser?.address?.[0] ?? vendor?.address;

  const [fullName, setFullName] = useState(appUser?.fullName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(appUser?.phoneNumber ?? "");
  const [gender, setGender] = useState<Gender | "">(appUser?.gender ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(appUser?.dateOfBirth ?? "");
  const [label, setLabel] = useState(existingAddr?.label ?? "Home");
  const [street, setStreet] = useState(existingAddr?.street ?? "");
  const [city, setCity] = useState(existingAddr?.city ?? "");
  const [country, setCountry] = useState(existingAddr?.country ?? "");

  const [businessName, setBusinessName] = useState(vendor?.businessName ?? "");
  const [ownerName, setOwnerName] = useState(vendor?.ownerName ?? "");
  const [description, setDescription] = useState(vendor?.description ?? "");
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | undefined>(
    vendor?.subscription?.plan
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    appUser?.profileImage ?? vendor?.logo ?? null
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError("");

    if (!fullName.trim() || !phoneNumber.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    if (role === "vendor" && !businessName.trim()) {
      setError("Please add your business name.");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = imagePreview && !imageFile ? imagePreview : undefined;
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const now = new Date();

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: fullName.trim(),
          email: user.email,
          phoneNumber: phoneNumber.trim(),
          role,
          ...(gender ? { gender } : {}),
          ...(dateOfBirth ? { dateOfBirth } : {}),
          ...(imageUrl ? { profileImage: imageUrl } : {}),
          address: [
            {
              id: "primary",
              label: label.trim() || "Home",
              street: street.trim(),
              city: city.trim(),
              country: country.trim(),
            },
          ],
          updatedAt: now,
        },
        { merge: true }
      );

      if (role === "vendor") {
        await setDoc(
          doc(db, "vendors", user.uid),
          {
            businessName: businessName.trim(),
            ownerName: ownerName.trim() || fullName.trim(),
            email: user.email,
            phoneNumber: phoneNumber.trim(),
            ...(imageUrl ? { logo: imageUrl } : {}),
            description: description.trim(),
            address: {
              id: "primary",
              label: label.trim() || "Home",
              street: street.trim(),
              city: city.trim(),
              country: country.trim(),
            },
            updatedAt: now,
          },
          { merge: true }
        );
      }

      onSaved();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-[#3a2418]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {appUser || vendor ? "Edit profile" : "Complete your profile"}
        </h1>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-[#a68a72] hover:text-[#3a2418]"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mb-6 flex justify-center">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#e4d3c0] bg-[#faf3ea] hover:border-[#c8632a]/50"
        >
          {imagePreview ? (
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
          ) : (
            <span className="text-2xl">📷</span>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <Camera size={18} className="text-white" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
            Personal details
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
            {role === "vendor" ? "Business address" : "Delivery address"}
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label (e.g. Home, Office)"
              className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
            />
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street address"
              className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              />
            </div>
          </div>
        </div>

        {role === "vendor" && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#a68a72]">
              Business details
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business name (e.g. Mama Cass Kitchen)"
                className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              />
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Owner name (defaults to your full name)"
                className="w-full rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell customers what makes your kitchen special"
                rows={3}
                className="w-full resize-none rounded-xl border border-[#e4d3c0] bg-[#faf3ea] px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              />
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-[#c8632a] py-3.5 text-sm font-semibold text-white transition hover:bg-[#b3551f] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
      </form>

      {role === "vendor" && user && (
        <div className="mt-10 border-t border-[#e4d3c0] pt-8">
          <SubscriptionPlans
            vendorId={user.uid}
            currentPlan={currentPlan}
            onSubscribed={(plan) => setCurrentPlan(plan)}
          />
        </div>
      )}
    </div>
  );
}