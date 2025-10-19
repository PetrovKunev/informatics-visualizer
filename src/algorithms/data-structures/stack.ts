export interface StackState<T = number> {
  items: T[];
  capacity: number;
  overflow: boolean;
  underflow: boolean;
}

export interface StackController<T = number> {
  push(item: T): StackState<T>;
  pop(): StackState<T>;
  peek(): T | undefined;
  reset(initial?: T[]): StackState<T>;
  snapshot(): StackState<T>;
}

export function createStack<T = number>(capacity = 8, initial: T[] = []): StackController<T> {
  let items = [...initial];

  const snapshot = (): StackState<T> => ({
    items: [...items],
    capacity,
    overflow: items.length > capacity,
    underflow: items.length === 0
  });

  const push = (item: T) => {
    if (items.length >= capacity) {
      return {
        ...snapshot(),
        overflow: true
      };
    }
    items = [...items, item];
    return snapshot();
  };

  const pop = () => {
    if (!items.length) {
      return {
        ...snapshot(),
        underflow: true
      };
    }
    items = items.slice(0, -1);
    return snapshot();
  };

  const peek = () => items.at(-1);

  const reset = (nextInitial: T[] = []) => {
    items = [...nextInitial];
    return snapshot();
  };

  return {
    push,
    pop,
    peek,
    reset,
    snapshot
  };
}
