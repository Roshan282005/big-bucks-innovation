import { apiClient } from "@/lib/api";
import type { Client, ClientStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const CLIENTS_KEY = ["clients"] as const;

export function useClients(statusFilter: ClientStatus | null = null) {
  return useQuery<Client[]>({
    queryKey: [...CLIENTS_KEY, statusFilter],
    queryFn: async () => {
      const params = statusFilter ? `?status=${statusFilter}` : "";
      return apiClient.get(`/api/clients${params}`);
    },
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, Omit<Client, "id" | "createdAt">>({
    mutationFn: (payload) => apiClient.post("/api/clients", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
      toast.success("Client created successfully");
    },
    onError: () => toast.error("Failed to create client"),
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, { id: string; payload: Partial<Client> }>({
    mutationFn: ({ id, payload }) =>
      apiClient.put(`/api/clients/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
      toast.success("Client updated successfully");
    },
    onError: () => toast.error("Failed to update client"),
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete(`/api/clients/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
      toast.success("Client deleted");
    },
    onError: () => toast.error("Failed to delete client"),
  });
}
