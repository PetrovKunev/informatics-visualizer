export interface QueueState<T = number> {
  items: T[];
  capacity: number;
  overflow: boolean;
  underflow: boolean;
  front: number;
  rear: number;
}

export interface QueueController<T = number> {
  enqueue(item: T): QueueState<T>;
  dequeue(): QueueState<T>;
  peek(): T | undefined;
  reset(initial?: T[]): QueueState<T>;
  snapshot(): QueueState<T>;
}

export function createQueue<T = number>(
  capacity = 8,
  initial: T[] = []
): QueueController<T> {
  let items = [...initial];

  const snapshot = (): QueueState<T> => ({
    items: [...items],
    capacity,
    overflow: items.length > capacity,
    underflow: items.length === 0,
    front: items.length ? 0 : -1,
    rear: items.length ? items.length - 1 : -1
  });

  const enqueue = (item: T) => {
    if (items.length >= capacity) {
      return {
        ...snapshot(),
        overflow: true
      };
    }
    items = [...items, item];
    return snapshot();
  };

  const dequeue = () => {
    if (!items.length) {
      return {
        ...snapshot(),
        underflow: true
      };
    }
    items = items.slice(1);
    return snapshot();
  };

  const peek = () => items.at(0);

  const reset = (nextInitial: T[] = []) => {
    items = [...nextInitial];
    return snapshot();
  };

  return {
    enqueue,
    dequeue,
    peek,
    reset,
    snapshot
  };
}
