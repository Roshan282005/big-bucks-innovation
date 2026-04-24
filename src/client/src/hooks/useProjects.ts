import { apiClient } from "@/lib/api";
import type { Project, ProjectStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const PROJECTS_KEY = ["projects"] as const;

export function useProjects(statusFilter: ProjectStatus | null = null) {
  return useQuery<Project[]>({
    queryKey: [...PROJECTS_KEY, statusFilter],
    queryFn: async () => {
      const params = statusFilter ? `?status=${statusFilter}` : "";
      return apiClient.get(`/api/projects${params}`);
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, Omit<Project, "id" | "createdAt">>({
    mutationFn: (payload) => apiClient.post("/api/projects", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      toast.success("Project created successfully");
    },
    onError: () => toast.error("Failed to create project"),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, { id: string; payload: Partial<Project> }>({
    mutationFn: ({ id, payload }) => apiClient.put(`/api/projects/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      toast.success("Project updated successfully");
    },
    onError: () => toast.error("Failed to update project"),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete(`/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      toast.success("Project deleted");
    },
    onError: () => toast.error("Failed to delete project"),
  });
}
