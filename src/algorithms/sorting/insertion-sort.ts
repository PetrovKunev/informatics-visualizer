import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

interface InsertionSortState {
  array: number[];
  i: number;
  j: number;
  key: number;
}

export const insertionSort: AlgorithmImplementation<number[], InsertionSortState> = {
  id: 'insertion',
  name: 'Сортиране чрез вмъкване',
  description:
    'Всеки следващ елемент се вмъква на правилното място в вече сортирания сегмент в началото на масива.',
  complexity: {
    best: 'O(n)',
    average: 'O(n^2)',
    worst: 'O(n^2)'
  },
  *run(
    input: number[]
  ): Generator<AlgorithmStep<InsertionSortState>, AlgorithmStep<InsertionSortState>> {
    const arr = [...input];
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      if (key === undefined) {
        continue;
      }
      let j = i - 1;
      yield {
        state: { array: [...arr], i, j, key },
        description: `Избираме ключов елемент ${key} на позиция ${i}`,
        highlightedLines: ['select']
      };
      while (j >= 0) {
        const current = arr[j];
        if (current === undefined || current <= key) {
          break;
        }
        arr[j + 1] = current;
        j--;
        yield {
          state: { array: [...arr], i, j, key },
          description: `Преместваме елемент надясно, за да освободим позиция`,
          highlightedLines: ['shift']
        };
      }
      arr[j + 1] = key;
      yield {
        state: { array: [...arr], i, j: j + 1, key },
        description: `Вмъкваме ключа ${key} на позиция ${j + 1}`,
        highlightedLines: ['insert']
      };
    }
    return {
      state: {
        array: [...arr],
        i: arr.length > 0 ? arr.length - 1 : 0,
        j: arr.length > 0 ? arr.length - 1 : 0,
        key: arr.at(-1) ?? 0
      },
      description: 'Масивът е сортиран.',
      highlightedLines: ['end']
    };
  }
};
