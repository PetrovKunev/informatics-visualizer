import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

interface BinarySearchState {
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  foundIndex: number;
}

export const binarySearch: AlgorithmImplementation<
  { array: number[]; target: number },
  BinarySearchState
> = {
  id: 'binary-search',
  name: 'Двоично търсене',
  description: 'Разделя сортирания масив на половини, за да намери бързо търсената стойност.',
  complexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)'
  },
  *run({
    array,
    target
  }): Generator<AlgorithmStep<BinarySearchState>, AlgorithmStep<BinarySearchState>> {
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const current = array[mid];
      if (current === target) {
        return {
          state: { array: [...array], target, left, right, mid, foundIndex: mid },
          description: `Намерихме стойността на позиция ${mid}`,
          highlightedLines: ['found']
        };
      }
      yield {
        state: { array: [...array], target, left, right, mid, foundIndex: -1 },
        description: `Проверяваме средата (${mid}) със стойност ${current}`,
        highlightedLines: ['check']
      };
      if (current < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return {
      state: { array: [...array], target, left, right, mid: -1, foundIndex: -1 },
      description: 'Стойността не е открита.',
      highlightedLines: ['not-found']
    };
  }
};
