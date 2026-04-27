import { apiClient } from "@/lib/api";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "sonner";

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
}

export function useEmailSignIn() {
  const { setAuthenticated, setUid, setUserData } = useAuthStore();

  return useMutation({
    mutationFn: async ({ email, password }: SignInCredentials) => {
      if (!auth) {
        throw new Error(
          "Firebase is not configured. Please set VITE_FIREBASE_* environment variables.",
        );
      }
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const idToken = await user.getIdToken();
      await apiClient.post("/api/auth/session", { idToken });

      setUid(user.uid);
      setUserData(user.email ?? "", user.displayName ?? "");
      setAuthenticated(true);

      toast.success(`Welcome back ${user.displayName ?? user.email}!`);
    },
    onError: (err: Error) => toast.error(`Login failed: ${err.message}`),
  });
}

export function useEmailSignUp() {
  const { setAuthenticated, setUid, setUserData } = useAuthStore();

  return useMutation({
    mutationFn: async ({ email, password, name }: SignUpCredentials) => {
      if (!auth) {
        throw new Error(
          "Firebase is not configured. Please set VITE_FIREBASE_* environment variables.",
        );
      }
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = result.user;

      await updateProfile(user, { displayName: name });

      const idToken = await user.getIdToken();
      await apiClient.post("/api/auth/session", { idToken });

      setUid(user.uid);
      setUserData(user.email ?? "", name);
      setAuthenticated(true);

      toast.success("Account created successfully!");
    },
    onError: (err: Error) => toast.error(`Registration failed: ${err.message}`),
  });
}
