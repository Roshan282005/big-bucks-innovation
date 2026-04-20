// Backend actor hook wrapper — wires createActor from backend.ts into useActor

import { createActor } from "@/backend";
import { useActor as _useActor } from "@caffeineai/core-infrastructure";

export function useActor() {
  return _useActor(createActor);
}
