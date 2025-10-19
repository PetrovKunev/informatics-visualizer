export interface AlgorithmStep<TState> {
  state: TState;
  description: string;
  highlightedLines?: string[];
}

export interface AlgorithmImplementation<TInput, TState = unknown> {
  id: string;
  name: string;
  description: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
  };
  run(input: TInput): Generator<AlgorithmStep<TState>, AlgorithmStep<TState>, unknown>;
}
