import { describe, expect, it } from 'vitest';
import { createStack } from '@/algorithms/data-structures/stack';

describe('createStack', () => {
  it('поддържа push и pop', () => {
    const stack = createStack<number>(3);
    let state = stack.push(1);
    expect(state.items).toEqual([1]);
    state = stack.push(2);
    expect(state.items).toEqual([1, 2]);
    state = stack.pop();
    expect(state.items).toEqual([1]);
  });

  it('детектира overflow и underflow', () => {
    const stack = createStack<number>(1);
    let state = stack.push(5);
    expect(state.overflow).toBe(false);
    state = stack.push(7);
    expect(state.overflow).toBe(true);
    state = stack.reset();
    state = stack.pop();
    expect(state.underflow).toBe(true);
  });
});
