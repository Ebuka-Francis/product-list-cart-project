"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMealAdded: () => void;
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "meals");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url as string;
}

export default function AddMealModal({ isOpen, onClose, onMealAdded }: AddMealModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<"idle" | "uploading" | "saving">("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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
    setError("");

    if (!name.trim() || !price || !place.trim() || !imageFile) {
      setError("Please fill in all fields and add a photo.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Upload image to Cloudinary
      setUploadProgress("uploading");
      const imageUrl = await uploadToCloudinary(imageFile);

      // Step 2: Save meal data to Firestore
      setUploadProgress("saving");
      await addDoc(collection(db, "meals"), {
        name: name.trim(),
        price: parseFloat(price),
        place: place.trim(),
        imageUrl,
        createdAt: serverTimestamp(),
      });

      // Reset
      setName("");
      setPrice("");
      setPlace("");
      setImageFile(null);
      setImagePreview(null);
      setUploadProgress("idle");

      onMealAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setUploadProgress("idle");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setName("");
    setPrice("");
    setPlace("");
    setImageFile(null);
    setImagePreview(null);
    setError("");
    setUploadProgress("idle");
    onClose();
  };

  const progressLabel =
    uploadProgress === "uploading"
      ? "Uploading photo..."
      : uploadProgress === "saving"
      ? "Saving meal..."
      : "Post meal 🍴";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add a Meal</h2>
            <p className="text-sm text-gray-500 mt-0.5">Share what you&apos;re eating 🍽️</p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors disabled:opacity-40"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6 space-y-4">
          {/* Image Upload Area */}
          <div>
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden group">
                <Image
                  src={imagePreview}
                  alt="Meal preview"
                  className="w-full h-full object-cover"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {!loading && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="text-white text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                {/* Camera */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 h-36 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#c73a0f]/30 bg-[#c73a0f]/5 hover:bg-[#c73a0f]/10 hover:border-[#c73a0f]/50 transition-all cursor-pointer"
                >
                  <span className="text-3xl">📷</span>
                  <span className="text-sm font-medium text-[#c73a0f]">Snap a photo</span>
                </button>

                {/* Upload */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 h-36 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer"
                >
                  <span className="text-3xl">🖼️</span>
                  <span className="text-sm font-medium text-gray-500">Upload photo</span>
                </button>
              </div>
            )}

            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>

          {/* Meal Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meal name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jollof Rice & Chicken"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/10 transition text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₦)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₦</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/10 transition text-sm"
              />
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Where did you get it?</label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="e.g. Mama Cass, Victoria Island"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#c73a0f] focus:ring-2 focus:ring-[#c73a0f]/10 transition text-sm"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#c73a0f] hover:bg-[#a82e0a] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#c73a0f]/25"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {progressLabel}
              </span>
            ) : (
              progressLabel
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}