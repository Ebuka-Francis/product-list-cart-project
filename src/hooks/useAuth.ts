"use client";

import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, loading } = useAuthStore();
  return { user, loading };
}