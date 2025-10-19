import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

export type VisualizerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface VisualizerStoreState<TState = unknown> {
  status: VisualizerStatus;
  stepIndex: number;
  speed: number;
  state: TState | null;
  setStatus(status: VisualizerStatus): void;
  setStepIndex(index: number): void;
  setSpeed(speed: number): void;
  setState(next: TState | null): void;
  reset(): void;
}

export function createVisualizerStore<TState = unknown>() {
  return createStore<VisualizerStoreState<TState>>((set) => ({
    status: 'idle',
    stepIndex: 0,
    speed: 1,
    state: null,
    setStatus: (status) => set({ status }),
    setStepIndex: (stepIndex) => set({ stepIndex }),
    setSpeed: (speed) => set({ speed }),
    setState: (state) => set({ state }),
    reset: () =>
      set({
        status: 'idle',
        stepIndex: 0,
        speed: 1,
        state: null
      })
  }));
}

export function useVisualizerStore<TState, TSlice>(
  store: ReturnType<typeof createVisualizerStore<TState>>,
  selector: (state: VisualizerStoreState<TState>) => TSlice
) {
  return useStore(store, selector);
}
