import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { auth } from "@/lib/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  email: string;
  role: "admin" | "member";
}

export function useMe() {
  return useQuery<UserProfile | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        return await apiClient.get("/api/users/me");
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useFirebaseUser() {
  const { isAuthenticated, uid, userEmail } = useAuthStore();
  return { user: auth?.currentUser ?? null, isAuthenticated, uid, email: userEmail };
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
