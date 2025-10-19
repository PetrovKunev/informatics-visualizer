import { describe, expect, it } from 'vitest';
import { mergeSort } from '@/algorithms/sorting/merge-sort';

const runMerge = (input: number[]) => {
  const generator = mergeSort.run([...input]);
  let result = generator.next();
  let last = result.value;
  while (!result.done) {
    last = result.value;
    result = generator.next();
  }
  return result.value?.state.array ?? last?.state.array ?? input;
};

describe('mergeSort', () => {
  it('сортира произволен масив', () => {
    expect(runMerge([10, 5, 7, 3, 1])).toEqual([1, 3, 5, 7, 10]);
  });

  it('работи с отрицателни числа', () => {
    expect(runMerge([0, -2, 5, -1])).toEqual([-2, -1, 0, 5]);
  });
});
