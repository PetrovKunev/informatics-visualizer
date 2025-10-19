import { describe, expect, it } from 'vitest';
import { createQueue } from '@/algorithms/data-structures/queue';

describe('createQueue', () => {
  it('enqueue и dequeue работят коректно', () => {
    const queue = createQueue<number>(3);
    let state = queue.enqueue(1);
    state = queue.enqueue(2);
    expect(state.items).toEqual([1, 2]);
    state = queue.dequeue();
    expect(state.items).toEqual([2]);
  });

  it('отчита underflow и overflow', () => {
    const queue = createQueue<number>(1);
    let state = queue.enqueue(5);
    expect(state.overflow).toBe(false);
    state = queue.enqueue(6);
    expect(state.overflow).toBe(true);
    state = queue.reset();
    state = queue.dequeue();
    expect(state.underflow).toBe(true);
  });
});
