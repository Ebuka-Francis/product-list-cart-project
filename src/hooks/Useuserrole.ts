"use client";

import { useAuth } from "@/hooks/useAuth";

export function useUserRole() {
  const { user, loading } = useAuth();
  return { role: user?.role ?? null, loading };
}