import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

interface LinearSearchState {
  array: number[];
  index: number;
  target: number;
  foundIndex: number;
}

export const linearSearch: AlgorithmImplementation<
  { array: number[]; target: number },
  LinearSearchState
> = {
  id: 'linear-search',
  name: 'Линейно търсене',
  description: 'Проверява всеки елемент последователно, докато намери търсената стойност.',
  complexity: {
    best: 'O(1)',
    average: 'O(n/2)',
    worst: 'O(n)'
  },
  *run({
    array,
    target
  }): Generator<AlgorithmStep<LinearSearchState>, AlgorithmStep<LinearSearchState>> {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return {
          state: { array: [...array], index: i, target, foundIndex: i },
          description: `Стойността е намерена на позиция ${i}`,
          highlightedLines: ['found']
        };
      }
      yield {
        state: { array: [...array], index: i, target, foundIndex: -1 },
        description: `Сравняваме индекс ${i} със стойността ${target}`,
        highlightedLines: ['compare']
      };
    }
    return {
      state: { array: [...array], index: array.length - 1, target, foundIndex: -1 },
      description: 'Стойността не е намерена.',
      highlightedLines: ['not-found']
    };
  }
};
