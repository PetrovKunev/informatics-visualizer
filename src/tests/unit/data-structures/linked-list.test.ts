import { describe, expect, it } from 'vitest';
import { createLinkedList } from '@/algorithms/data-structures/linked-list';

describe('createLinkedList', () => {
  it('вмъква в началото и края', () => {
    const list = createLinkedList<number>([1]);
    let state = list.insertAtHead(0);
    expect(state.nodes[0]?.value).toBe(0);
    state = list.insertAtTail(2);
    expect(state.nodes[state.nodes.length - 1]?.value).toBe(2);
  });

  it('премахва по индекс', () => {
    const list = createLinkedList<number>([3, 4, 5]);
    const state = list.removeAt(1);
    expect(state.nodes.map((node) => node.value)).toEqual([3, 5]);
  });
});
