"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type Mode = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    resetFields();
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const friendlyError = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "That email is already registered. Try logging in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/popup-closed-by-user":
        return "";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(cred.user, { displayName: name.trim() });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess?.();
      handleClose();
    } catch (err: unknown) {
      const errorCode = err instanceof FirebaseError ? err.code : "";
      setError(friendlyError(errorCode));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess?.();
      handleClose();
    } catch (err: unknown) {
      const errorCode = err instanceof FirebaseError ? err.code : "";
      setError(friendlyError(errorCode));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl bg-[#faf3ea] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — matches the dark brown-to-terracotta gradient banner */}
        <div className="relative bg-gradient-to-r from-[#1f120c] via-[#4a2c1a] to-[#c8632a] px-6 py-8">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#f4e3d3] transition hover:bg-white/20"
            aria-label="Close"
          >
            ✕
          </button>
          <h2 className="font-serif text-2xl font-bold text-[#f4e3d3]">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-[#f4e3d3]/80">
            {mode === "login"
              ? "Log in to order your next craving"
              : "Sign up to start ordering from Chef at Home"}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-3">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#e4d3c0] bg-white px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#e4d3c0] bg-white px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full rounded-xl border border-[#e4d3c0] bg-white px-4 py-3 text-sm text-[#3a2418] placeholder:text-[#a68a72] outline-none focus:border-[#c8632a] focus:ring-1 focus:ring-[#c8632a]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#c8632a] py-3 text-sm font-semibold text-white transition hover:bg-[#b3551f] disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Log in"
                : "Sign up"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e4d3c0]" />
            <span className="text-xs text-[#a68a72]">or</span>
            <div className="h-px flex-1 bg-[#e4d3c0]" />
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e4d3c0] bg-white py-3 text-sm font-medium text-[#3a2418] transition hover:bg-[#faf3ea] disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.2 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.6-5.4l-6.3-5.3C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l6.3 5.3C40.9 36 44 30.5 44 24c0-1.2-.1-2.4-.4-3.5z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-[#7a6250]">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="font-semibold text-[#c8632a] hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}