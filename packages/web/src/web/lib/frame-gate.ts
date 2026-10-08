import { useSyncExternalStore } from "react";
import { settings } from "./catalogue";
function subscribe(listener: () => void) {
  window.addEventListener("pontikus-frame-gate", listener);
  return () => window.removeEventListener("pontikus-frame-gate", listener);
}
// Setting the lock also updates an already-open preview and checkbox immediately.
export function useFrameGate() {
  return useSyncExternalStore(
    subscribe,
    () => settings.gateFrameRemoval,
    () => false,
  );
}
