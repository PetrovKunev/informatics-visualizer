import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

interface SelectionSortState {
  array: number[];
  i: number;
  minIndex: number;
  j: number;
}

export const selectionSort: AlgorithmImplementation<number[], SelectionSortState> = {
  id: 'selection',
  name: 'Сортиране чрез избор',
  description: 'На всяка стъпка се избира минималният елемент от несортираната част и се поставя отпред.',
  complexity: {
    best: 'O(n^2)',
    average: 'O(n^2)',
    worst: 'O(n^2)'
  },
  *run(
    input: number[]
  ): Generator<AlgorithmStep<SelectionSortState>, AlgorithmStep<SelectionSortState>> {
    const arr = [...input];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        yield {
          state: { array: [...arr], i, minIndex, j },
          description: `Сравняваме индекс ${j} с текущия минимум ${minIndex}`,
          highlightedLines: ['compare']
        };
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          yield {
            state: { array: [...arr], i, minIndex, j },
            description: `Ново минимално значение на позиция ${minIndex}`,
            highlightedLines: ['update-min']
          };
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        yield {
          state: { array: [...arr], i, minIndex, j: minIndex },
          description: `Размяна на позициите ${i} и ${minIndex}`,
          highlightedLines: ['swap']
        };
      }
    }
    return {
      state: { array: [...arr], i: arr.length - 1, minIndex: arr.length - 1, j: arr.length - 1 },
      description: 'Масивът е сортиран.',
      highlightedLines: ['end']
    };
  }
};
