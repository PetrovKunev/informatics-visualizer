export interface LinkedListNode<T = number> {
  value: T;
  next: LinkedListNode<T> | null;
}

export interface LinkedListState<T = number> {
  nodes: { id: number; value: T; next: number | null }[];
  length: number;
}

export interface LinkedListController<T = number> {
  insertAtHead(value: T): LinkedListState<T>;
  insertAtTail(value: T): LinkedListState<T>;
  insertAt(index: number, value: T): LinkedListState<T>;
  removeAt(index: number): LinkedListState<T>;
  reset(values?: T[]): LinkedListState<T>;
  snapshot(): LinkedListState<T>;
}

export function createLinkedList<T = number>(values: T[] = []): LinkedListController<T> {
  let head: LinkedListNode<T> | null = null;
  let length = 0;

  const buildFromArray = (arr: T[]) => {
    head = null;
    length = 0;
    arr.forEach((value) => insertAtTail(value));
  };

  const toArray = (): LinkedListState<T> => {
    const nodes: LinkedListState<T>['nodes'] = [];
    let current: LinkedListNode<T> | null = head;
    let id = 0;
    while (current) {
      const nodeId = id++;
      const nextId = current.next ? id : null;
      nodes.push({
        id: nodeId,
        value: current.value,
        next: nextId
      });
      current = current.next;
    }
    return { nodes, length };
  };

  const insertAtHead = (value: T): LinkedListState<T> => {
    const newNode: LinkedListNode<T> = { value, next: head };
    head = newNode;
    length++;
    return snapshot();
  };

  const insertAtTail = (value: T): LinkedListState<T> => {
    const newNode: LinkedListNode<T> = { value, next: null };
    if (!head) {
      head = newNode;
      length++;
      return snapshot();
    }
    let current: LinkedListNode<T> | null = head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    length++;
    return snapshot();
  };

  const insertAt = (index: number, value: T): LinkedListState<T> => {
    if (index <= 0) {
      return insertAtHead(value);
    }
    if (index >= length) {
      return insertAtTail(value);
    }
    const newNode: LinkedListNode<T> = { value, next: null };
    let prev: LinkedListNode<T> | null = null;
    let cursor: LinkedListNode<T> | null = head;
    let currentIndex = 0;
    while (cursor && currentIndex < index) {
      prev = cursor;
      cursor = cursor.next;
      currentIndex++;
    }
    const current = cursor;
    if (prev) {
      prev.next = newNode;
      newNode.next = current ?? null;
    }
    length++;
    return snapshot();
  };

  const removeAt = (index: number): LinkedListState<T> => {
    if (!head) {
      return snapshot();
    }
    if (index <= 0) {
      head = head.next;
      length = Math.max(0, length - 1);
      return snapshot();
    }
    let prev: LinkedListNode<T> | null = null;
    let cursor: LinkedListNode<T> | null = head;
    let currentIndex = 0;
    while (cursor && currentIndex < index) {
      prev = cursor;
      cursor = cursor.next;
      currentIndex++;
    }
    const current = cursor;
    if (prev && current) {
      prev.next = current.next;
      length = Math.max(0, length - 1);
    }
    return snapshot();
  };

  const reset = (nextValues: T[] = []): LinkedListState<T> => {
    head = null;
    length = 0;
    buildFromArray(nextValues);
    return snapshot();
  };

  const snapshot = (): LinkedListState<T> => toArray();

  // Инициализация с начални стойности.
  if (values.length) {
    buildFromArray(values);
  }

  return {
    insertAtHead,
    insertAtTail,
    insertAt,
    removeAt,
    reset,
    snapshot
  };
}
