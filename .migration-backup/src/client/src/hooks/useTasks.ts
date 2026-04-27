import { apiClient } from "@/lib/api";
import type { Task, TaskStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TASKS_KEY = ["tasks"] as const;

export function useTasks(statusFilter: TaskStatus | null = null) {
  return useQuery<Task[]>({
    queryKey: [...TASKS_KEY, statusFilter],
    queryFn: async () => {
      const params = statusFilter ? `?status=${statusFilter}` : "";
      return apiClient.get(`/api/tasks${params}`);
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, Omit<Task, "id" | "createdAt">>({
    mutationFn: (payload) => apiClient.post("/api/tasks", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task created successfully");
    },
    onError: () => toast.error("Failed to create task"),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, { id: string; payload: Partial<Task> }>({
    mutationFn: ({ id, payload }) => apiClient.put(`/api/tasks/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task updated successfully");
    },
    onError: () => toast.error("Failed to update task"),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete(`/api/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task deleted");
    },
    onError: () => toast.error("Failed to delete task"),
  });
}
