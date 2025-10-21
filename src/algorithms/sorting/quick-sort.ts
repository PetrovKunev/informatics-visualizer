import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

interface QuickSortState {
  array: number[];
  left: number;
  right: number;
  pivotIndex: number;
  phase: 'partition' | 'swap' | 'done';
}

function* quickSortGenerator(
  arr: number[],
  left: number,
  right: number
): Generator<AlgorithmStep<QuickSortState>, void, undefined> {
  if (left >= right) {
    return;
  }

  const pivotIndex = right;
  const pivot = arr[pivotIndex];
  if (pivot === undefined) {
    return;
  }
  let partitionIndex = left;

  yield {
    state: { array: [...arr], left, right, pivotIndex, phase: 'partition' },
    description: `Избираме пивот ${pivot} на позиция ${pivotIndex}`,
    highlightedLines: ['select-pivot']
  };

  for (let i = left; i < right; i++) {
    const current = arr[i];
    const partitionValue = arr[partitionIndex];
    if (
      current === undefined ||
      partitionValue === undefined
    ) {
      continue;
    }
    if (current <= pivot) {
      arr[i] = partitionValue;
      arr[partitionIndex] = current;
      yield {
        state: { array: [...arr], left, right, pivotIndex, phase: 'swap' },
        description: `Преместваме стойността ${arr[partitionIndex]} преди пивота`,
        highlightedLines: ['partition']
      };
      partitionIndex++;
    }
  }

  const finalPartitionValue = arr[partitionIndex];
  const rightValue = arr[right];
  if (finalPartitionValue !== undefined && rightValue !== undefined) {
    arr[partitionIndex] = rightValue;
    arr[right] = finalPartitionValue;
  }
  yield {
    state: { array: [...arr], left, right, pivotIndex: partitionIndex, phase: 'swap' },
    description: `Поставяме пивота на позиция ${partitionIndex}`,
    highlightedLines: ['place-pivot']
  };

  yield* quickSortGenerator(arr, left, partitionIndex - 1);
  yield* quickSortGenerator(arr, partitionIndex + 1, right);
}

export const quickSort: AlgorithmImplementation<number[], QuickSortState> = {
  id: 'quick',
  name: 'Бързо сортиране',
  description: 'Избира пивот и разделя масива на по-малки подмасиви, които се сортират рекурсивно.',
  complexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n^2)'
  },
  *run(
    input: number[]
  ): Generator<AlgorithmStep<QuickSortState>, AlgorithmStep<QuickSortState>> {
    const arr = [...input];
    yield* quickSortGenerator(arr, 0, arr.length - 1);
    return {
      state: {
        array: [...arr],
        left: 0,
        right: arr.length - 1,
        pivotIndex: Math.floor(arr.length / 2),
        phase: 'done'
      },
      description: 'Масивът е сортиран.',
      highlightedLines: ['end']
    };
  }
};
