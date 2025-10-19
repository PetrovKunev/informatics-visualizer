export interface VisualizerProps<TState = unknown, TData = unknown> {
  speed?: number;
  onStep?(state: TState): void;
  onFinish?(): void;
  onError?(message: string): void;
  controls?: boolean;
  initialData?: TData;
}

export interface PseudocodeStep {
  id: string;
  label: string;
  description?: string;
}

export interface VisualizationControlState<TState = unknown> {
  status: 'idle' | 'running' | 'paused' | 'finished';
  stepIndex: number;
  state: TState;
}
