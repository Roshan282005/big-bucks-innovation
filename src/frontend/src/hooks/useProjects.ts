import { ProjectStatus } from "@/backend";
import type {
  CreateProjectPayload,
  ProjectPublic,
  UpdateProjectPayload,
} from "@/backend";
import { useActor } from "@/lib/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { ProjectPublic, CreateProjectPayload, UpdateProjectPayload };
export { ProjectStatus };

const PROJECTS_KEY = ["projects"] as const;

export function useProjects(statusFilter: ProjectStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<ProjectPublic[]>({
    queryKey: [...PROJECTS_KEY, statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listProjects(
        statusFilter,
        BigInt(0),
        BigInt(100),
      );
      return result.items;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<ProjectPublic, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProject(payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PROJECTS_KEY }),
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: bigint; payload: UpdateProjectPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProject(id, payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PROJECTS_KEY }),
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProject(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PROJECTS_KEY }),
  });
}
