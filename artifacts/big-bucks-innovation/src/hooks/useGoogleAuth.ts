import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export function useGoogleSignIn() {
  const { setAuthenticated, setUid, setUserData } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (!auth || !googleProvider) {
        throw new Error(
          "Firebase is not configured. Please set VITE_FIREBASE_* environment variables.",
        );
      }
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      await apiClient.post("/api/auth/session", { idToken });

      setUid(result.user.uid);
      setUserData(result.user.email ?? "", result.user.displayName ?? "");
      setAuthenticated(true);
      toast.success(`Welcome ${result.user.displayName}!`);
    },
    onError: (err: Error) => toast.error(`Auth failed: ${err.message}`),
  });
}

export function useGoogleSignOut() {
  const { logout } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/api/auth/logout");
      if (auth) await signOut(auth);
      logout();
    },
    onSuccess: () => toast.success("Signed out successfully"),
  });
}
