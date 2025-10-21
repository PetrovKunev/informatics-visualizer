import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

export interface BubbleSortState {
  array: number[];
  i: number;
  j: number;
  swapped: boolean;
}

export const bubbleSort: AlgorithmImplementation<number[], BubbleSortState> = {
  id: 'bubble',
  name: 'Балонно сортиране',
  description:
    'Повтарящ се алгоритъм, който сравнява съседни елементи и ги разменя при нужда, докато масивът се подреди.',
  complexity: {
    best: 'O(n)',
    average: 'O(n^2)',
    worst: 'O(n^2)'
  },
  *run(input: number[]): Generator<AlgorithmStep<BubbleSortState>, AlgorithmStep<BubbleSortState>> {
    const arr = [...input];
    let swapped = false;
    for (let i = 0; i < arr.length; i++) {
      swapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        const left = arr[j];
        const right = arr[j + 1];
        yield {
          state: { array: [...arr], i, j, swapped },
          description: `Сравнение на позиции ${j} и ${j + 1}`,
          highlightedLines: ['compare']
        };
        if (left === undefined || right === undefined) {
          continue;
        }
        if (left > right) {
          arr[j] = right;
          arr[j + 1] = left;
          swapped = true;
          yield {
            state: { array: [...arr], i, j, swapped },
            description: `Размяна на стойностите на позиции ${j} и ${j + 1}`,
            highlightedLines: ['swap']
          };
        }
      }
      if (!swapped) {
        break;
      }
    }
    return {
      state: {
        array: [...arr],
        i: arr.length > 0 ? arr.length - 1 : 0,
        j: arr.length > 1 ? arr.length - 2 : 0,
        swapped: false
      },
      description: 'Масивът е сортиран.',
      highlightedLines: ['end']
    };
  }
};
