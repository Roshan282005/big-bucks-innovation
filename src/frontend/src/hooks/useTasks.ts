import { TaskStatus } from "@/backend";
import type {
  CreateTaskPayload,
  TaskPublic,
  UpdateTaskPayload,
} from "@/backend";
import { useActor } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { TaskPublic, CreateTaskPayload, UpdateTaskPayload };
export { TaskStatus };

const TASKS_KEY = ["tasks"] as const;

export function useTasks(statusFilter: TaskStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<TaskPublic[]>({
    queryKey: [...TASKS_KEY, statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listTasks(
        statusFilter,
        BigInt(0),
        BigInt(100),
      );
      return result.items;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<TaskPublic, Error, CreateTaskPayload>({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createTask(payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useUpdateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: bigint; payload: UpdateTaskPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTask(id, payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useDeleteTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteTask(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}
