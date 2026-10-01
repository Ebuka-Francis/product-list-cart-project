import { create } from "zustand";
import { authApi } from "@/lib/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "cook" | "admin";
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),

  checkAuth: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    try {
      const { data } = await authApi.get("/me");
      set({ user: data.user, loading: false });
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authApi.post("/logout", { refreshToken });
      }
    } catch {
      // Log out locally even if the server call fails
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      set({ user: null });
    }
  },
}));