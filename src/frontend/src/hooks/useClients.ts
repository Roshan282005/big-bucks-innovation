import { ClientStatus } from "@/backend";
import type {
  ClientPublic,
  CreateClientPayload,
  UpdateClientPayload,
} from "@/backend";
import { useActor } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type { ClientPublic, CreateClientPayload, UpdateClientPayload };
export { ClientStatus };

const CLIENTS_KEY = ["clients"] as const;

export function useClients(statusFilter: ClientStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<ClientPublic[]>({
    queryKey: [...CLIENTS_KEY, statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listClients(
        statusFilter,
        BigInt(0),
        BigInt(100),
      );
      return result.items;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<ClientPublic, Error, CreateClientPayload>({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createClient(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
      toast.success("Client created successfully");
    },
    onError: () => toast.error("Failed to create client"),
  });
}

export function useUpdateClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: bigint; payload: UpdateClientPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateClient(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
      toast.success("Client updated successfully");
    },
    onError: () => toast.error("Failed to update client"),
  });
}

export function useDeleteClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteClient(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
      toast.success("Client deleted");
    },
    onError: () => toast.error("Failed to delete client"),
  });
}
