import { describe, expect, it } from 'vitest';
import { linearSearch } from '@/algorithms/search/linear-search';

describe('linearSearch', () => {
  const run = (array: number[], target: number) => {
    const generator = linearSearch.run({ array, target });
    let result = generator.next();
    while (!result.done) {
      result = generator.next();
    }
    return result.value?.state.foundIndex ?? -1;
  };

  it('намира съществуваща стойност', () => {
    expect(run([1, 4, 2, 9], 2)).toBe(2);
  });

  it('връща -1 за липсваща стойност', () => {
    expect(run([1, 2, 3], 7)).toBe(-1);
  });
});
