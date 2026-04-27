import { useEffect } from "react";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

interface SessionUser {
  uid: string;
  email?: string;
}

export function AuthRehydrator({ children }: { children: React.ReactNode }) {
  const { setAuthenticated, setUid, setUserData, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) return;

    apiClient
      .get("/api/auth/me")
      .then((user: SessionUser) => {
        if (user?.uid) {
          setUid(user.uid);
          setUserData(user.email ?? "", "");
          setAuthenticated(true);
        }
      })
      .catch(() => {
        // No valid session — stay logged out, no action needed
      });
  }, [isAuthenticated, setAuthenticated, setUid, setUserData]);

  return <>{children}</>;
}
