import { describe, expect, it } from 'vitest';
import { binarySearch } from '@/algorithms/search/binary-search';

describe('binarySearch', () => {
  const run = (array: number[], target: number) => {
    const generator = binarySearch.run({ array, target });
    let result = generator.next();
    while (!result.done) {
      result = generator.next();
    }
    return result.value?.state.foundIndex ?? -1;
  };

  it('намира стойност при сортиран масив', () => {
    expect(run([1, 3, 5, 7, 9], 7)).toBe(3);
  });

  it('връща -1 при липса на стойност', () => {
    expect(run([1, 3, 5], 4)).toBe(-1);
  });
});
