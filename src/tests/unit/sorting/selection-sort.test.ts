import { describe, expect, it } from 'vitest';
import { selectionSort } from '@/algorithms/sorting/selection-sort';

const runSelection = (input: number[]) => {
  const generator = selectionSort.run([...input]);
  let result = generator.next();
  let last = result.value;
  while (!result.done) {
    last = result.value;
    result = generator.next();
  }
  return result.value?.state.array ?? last?.state.array ?? input;
};

describe('selectionSort', () => {
  it('сортира масив', () => {
    expect(runSelection([4, 1, 3, 2])).toEqual([1, 2, 3, 4]);
  });

  it('работи с повтарящи се стойности', () => {
    expect(runSelection([3, 1, 1, 2])).toEqual([1, 1, 2, 3]);
  });
});
