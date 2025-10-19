import type { AlgorithmImplementation } from '@/types/algorithm';
import { ALL_SORTING_ALGORITHMS, SEARCH_ALGORITHMS } from '@/constants/algorithms';

type AlgorithmMap = Record<string, AlgorithmImplementation<any, any>>;

const registry: AlgorithmMap = {
  ...Object.values(ALL_SORTING_ALGORITHMS).reduce<AlgorithmMap>((acc, algo) => {
    acc[algo.id] = algo;
    return acc;
  }, {}),
  ...Object.values(SEARCH_ALGORITHMS).reduce<AlgorithmMap>((acc, algo) => {
    acc[algo.id] = algo;
    return acc;
  }, {})
};

export function getAlgorithmById(id: string) {
  return registry[id];
}

export function listAlgorithms(): AlgorithmImplementation<any, any>[] {
  return Object.values(registry);
}
