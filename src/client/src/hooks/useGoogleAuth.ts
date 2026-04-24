import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useGoogleSignIn() {
  const { setAuthenticated, setUid, setUserData } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!user) throw new Error("No user returned from Google sign-in");

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      // Exchange for HttpOnly session cookie on our backend
      await apiClient.post("/auth/session", { idToken });

      // Update client-side display state (no secrets stored)
      setUid(user.uid);
      setUserData(user.email || "", user.displayName || "");
      setAuthenticated(true);

      toast.success(`Welcome ${user.displayName}!`);
    },
    onError: (err: Error) => toast.error(`Auth failed: ${err.message}`),
  });
}

export function useGoogleSignOut() {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
      await apiClient.post("/auth/logout");
    },
    onSuccess: () => {
      logout();
      toast.success("Signed out");
    },
  });
}

export const useCurrentUser = () => auth.currentUser;
