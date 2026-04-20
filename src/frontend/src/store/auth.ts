import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  principal: string | null;
  isAuthenticated: boolean;
  setPrincipal: (principal: string | null) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      principal: null,
      isAuthenticated: false,
      setPrincipal: (principal) => set({ principal }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      logout: () => set({ principal: null, isAuthenticated: false }),
    }),
    {
      name: "bbi-auth",
      partialize: (state) => ({
        principal: state.principal,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
