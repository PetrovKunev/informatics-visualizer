import { bubbleSort } from '@/algorithms/sorting/bubble-sort';
import { selectionSort } from '@/algorithms/sorting/selection-sort';
import { insertionSort } from '@/algorithms/sorting/insertion-sort';
import { mergeSort } from '@/algorithms/sorting/merge-sort';
import { quickSort } from '@/algorithms/sorting/quick-sort';
import { linearSearch } from '@/algorithms/search/linear-search';
import { binarySearch } from '@/algorithms/search/binary-search';
import { createStack } from '@/algorithms/data-structures/stack';
import { createQueue } from '@/algorithms/data-structures/queue';
import { createLinkedList } from '@/algorithms/data-structures/linked-list';

export const ALL_SORTING_ALGORITHMS = {
  bubble: {
    id: 'bubble',
    name: 'Балонно сортиране',
    run: bubbleSort
  },
  selection: {
    id: 'selection',
    name: 'Сортиране чрез избор',
    run: selectionSort
  },
  insertion: {
    id: 'insertion',
    name: 'Сортиране чрез вмъкване',
    run: insertionSort
  },
  merge: {
    id: 'merge',
    name: 'Сортиране чрез сливане',
    run: mergeSort
  },
  quick: {
    id: 'quick',
    name: 'Бързо сортиране',
    run: quickSort
  }
} as const;

export const SEARCH_ALGORITHMS = {
  linear: {
    id: 'linear',
    name: 'Линейно търсене',
    run: linearSearch
  },
  binary: {
    id: 'binary',
    name: 'Двоично търсене',
    run: binarySearch
  }
} as const;

export const DATA_STRUCTURE_FACTORIES = {
  stack: createStack,
  queue: createQueue,
  linkedList: createLinkedList
};
