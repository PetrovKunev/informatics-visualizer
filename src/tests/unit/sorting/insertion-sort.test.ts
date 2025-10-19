import { describe, expect, it } from 'vitest';
import { insertionSort } from '@/algorithms/sorting/insertion-sort';

const runInsertion = (input: number[]) => {
  const generator = insertionSort.run([...input]);
  let result = generator.next();
  let last = result.value;
  while (!result.done) {
    last = result.value;
    result = generator.next();
  }
  return result.value?.state.array ?? last?.state.array ?? input;
};

describe('insertionSort', () => {
  it('сортира масив', () => {
    expect(runInsertion([9, 2, 4, 1])).toEqual([1, 2, 4, 9]);
  });

  it('поддържа стабилност за равни елементи', () => {
    const output = runInsertion([3, 3, 2, 2]);
    expect(output).toEqual([2, 2, 3, 3]);
  });
});
