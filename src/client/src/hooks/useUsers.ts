import { useCurrentUser } from "@/hooks/useGoogleAuth";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export function useMe() {
  return useQuery<UserProfile | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        return await apiClient.get("/auth/me");
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5min
  });
}

export function useFirebaseUser() {
  const user = useCurrentUser();
  const { isAuthenticated } = useAuthStore();
  return { user, isAuthenticated };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      return apiClient.put("/api/users/me", { name, email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Profile saved!");
    },
    onError: () => toast.error("Failed to save profile"),
  });
}
