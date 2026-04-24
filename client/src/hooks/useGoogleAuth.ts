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
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Exchange Firebase token for HttpOnly session cookie
      await apiClient.post("/auth/session", { idToken });

      setUid(result.user.uid);
      setUserData(result.user.email || "", result.user.displayName || "");
      setAuthenticated(true);
      toast.success(`Welcome ${result.user.displayName}!`);
    },
    onError: (err) => toast.error(`Auth failed: ${err.message}`),
  });
}

export function useGoogleSignOut() {
  const { logout } = useAuthStore();
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
      await signOut(auth);
      logout();
    },
    onSuccess: () => toast.success("Signed out successfully"),
  });
  return signOutMutation;
}

