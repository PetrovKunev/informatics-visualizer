import { describe, expect, it } from 'vitest';
import { quickSort } from '@/algorithms/sorting/quick-sort';

const runQuick = (input: number[]) => {
  const generator = quickSort.run([...input]);
  let result = generator.next();
  let last = result.value;
  while (!result.done) {
    last = result.value;
    result = generator.next();
  }
  return result.value?.state.array ?? last?.state.array ?? input;
};

describe('quickSort', () => {
  it('сортира масив', () => {
    expect(runQuick([6, 1, 8, 4, 2])).toEqual([1, 2, 4, 6, 8]);
  });

  it('обработва вече сортирани данни', () => {
    expect(runQuick([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
