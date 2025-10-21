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
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort
} as const;

export const SEARCH_ALGORITHMS = {
  linear: linearSearch,
  binary: binarySearch
} as const;

export const DATA_STRUCTURE_FACTORIES = {
  stack: createStack,
  queue: createQueue,
  linkedList: createLinkedList
};
