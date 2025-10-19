import { describe, expect, it } from 'vitest';
import { bubbleSort } from '@/algorithms/sorting/bubble-sort';

describe('bubbleSort', () => {
  const run = (input: number[]) => {
    const generator = bubbleSort.run([...input]);
    let result = generator.next();
    let last = result.value;
    while (!result.done) {
      last = result.value;
      result = generator.next();
    }
    return result.value?.state.array ?? last?.state.array ?? input;
  };

  it('сортира масив във възходящ ред', () => {
    const output = run([5, 3, 8, 1, 2]);
    expect(output).toEqual([1, 2, 3, 5, 8]);
  });

  it('оставя вече сортиран масив', () => {
    const output = run([1, 2, 3]);
    expect(output).toEqual([1, 2, 3]);
  });
});
