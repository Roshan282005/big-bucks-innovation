import { create } from "zustand";

interface AuthState {
  uid: string | null;
  userEmail: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  setUid: (uid: string | null) => void;
  setUserData: (email: string, name: string) => void;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  uid: null,
  userEmail: null,
  userName: null,
  isAuthenticated: false,
  setUid: (uid) => set({ uid }),
  setUserData: (email, name) => set({ userEmail: email, userName: name }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  logout: () =>
    set({
      uid: null,
      userEmail: null,
      userName: null,
      isAuthenticated: false,
    }),
}));
