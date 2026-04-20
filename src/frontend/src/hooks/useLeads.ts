import { LeadStatus } from "@/backend";
import type {
  CreateLeadPayload,
  LeadPublic,
  UpdateLeadPayload,
} from "@/backend";
import { useActor } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { LeadPublic, CreateLeadPayload, UpdateLeadPayload };
export { LeadStatus };

const LEADS_KEY = ["leads"] as const;

export function useLeads(statusFilter: LeadStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<LeadPublic[]>({
    queryKey: [...LEADS_KEY, statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listLeads(
        statusFilter,
        BigInt(0),
        BigInt(100),
      );
      return result.items;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<LeadPublic, Error, CreateLeadPayload>({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createLead(payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LEADS_KEY }),
  });
}

export function useUpdateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: bigint; payload: UpdateLeadPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateLead(id, payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LEADS_KEY }),
  });
}

export function useDeleteLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteLead(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LEADS_KEY }),
  });
}
