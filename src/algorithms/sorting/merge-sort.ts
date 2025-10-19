import type { AlgorithmImplementation, AlgorithmStep } from '@/types/algorithm';

interface MergeSortState {
  array: number[];
  left: number;
  mid: number;
  right: number;
  phase: 'split' | 'merge' | 'done';
}

function* mergeSortGenerator(
  arr: number[],
  left: number,
  right: number
): Generator<AlgorithmStep<MergeSortState>, void, undefined> {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  yield {
    state: { array: [...arr], left, mid, right, phase: 'split' },
    description: `Разделяме масива на сегменти [${left}, ${mid}] и [${mid + 1}, ${right}]`,
    highlightedLines: ['split']
  };

  yield* mergeSortGenerator(arr, left, mid);
  yield* mergeSortGenerator(arr, mid + 1, right);

  const temp: number[] = [];
  let i = left;
  let j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }
  while (i <= mid) {
    temp.push(arr[i]);
    i++;
  }
  while (j <= right) {
    temp.push(arr[j]);
    j++;
  }
  for (let k = 0; k < temp.length; k++) {
    arr[left + k] = temp[k];
  }
  yield {
    state: { array: [...arr], left, mid, right, phase: 'merge' },
    description: `Сливаме сортираните подмасиви обратно в диапазон [${left}, ${right}]`,
    highlightedLines: ['merge']
  };
}

export const mergeSort: AlgorithmImplementation<number[], MergeSortState> = {
  id: 'merge',
  name: 'Сортиране чрез сливане',
  description: 'Разделя масива на по-малки части и ги слива в подреден вид чрез стратегия divide-and-conquer.',
  complexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)'
  },
  *run(
    input: number[]
  ): Generator<AlgorithmStep<MergeSortState>, AlgorithmStep<MergeSortState>> {
    const arr = [...input];
    yield* mergeSortGenerator(arr, 0, arr.length - 1);
    return {
      state: { array: [...arr], left: 0, mid: Math.floor((arr.length - 1) / 2), right: arr.length - 1, phase: 'done' },
      description: 'Масивът е сортиран.',
      highlightedLines: ['end']
    };
  }
};
