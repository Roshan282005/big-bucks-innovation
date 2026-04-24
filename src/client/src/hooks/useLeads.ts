import { apiClient } from "@/lib/api";
import type { Lead, LeadStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface LeadPublic extends Omit<Lead, "id" | "createdAt" | "updatedAt"> {
  id: string;
  created_at: string;
  updated_at: string;
}

export type CreateLeadPayload = Omit<Lead, "id" | "createdAt" | "updatedAt">;
export type UpdateLeadPayload = Partial<CreateLeadPayload>;

const LEADS_KEY = ["leads"] as const;

export function useLeads(statusFilter: LeadStatus | null = null) {
  return useQuery<LeadPublic[]>({
    queryKey: [...LEADS_KEY, statusFilter],
    queryFn: async () => {
      const params = statusFilter ? `?status=${statusFilter}` : "";
      return apiClient.get(`/api/leads${params}`);
    },
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation<Lead, Error, Omit<Lead, "id" | "createdAt" | "updatedAt">>({
    mutationFn: (payload) => apiClient.post("/api/leads", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
      toast.success("Lead created successfully");
    },
    onError: () => toast.error("Failed to create lead"),
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation<Lead, Error, { id: string; payload: Partial<Lead> }>({
    mutationFn: ({ id, payload }) => apiClient.put(`/api/leads/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
      toast.success("Lead updated successfully");
    },
    onError: () => toast.error("Failed to update lead"),
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete(`/api/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_KEY });
      toast.success("Lead deleted");
    },
    onError: () => toast.error("Failed to delete lead"),
  });
}
