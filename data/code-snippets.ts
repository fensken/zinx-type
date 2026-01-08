// Code snippets for typing practice - realistic code examples
// Each snippet is an array of lines to preserve formatting

import { Difficulty } from "./quotes";

export interface CodeSnippet {
  language: string;
  lines: string[];
  difficulty: Difficulty;
}

export const javascriptSnippets: CodeSnippet[] = [
  // Easy
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "function fibonacci(n) {",
      "  if (n <= 1) return n;",
      "  return fibonacci(n - 1) + fibonacci(n - 2);",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const fetchData = async (url) => {",
      "  const response = await fetch(url);",
      "  const data = await response.json();",
      "  return data;",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const users = items.filter(item => item.active)",
      "  .map(item => item.name)",
      "  .sort((a, b) => a.localeCompare(b));",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "function sum(a, b) {",
      "  return a + b;",
      "}",
      "",
      "const result = sum(5, 10);",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const numbers = [1, 2, 3, 4, 5];",
      "const doubled = numbers.map(n => n * 2);",
      "console.log(doubled);",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: ["const greet = (name) => {", "  return `Hello, ${name}!`;", "};"],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const isEven = (num) => num % 2 === 0;",
      "const evens = [1, 2, 3, 4, 5].filter(isEven);",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "function reverseString(str) {",
      "  return str.split('').reverse().join('');",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const person = {",
      "  name: 'Alice',",
      "  age: 25,",
      "  city: 'New York'",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "easy",
    lines: [
      "const max = Math.max(...numbers);",
      "const min = Math.min(...numbers);",
      "const avg = numbers.reduce((a, b) => a + b) / numbers.length;",
    ],
  },
  // Medium
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const debounce = (fn, delay) => {",
      "  let timeoutId;",
      "  return (...args) => {",
      "    clearTimeout(timeoutId);",
      "    timeoutId = setTimeout(() => fn(...args), delay);",
      "  };",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const throttle = (fn, limit) => {",
      "  let inThrottle;",
      "  return (...args) => {",
      "    if (!inThrottle) {",
      "      fn(...args);",
      "      inThrottle = true;",
      "      setTimeout(() => inThrottle = false, limit);",
      "    }",
      "  };",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const memoize = (fn) => {",
      "  const cache = new Map();",
      "  return (...args) => {",
      "    const key = JSON.stringify(args);",
      "    if (cache.has(key)) return cache.get(key);",
      "    const result = fn(...args);",
      "    cache.set(key, result);",
      "    return result;",
      "  };",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "async function fetchWithRetry(url, retries = 3) {",
      "  for (let i = 0; i < retries; i++) {",
      "    try {",
      "      return await fetch(url);",
      "    } catch (err) {",
      "      if (i === retries - 1) throw err;",
      "    }",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const deepClone = (obj) => {",
      "  if (obj === null || typeof obj !== 'object') return obj;",
      "  const clone = Array.isArray(obj) ? [] : {};",
      "  for (const key in obj) {",
      "    clone[key] = deepClone(obj[key]);",
      "  }",
      "  return clone;",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const groupBy = (arr, key) => {",
      "  return arr.reduce((groups, item) => {",
      "    const group = item[key];",
      "    groups[group] = groups[group] || [];",
      "    groups[group].push(item);",
      "    return groups;",
      "  }, {});",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const flatten = (arr, depth = 1) => {",
      "  return depth > 0",
      "    ? arr.reduce((acc, val) =>",
      "        acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])",
      "    : arr.slice();",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const pipe = (...fns) => (x) =>",
      "  fns.reduce((acc, fn) => fn(acc), x);",
      "",
      "const compose = (...fns) => (x) =>",
      "  fns.reduceRight((acc, fn) => fn(acc), x);",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "function* range(start, end, step = 1) {",
      "  for (let i = start; i < end; i += step) {",
      "    yield i;",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "medium",
    lines: [
      "const once = (fn) => {",
      "  let called = false;",
      "  let result;",
      "  return (...args) => {",
      "    if (!called) {",
      "      called = true;",
      "      result = fn(...args);",
      "    }",
      "    return result;",
      "  };",
      "};",
    ],
  },
  // Hard
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "class EventEmitter {",
      "  constructor() {",
      "    this.events = {};",
      "  }",
      "  on(event, callback) {",
      "    if (!this.events[event]) {",
      "      this.events[event] = [];",
      "    }",
      "    this.events[event].push(callback);",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "class Observable {",
      "  constructor(subscribe) {",
      "    this._subscribe = subscribe;",
      "  }",
      "  subscribe(observer) {",
      "    return this._subscribe(observer);",
      "  }",
      "  map(fn) {",
      "    return new Observable((observer) => {",
      "      return this.subscribe({",
      "        next: (value) => observer.next(fn(value)),",
      "        error: (err) => observer.error(err),",
      "        complete: () => observer.complete()",
      "      });",
      "    });",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "const createStore = (reducer, initialState) => {",
      "  let state = initialState;",
      "  const listeners = [];",
      "  return {",
      "    getState: () => state,",
      "    dispatch: (action) => {",
      "      state = reducer(state, action);",
      "      listeners.forEach(listener => listener());",
      "    },",
      "    subscribe: (listener) => {",
      "      listeners.push(listener);",
      "      return () => listeners.splice(listeners.indexOf(listener), 1);",
      "    }",
      "  };",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "class LRUCache {",
      "  constructor(capacity) {",
      "    this.capacity = capacity;",
      "    this.cache = new Map();",
      "  }",
      "  get(key) {",
      "    if (!this.cache.has(key)) return -1;",
      "    const value = this.cache.get(key);",
      "    this.cache.delete(key);",
      "    this.cache.set(key, value);",
      "    return value;",
      "  }",
      "  put(key, value) {",
      "    this.cache.delete(key);",
      "    this.cache.set(key, value);",
      "    if (this.cache.size > this.capacity) {",
      "      this.cache.delete(this.cache.keys().next().value);",
      "    }",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "function promiseAll(promises) {",
      "  return new Promise((resolve, reject) => {",
      "    const results = [];",
      "    let completed = 0;",
      "    promises.forEach((promise, index) => {",
      "      Promise.resolve(promise).then((value) => {",
      "        results[index] = value;",
      "        completed++;",
      "        if (completed === promises.length) resolve(results);",
      "      }).catch(reject);",
      "    });",
      "  });",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "const curry = (fn) => {",
      "  return function curried(...args) {",
      "    if (args.length >= fn.length) {",
      "      return fn.apply(this, args);",
      "    }",
      "    return (...moreArgs) => curried(...args, ...moreArgs);",
      "  };",
      "};",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "class PubSub {",
      "  constructor() {",
      "    this.subscribers = {};",
      "  }",
      "  subscribe(event, callback) {",
      "    if (!this.subscribers[event]) this.subscribers[event] = [];",
      "    this.subscribers[event].push(callback);",
      "    return () => this.unsubscribe(event, callback);",
      "  }",
      "  publish(event, data) {",
      "    if (!this.subscribers[event]) return;",
      "    this.subscribers[event].forEach(cb => cb(data));",
      "  }",
      "  unsubscribe(event, callback) {",
      "    this.subscribers[event] = this.subscribers[event]",
      "      .filter(cb => cb !== callback);",
      "  }",
      "}",
    ],
  },
  {
    language: "javascript",
    difficulty: "hard",
    lines: [
      "async function asyncPool(poolLimit, array, iteratorFn) {",
      "  const results = [];",
      "  const executing = [];",
      "  for (const item of array) {",
      "    const p = Promise.resolve().then(() => iteratorFn(item));",
      "    results.push(p);",
      "    if (poolLimit <= array.length) {",
      "      const e = p.then(() => executing.splice(executing.indexOf(e), 1));",
      "      executing.push(e);",
      "      if (executing.length >= poolLimit) await Promise.race(executing);",
      "    }",
      "  }",
      "  return Promise.all(results);",
      "}",
    ],
  },
];

export const typescriptSnippets: CodeSnippet[] = [
  // Easy
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "interface User {",
      "  id: number;",
      "  name: string;",
      "  email: string;",
      "  isActive: boolean;",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "type Result<T, E> = ",
      "  | { success: true; data: T }",
      "  | { success: false; error: E };",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "const add = (a: number, b: number): number => {",
      "  return a + b;",
      "};",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "type Status = 'pending' | 'success' | 'error';",
      "const status: Status = 'pending';",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "interface Product {",
      "  id: string;",
      "  name: string;",
      "  price: number;",
      "  inStock: boolean;",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "const greet = (name: string): string => `Hello, ${name}!`;",
      "console.log(greet('World'));",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "enum Direction {",
      "  Up = 'UP',",
      "  Down = 'DOWN',",
      "  Left = 'LEFT',",
      "  Right = 'RIGHT'",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "easy",
    lines: [
      "type Point = { x: number; y: number };",
      "const origin: Point = { x: 0, y: 0 };",
    ],
  },
  // Medium
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "function useState<T>(initial: T): [T, (v: T) => void] {",
      "  let state = initial;",
      "  const setState = (value: T) => { state = value; };",
      "  return [state, setState];",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "const fetchUser = async (id: number): Promise<User> => {",
      "  const response = await fetch(`/api/users/${id}`);",
      "  if (!response.ok) throw new Error('Not found');",
      "  return response.json();",
      "};",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "type DeepPartial<T> = {",
      "  [P in keyof T]?: T[P] extends object",
      "    ? DeepPartial<T[P]>",
      "    : T[P];",
      "};",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {",
      "  const result = {} as Pick<T, K>;",
      "  keys.forEach(key => result[key] = obj[key]);",
      "  return result;",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "type EventMap = {",
      "  click: MouseEvent;",
      "  keydown: KeyboardEvent;",
      "  scroll: Event;",
      "};",
      "",
      "function on<K extends keyof EventMap>(",
      "  event: K,",
      "  handler: (e: EventMap[K]) => void",
      ") {}",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "interface ApiResponse<T> {",
      "  data: T;",
      "  status: number;",
      "  message: string;",
      "  timestamp: Date;",
      "}",
      "",
      "type UserResponse = ApiResponse<User>;",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "const createValidator = <T>(",
      "  validate: (value: unknown) => value is T",
      ") => {",
      "  return (value: unknown): T => {",
      "    if (!validate(value)) throw new Error('Invalid');",
      "    return value;",
      "  };",
      "};",
    ],
  },
  {
    language: "typescript",
    difficulty: "medium",
    lines: [
      "type Nullable<T> = T | null | undefined;",
      "",
      "function assertDefined<T>(value: Nullable<T>): asserts value is T {",
      "  if (value === null || value === undefined) {",
      "    throw new Error('Value is not defined');",
      "  }",
      "}",
    ],
  },
  // Hard
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "type InferPromise<T> = T extends Promise<infer U> ? U : T;",
      "",
      "type Awaited<T> = T extends Promise<infer U>",
      "  ? Awaited<U>",
      "  : T;",
    ],
  },
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "type PathKeys<T> = T extends object",
      "  ? {",
      "      [K in keyof T]: K extends string",
      "        ? T[K] extends object",
      "          ? K | `${K}.${PathKeys<T[K]>}`",
      "          : K",
      "        : never;",
      "    }[keyof T]",
      "  : never;",
    ],
  },
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "class Container<T> {",
      "  private value: T;",
      "  ",
      "  constructor(value: T) {",
      "    this.value = value;",
      "  }",
      "  ",
      "  map<U>(fn: (value: T) => U): Container<U> {",
      "    return new Container(fn(this.value));",
      "  }",
      "  ",
      "  flatMap<U>(fn: (value: T) => Container<U>): Container<U> {",
      "    return fn(this.value);",
      "  }",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "type Builder<T> = {",
      "  [K in keyof T as `set${Capitalize<string & K>}`]: ",
      "    (value: T[K]) => Builder<T>;",
      "} & {",
      "  build: () => T;",
      "};",
    ],
  },
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "type UnionToIntersection<U> = ",
      "  (U extends unknown ? (k: U) => void : never) extends",
      "  (k: infer I) => void ? I : never;",
      "",
      "type LastOf<T> = UnionToIntersection<",
      "  T extends unknown ? () => T : never",
      "> extends () => infer R ? R : never;",
    ],
  },
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "abstract class Repository<T extends { id: string }> {",
      "  protected items: Map<string, T> = new Map();",
      "  ",
      "  abstract validate(item: T): boolean;",
      "  ",
      "  save(item: T): void {",
      "    if (!this.validate(item)) throw new Error('Invalid');",
      "    this.items.set(item.id, item);",
      "  }",
      "  ",
      "  find(id: string): T | undefined {",
      "    return this.items.get(id);",
      "  }",
      "}",
    ],
  },
  {
    language: "typescript",
    difficulty: "hard",
    lines: [
      "type Middleware<S, A> = (store: {",
      "  getState: () => S;",
      "  dispatch: (action: A) => void;",
      "}) => (next: (action: A) => void) => (action: A) => void;",
      "",
      "const logger: Middleware<unknown, { type: string }> = ",
      "  (store) => (next) => (action) => {",
      "    console.log('Dispatching:', action.type);",
      "    next(action);",
      "  };",
    ],
  },
];

export const pythonSnippets: CodeSnippet[] = [
  // Easy
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "def greet(name):",
      "    return f'Hello, {name}!'",
      "",
      "print(greet('World'))",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "numbers = [1, 2, 3, 4, 5]",
      "squares = [n ** 2 for n in numbers]",
      "print(squares)",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "def is_even(n):",
      "    return n % 2 == 0",
      "",
      "evens = list(filter(is_even, range(10)))",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "def factorial(n):",
      "    if n <= 1:",
      "        return 1",
      "    return n * factorial(n - 1)",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "person = {",
      "    'name': 'Alice',",
      "    'age': 30,",
      "    'city': 'Boston'",
      "}",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "with open('file.txt', 'r') as f:",
      "    content = f.read()",
      "    print(content)",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "def reverse_string(s):",
      "    return s[::-1]",
      "",
      "print(reverse_string('hello'))",
    ],
  },
  {
    language: "python",
    difficulty: "easy",
    lines: [
      "fruits = ['apple', 'banana', 'cherry']",
      "for i, fruit in enumerate(fruits):",
      "    print(f'{i}: {fruit}')",
    ],
  },
  // Medium
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "class DataProcessor:",
      "    def __init__(self, data):",
      "        self.data = data",
      "",
      "    def process(self):",
      "        return [item.strip() for item in self.data]",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "from typing import List, Optional",
      "",
      "def find_max(numbers: List[int]) -> Optional[int]:",
      "    if not numbers:",
      "        return None",
      "    return max(numbers)",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "async def fetch_all(urls):",
      "    async with aiohttp.ClientSession() as session:",
      "        tasks = [fetch(session, url) for url in urls]",
      "        return await asyncio.gather(*tasks)",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "from functools import lru_cache",
      "",
      "@lru_cache(maxsize=128)",
      "def fibonacci(n):",
      "    if n < 2:",
      "        return n",
      "    return fibonacci(n - 1) + fibonacci(n - 2)",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "from dataclasses import dataclass",
      "",
      "@dataclass",
      "class User:",
      "    id: int",
      "    name: str",
      "    email: str",
      "    active: bool = True",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "def memoize(func):",
      "    cache = {}",
      "    def wrapper(*args):",
      "        if args not in cache:",
      "            cache[args] = func(*args)",
      "        return cache[args]",
      "    return wrapper",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "from contextlib import contextmanager",
      "",
      "@contextmanager",
      "def timer():",
      "    start = time.time()",
      "    yield",
      "    print(f'Elapsed: {time.time() - start:.2f}s')",
    ],
  },
  {
    language: "python",
    difficulty: "medium",
    lines: [
      "def group_by(items, key):",
      "    result = {}",
      "    for item in items:",
      "        k = key(item)",
      "        result.setdefault(k, []).append(item)",
      "    return result",
    ],
  },
  // Hard
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "def quicksort(arr):",
      "    if len(arr) <= 1:",
      "        return arr",
      "    pivot = arr[len(arr) // 2]",
      "    left = [x for x in arr if x < pivot]",
      "    middle = [x for x in arr if x == pivot]",
      "    right = [x for x in arr if x > pivot]",
      "    return quicksort(left) + middle + quicksort(right)",
    ],
  },
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "class Singleton:",
      "    _instance = None",
      "    ",
      "    def __new__(cls):",
      "        if cls._instance is None:",
      "            cls._instance = super().__new__(cls)",
      "        return cls._instance",
    ],
  },
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "from abc import ABC, abstractmethod",
      "",
      "class Observer(ABC):",
      "    @abstractmethod",
      "    def update(self, message: str) -> None:",
      "        pass",
      "",
      "class Subject:",
      "    def __init__(self):",
      "        self._observers: list[Observer] = []",
      "    ",
      "    def attach(self, observer: Observer):",
      "        self._observers.append(observer)",
    ],
  },
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "class LRUCache:",
      "    def __init__(self, capacity: int):",
      "        self.capacity = capacity",
      "        self.cache = OrderedDict()",
      "    ",
      "    def get(self, key):",
      "        if key not in self.cache:",
      "            return -1",
      "        self.cache.move_to_end(key)",
      "        return self.cache[key]",
      "    ",
      "    def put(self, key, value):",
      "        self.cache[key] = value",
      "        self.cache.move_to_end(key)",
      "        if len(self.cache) > self.capacity:",
      "            self.cache.popitem(last=False)",
    ],
  },
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "def retry(max_attempts=3, delay=1):",
      "    def decorator(func):",
      "        @wraps(func)",
      "        def wrapper(*args, **kwargs):",
      "            for attempt in range(max_attempts):",
      "                try:",
      "                    return func(*args, **kwargs)",
      "                except Exception as e:",
      "                    if attempt == max_attempts - 1:",
      "                        raise",
      "                    time.sleep(delay)",
      "        return wrapper",
      "    return decorator",
    ],
  },
  {
    language: "python",
    difficulty: "hard",
    lines: [
      "class EventEmitter:",
      "    def __init__(self):",
      "        self._events = defaultdict(list)",
      "    ",
      "    def on(self, event, callback):",
      "        self._events[event].append(callback)",
      "    ",
      "    def emit(self, event, *args, **kwargs):",
      "        for callback in self._events[event]:",
      "            callback(*args, **kwargs)",
      "    ",
      "    def off(self, event, callback):",
      "        self._events[event].remove(callback)",
    ],
  },
];

export const rustSnippets: CodeSnippet[] = [
  // Easy
  {
    language: "rust",
    difficulty: "easy",
    lines: ["fn main() {", '    println!("Hello, World!");', "}"],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: ["fn add(a: i32, b: i32) -> i32 {", "    a + b", "}"],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: [
      "let numbers = vec![1, 2, 3, 4, 5];",
      "let sum: i32 = numbers.iter().sum();",
      'println!("Sum: {}", sum);',
    ],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: [
      "fn parse_number(s: &str) -> Result<i32, ParseIntError> {",
      "    let n = s.trim().parse::<i32>()?;",
      "    Ok(n * 2)",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: [
      "struct Point {",
      "    x: f64,",
      "    y: f64,",
      "}",
      "",
      "let origin = Point { x: 0.0, y: 0.0 };",
    ],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: [
      "enum Direction {",
      "    Up,",
      "    Down,",
      "    Left,",
      "    Right,",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "easy",
    lines: [
      "fn is_even(n: i32) -> bool {",
      "    n % 2 == 0",
      "}",
      "",
      "let evens: Vec<_> = (0..10).filter(|&x| is_even(x)).collect();",
    ],
  },
  // Medium
  {
    language: "rust",
    difficulty: "medium",
    lines: [
      "fn fibonacci(n: u32) -> u32 {",
      "    match n {",
      "        0 => 0,",
      "        1 => 1,",
      "        _ => fibonacci(n - 1) + fibonacci(n - 2),",
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "medium",
    lines: [
      "impl Iterator for Counter {",
      "    type Item = u32;",
      "    ",
      "    fn next(&mut self) -> Option<Self::Item> {",
      "        if self.count < 5 {",
      "            self.count += 1;",
      "            Some(self.count)",
      "        } else {",
      "            None",
      "        }",
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "medium",
    lines: [
      "use std::collections::HashMap;",
      "",
      "fn word_count(text: &str) -> HashMap<&str, u32> {",
      "    let mut counts = HashMap::new();",
      "    for word in text.split_whitespace() {",
      "        *counts.entry(word).or_insert(0) += 1;",
      "    }",
      "    counts",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "medium",
    lines: [
      "#[derive(Debug, Clone)]",
      "struct Config {",
      "    host: String,",
      "    port: u16,",
      "    debug: bool,",
      "}",
      "",
      "impl Default for Config {",
      "    fn default() -> Self {",
      '        Self { host: "localhost".into(), port: 8080, debug: false }',
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "medium",
    lines: [
      "fn process_result<T, E>(result: Result<T, E>) -> Option<T>",
      "where",
      "    E: std::fmt::Debug,",
      "{",
      "    match result {",
      "        Ok(value) => Some(value),",
      "        Err(e) => {",
      '            eprintln!("Error: {:?}", e);',
      "            None",
      "        }",
      "    }",
      "}",
    ],
  },
  // Hard
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "struct User {",
      "    id: u64,",
      "    name: String,",
      "    email: String,",
      "}",
      "",
      "impl User {",
      "    fn new(id: u64, name: &str) -> Self {",
      "        Self { id, name: name.to_string(), email: String::new() }",
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "use std::sync::{Arc, Mutex};",
      "",
      "struct Counter {",
      "    count: Arc<Mutex<u32>>,",
      "}",
      "",
      "impl Counter {",
      "    fn increment(&self) {",
      "        let mut count = self.count.lock().unwrap();",
      "        *count += 1;",
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "async fn fetch_data(url: &str) -> Result<String, reqwest::Error> {",
      "    let response = reqwest::get(url).await?;",
      "    let body = response.text().await?;",
      "    Ok(body)",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "trait Animal {",
      "    fn speak(&self) -> String;",
      "}",
      "",
      "struct Dog { name: String }",
      "",
      "impl Animal for Dog {",
      "    fn speak(&self) -> String {",
      '        format!("{} says woof!", self.name)',
      "    }",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "use std::cell::RefCell;",
      "use std::rc::Rc;",
      "",
      "type Link<T> = Option<Rc<RefCell<Node<T>>>>;",
      "",
      "struct Node<T> {",
      "    value: T,",
      "    next: Link<T>,",
      "}",
    ],
  },
  {
    language: "rust",
    difficulty: "hard",
    lines: [
      "macro_rules! vec_of_strings {",
      "    ($($x:expr),*) => {",
      "        vec![$($x.to_string()),*]",
      "    };",
      "}",
      "",
      'let names = vec_of_strings!["Alice", "Bob", "Charlie"];',
    ],
  },
];

export const golangSnippets: CodeSnippet[] = [
  // Easy
  {
    language: "golang",
    difficulty: "easy",
    lines: [
      "package main",
      "",
      "func main() {",
      '    fmt.Println("Hello, World!")',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: [
      "type User struct {",
      '    ID    int    `json:"id"`',
      '    Name  string `json:"name"`',
      '    Email string `json:"email"`',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: ["func add(a, b int) int {", "    return a + b", "}"],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: [
      "numbers := []int{1, 2, 3, 4, 5}",
      "for i, num := range numbers {",
      '    fmt.Printf("%d: %d\\n", i, num)',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: ["func isEven(n int) bool {", "    return n%2 == 0", "}"],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: [
      "person := map[string]string{",
      '    "name":  "Alice",',
      '    "email": "alice@example.com",',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "easy",
    lines: [
      "func factorial(n int) int {",
      "    if n <= 1 {",
      "        return 1",
      "    }",
      "    return n * factorial(n-1)",
      "}",
    ],
  },
  // Medium
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "func worker(jobs <-chan int, results chan<- int) {",
      "    for j := range jobs {",
      "        results <- j * 2",
      "    }",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "type Server struct {",
      "    addr string",
      "    mux  *http.ServeMux",
      "}",
      "",
      "func (s *Server) Start() error {",
      "    return http.ListenAndServe(s.addr, s.mux)",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "func readFile(path string) ([]byte, error) {",
      "    file, err := os.Open(path)",
      "    if err != nil {",
      "        return nil, err",
      "    }",
      "    defer file.Close()",
      "    return io.ReadAll(file)",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "type Logger interface {",
      "    Info(msg string)",
      "    Error(msg string)",
      "}",
      "",
      "type ConsoleLogger struct{}",
      "",
      "func (l *ConsoleLogger) Info(msg string) {",
      '    fmt.Printf("[INFO] %s\\n", msg)',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "func fetchJSON(url string, target interface{}) error {",
      "    resp, err := http.Get(url)",
      "    if err != nil {",
      "        return err",
      "    }",
      "    defer resp.Body.Close()",
      "    return json.NewDecoder(resp.Body).Decode(target)",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "medium",
    lines: [
      "ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)",
      "defer cancel()",
      "",
      "select {",
      "case <-ctx.Done():",
      '    fmt.Println("timeout")',
      "case result := <-ch:",
      "    fmt.Println(result)",
      "}",
    ],
  },
  // Hard
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "func main() {",
      '    http.HandleFunc("/", handler)',
      '    log.Fatal(http.ListenAndServe(":8080", nil))',
      "}",
      "",
      "func handler(w http.ResponseWriter, r *http.Request) {",
      '    fmt.Fprintf(w, "Hello, World!")',
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "type Cache struct {",
      "    mu    sync.RWMutex",
      "    items map[string]interface{}",
      "}",
      "",
      "func (c *Cache) Get(key string) (interface{}, bool) {",
      "    c.mu.RLock()",
      "    defer c.mu.RUnlock()",
      "    val, ok := c.items[key]",
      "    return val, ok",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "func fanOut(input <-chan int, workers int) []<-chan int {",
      "    channels := make([]<-chan int, workers)",
      "    for i := 0; i < workers; i++ {",
      "        channels[i] = process(input)",
      "    }",
      "    return channels",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "type middleware func(http.Handler) http.Handler",
      "",
      "func chain(h http.Handler, m ...middleware) http.Handler {",
      "    for i := len(m) - 1; i >= 0; i-- {",
      "        h = m[i](h)",
      "    }",
      "    return h",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "func retry(attempts int, sleep time.Duration, f func() error) error {",
      "    var err error",
      "    for i := 0; i < attempts; i++ {",
      "        if err = f(); err == nil {",
      "            return nil",
      "        }",
      "        time.Sleep(sleep)",
      "        sleep *= 2",
      "    }",
      "    return err",
      "}",
    ],
  },
  {
    language: "golang",
    difficulty: "hard",
    lines: [
      "type Pool struct {",
      "    work chan func()",
      "    sem  chan struct{}",
      "}",
      "",
      "func (p *Pool) Submit(task func()) {",
      "    select {",
      "    case p.work <- task:",
      "    case p.sem <- struct{}{}:",
      "        go p.worker(task)",
      "    }",
      "}",
    ],
  },
];

export const javaSnippets: CodeSnippet[] = [
  {
    language: "java",
    difficulty: "easy",
    lines: [
      "public class Main {",
      "    public static void main(String[] args) {",
      '        System.out.println("Hello, World!");',
      "    }",
      "}",
    ],
  },
  {
    language: "java",
    difficulty: "hard",
    lines: [
      "public class User {",
      "    private String name;",
      "    private int age;",
      "",
      "    public User(String name, int age) {",
      "        this.name = name;",
      "        this.age = age;",
      "    }",
      "",
      "    public String getName() { return name; }",
      "}",
    ],
  },
  {
    language: "java",
    difficulty: "medium",
    lines: [
      "List<String> filtered = items.stream()",
      "    .filter(s -> s.length() > 3)",
      "    .map(String::toUpperCase)",
      "    .collect(Collectors.toList());",
    ],
  },
];

export const cSnippets: CodeSnippet[] = [
  {
    language: "c",
    difficulty: "easy",
    lines: [
      "#include <stdio.h>",
      "",
      "int main() {",
      '    printf("Hello, World!\\n");',
      "    return 0;",
      "}",
    ],
  },
  {
    language: "c",
    difficulty: "easy",
    lines: [
      "void swap(int *a, int *b) {",
      "    int temp = *a;",
      "    *a = *b;",
      "    *b = temp;",
      "}",
    ],
  },
  {
    language: "c",
    difficulty: "hard",
    lines: [
      "struct Node {",
      "    int data;",
      "    struct Node *next;",
      "};",
      "",
      "void insert(struct Node **head, int data) {",
      "    struct Node *new = malloc(sizeof(struct Node));",
      "    new->data = data;",
      "    new->next = *head;",
      "    *head = new;",
      "}",
    ],
  },
];

export const cppSnippets: CodeSnippet[] = [
  {
    language: "cpp",
    difficulty: "hard",
    lines: [
      "#include <iostream>",
      "#include <vector>",
      "",
      "int main() {",
      "    std::vector<int> nums = {1, 2, 3, 4, 5};",
      "    for (int n : nums) {",
      "        std::cout << n << std::endl;",
      "    }",
      "    return 0;",
      "}",
    ],
  },
  {
    language: "cpp",
    difficulty: "medium",
    lines: [
      "class Rectangle {",
      "private:",
      "    int width, height;",
      "public:",
      "    Rectangle(int w, int h) : width(w), height(h) {}",
      "    int area() const { return width * height; }",
      "};",
    ],
  },
];

export const csharpSnippets: CodeSnippet[] = [
  {
    language: "csharp",
    difficulty: "easy",
    lines: [
      "public class Program {",
      "    public static void Main(string[] args) {",
      '        Console.WriteLine("Hello, World!");',
      "    }",
      "}",
    ],
  },
  {
    language: "csharp",
    difficulty: "medium",
    lines: [
      "public record User(int Id, string Name, string Email);",
      "",
      "var users = await context.Users",
      "    .Where(u => u.IsActive)",
      "    .OrderBy(u => u.Name)",
      "    .ToListAsync();",
    ],
  },
];

export const rubySnippets: CodeSnippet[] = [
  {
    language: "ruby",
    difficulty: "hard",
    lines: [
      "class User",
      "  attr_accessor :name, :email",
      "",
      "  def initialize(name, email)",
      "    @name = name",
      "    @email = email",
      "  end",
      "",
      "  def greet",
      '    puts "Hello, #{@name}!"',
      "  end",
      "end",
    ],
  },
  {
    language: "ruby",
    difficulty: "easy",
    lines: [
      "numbers = [1, 2, 3, 4, 5]",
      "squared = numbers.map { |n| n ** 2 }",
      "evens = squared.select { |n| n.even? }",
      "puts evens.sum",
    ],
  },
];

export const phpSnippets: CodeSnippet[] = [
  {
    language: "php",
    difficulty: "medium",
    lines: [
      "<?php",
      "class UserController {",
      "    public function index() {",
      "        $users = User::all();",
      "        return view('users.index', compact('users'));",
      "    }",
      "}",
    ],
  },
  {
    language: "php",
    difficulty: "easy",
    lines: [
      "<?php",
      "function factorial(int $n): int {",
      "    if ($n <= 1) return 1;",
      "    return $n * factorial($n - 1);",
      "}",
    ],
  },
];

export const swiftSnippets: CodeSnippet[] = [
  // Easy
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "func greet(name: String) -> String {",
      '    return "Hello, \\(name)!"',
      "}",
      "",
      'print(greet(name: "World"))',
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "let numbers = [1, 2, 3, 4, 5]",
      "let doubled = numbers.map { $0 * 2 }",
      "print(doubled)",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "struct Point {",
      "    var x: Double",
      "    var y: Double",
      "}",
      "",
      "let origin = Point(x: 0, y: 0)",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "enum Result<T, E: Error> {",
      "    case success(T)",
      "    case failure(E)",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      'let optionalName: String? = "Alice"',
      "if let name = optionalName {",
      '    print("Hello, \\(name)")',
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "func factorial(_ n: Int) -> Int {",
      "    guard n > 1 else { return 1 }",
      "    return n * factorial(n - 1)",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      'let fruits = ["apple", "banana", "cherry"]',
      "for (index, fruit) in fruits.enumerated() {",
      '    print("\\(index): \\(fruit)")',
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "easy",
    lines: [
      "extension String {",
      "    var reversed: String {",
      "        return String(self.reversed())",
      "    }",
      "}",
    ],
  },
  // Medium
  {
    language: "swift",
    difficulty: "medium",
    lines: [
      "struct User: Codable {",
      "    let id: Int",
      "    let name: String",
      "    let email: String",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "medium",
    lines: [
      "func fetchData(from url: URL) async throws -> Data {",
      "    let (data, response) = try await URLSession.shared.data(from: url)",
      "    guard let httpResponse = response as? HTTPURLResponse,",
      "          httpResponse.statusCode == 200 else {",
      "        throw URLError(.badServerResponse)",
      "    }",
      "    return data",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "medium",
    lines: [
      "protocol Drawable {",
      "    func draw()",
      "}",
      "",
      "struct Circle: Drawable {",
      "    let radius: Double",
      "    func draw() {",
      '        print("Drawing circle with radius \\(radius)")',
      "    }",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "medium",
    lines: [
      "@propertyWrapper",
      "struct Clamped<Value: Comparable> {",
      "    var value: Value",
      "    let range: ClosedRange<Value>",
      "    ",
      "    var wrappedValue: Value {",
      "        get { value }",
      "        set { value = min(max(range.lowerBound, newValue), range.upperBound) }",
      "    }",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "medium",
    lines: [
      "class ViewModel: ObservableObject {",
      "    @Published var items: [String] = []",
      "    ",
      "    func addItem(_ item: String) {",
      "        items.append(item)",
      "    }",
      "    ",
      "    func removeItem(at index: Int) {",
      "        items.remove(at: index)",
      "    }",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "medium",
    lines: [
      "func debounce<T>(delay: TimeInterval, action: @escaping (T) -> Void) -> (T) -> Void {",
      "    var workItem: DispatchWorkItem?",
      "    return { value in",
      "        workItem?.cancel()",
      "        workItem = DispatchWorkItem { action(value) }",
      "        DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: workItem!)",
      "    }",
      "}",
    ],
  },
  // Hard
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "func fetchUsers() async throws -> [User] {",
      '    let url = URL(string: "https://api.example.com/users")!',
      "    let (data, _) = try await URLSession.shared.data(from: url)",
      "    return try JSONDecoder().decode([User].self, from: data)",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "actor Counter {",
      "    private var count = 0",
      "    ",
      "    func increment() {",
      "        count += 1",
      "    }",
      "    ",
      "    func getCount() -> Int {",
      "        return count",
      "    }",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "class Cache<Key: Hashable, Value> {",
      "    private var storage: [Key: Value] = [:]",
      "    private let lock = NSLock()",
      "    ",
      "    subscript(key: Key) -> Value? {",
      "        get {",
      "            lock.lock()",
      "            defer { lock.unlock() }",
      "            return storage[key]",
      "        }",
      "        set {",
      "            lock.lock()",
      "            defer { lock.unlock() }",
      "            storage[key] = newValue",
      "        }",
      "    }",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "struct AnyView: View {",
      "    private let _body: () -> AnyView",
      "    ",
      "    init<V: View>(_ view: V) {",
      "        _body = { AnyView(view) }",
      "    }",
      "    ",
      "    var body: some View {",
      "        _body()",
      "    }",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "func withRetry<T>(",
      "    maxAttempts: Int = 3,",
      "    delay: TimeInterval = 1.0,",
      "    operation: () async throws -> T",
      ") async throws -> T {",
      "    var lastError: Error?",
      "    for attempt in 1...maxAttempts {",
      "        do {",
      "            return try await operation()",
      "        } catch {",
      "            lastError = error",
      "            if attempt < maxAttempts {",
      "                try await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))",
      "            }",
      "        }",
      "    }",
      "    throw lastError!",
      "}",
    ],
  },
  {
    language: "swift",
    difficulty: "hard",
    lines: [
      "@MainActor",
      "class AppState: ObservableObject {",
      "    @Published private(set) var user: User?",
      "    @Published private(set) var isLoading = false",
      "    ",
      "    func login(email: String, password: String) async throws {",
      "        isLoading = true",
      "        defer { isLoading = false }",
      "        user = try await AuthService.login(email: email, password: password)",
      "    }",
      "}",
    ],
  },
];

export const kotlinSnippets: CodeSnippet[] = [
  {
    language: "kotlin",
    difficulty: "hard",
    lines: [
      "data class User(val id: Int, val name: String, val email: String)",
      "",
      "fun main() {",
      "    val users = listOf(",
      '        User(1, "Alice", "alice@example.com"),',
      '        User(2, "Bob", "bob@example.com")',
      "    )",
      '    users.filter { it.name.startsWith("A") }',
      "        .forEach { println(it) }",
      "}",
    ],
  },
  {
    language: "kotlin",
    difficulty: "medium",
    lines: [
      "suspend fun fetchData(): Result<String> {",
      "    return try {",
      "        val response = client.get(url)",
      "        Result.success(response.body())",
      "    } catch (e: Exception) {",
      "        Result.failure(e)",
      "    }",
      "}",
    ],
  },
];

export const scalaSnippets: CodeSnippet[] = [
  {
    language: "scala",
    difficulty: "hard",
    lines: [
      "case class User(id: Int, name: String, email: String)",
      "",
      "object Main extends App {",
      "  val users = List(",
      '    User(1, "Alice", "alice@example.com"),',
      '    User(2, "Bob", "bob@example.com")',
      "  )",
      '  users.filter(_.name.startsWith("A")).foreach(println)',
      "}",
    ],
  },
];

export const luaSnippets: CodeSnippet[] = [
  {
    language: "lua",
    difficulty: "medium",
    lines: [
      "function factorial(n)",
      "    if n <= 1 then",
      "        return 1",
      "    end",
      "    return n * factorial(n - 1)",
      "end",
      "",
      "print(factorial(5))",
    ],
  },
  {
    language: "lua",
    difficulty: "hard",
    lines: [
      "local User = {}",
      "User.__index = User",
      "",
      "function User:new(name)",
      "    local self = setmetatable({}, User)",
      "    self.name = name",
      "    return self",
      "end",
    ],
  },
];

export const zigSnippets: CodeSnippet[] = [
  {
    language: "zig",
    difficulty: "medium",
    lines: [
      'const std = @import("std");',
      "",
      "pub fn main() void {",
      "    const stdout = std.io.getStdOut().writer();",
      '    stdout.print("Hello, World!\\n", .{}) catch {};',
      "}",
    ],
  },
];

export const liquidSnippets: CodeSnippet[] = [
  {
    language: "liquid",
    difficulty: "easy",
    lines: [
      "{% if product.available %}",
      "  <span>{{ product.price | money }}</span>",
      "{% else %}",
      "  <span>Sold out</span>",
      "{% endif %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "easy",
    lines: [
      "{% for item in cart.items %}",
      "  <div>{{ item.product.title }}</div>",
      "  <span>{{ item.quantity }}</span>",
      "{% endfor %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "medium",
    lines: [
      "{% assign featured = collections.frontpage.products %}",
      "{% for product in featured limit: 4 %}",
      '  <div class="product-card">',
      "    <img src=\"{{ product.featured_image | img_url: 'medium' }}\">",
      "    <h3>{{ product.title }}</h3>",
      "    <p>{{ product.price | money }}</p>",
      "  </div>",
      "{% endfor %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "medium",
    lines: [
      "{% paginate collection.products by 12 %}",
      "  {% for product in collection.products %}",
      "    {% render 'product-card', product: product %}",
      "  {% endfor %}",
      "  {{ paginate | default_pagination }}",
      "{% endpaginate %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "hard",
    lines: [
      "{% schema %}",
      "{",
      '  "name": "Featured Collection",',
      '  "settings": [',
      "    {",
      '      "type": "collection",',
      '      "id": "collection",',
      '      "label": "Collection"',
      "    },",
      "    {",
      '      "type": "range",',
      '      "id": "products_to_show",',
      '      "min": 2,',
      '      "max": 12,',
      '      "default": 4,',
      '      "label": "Products to show"',
      "    }",
      "  ]",
      "}",
      "{% endschema %}",
    ],
  },
  {
    language: "liquid",
    difficulty: "hard",
    lines: [
      "{% capture product_form_id %}product-form-{{ section.id }}{% endcapture %}",
      "{% form 'product', product, id: product_form_id %}",
      '  <select name="id">',
      "    {% for variant in product.variants %}",
      '      <option value="{{ variant.id }}">',
      "        {{ variant.title }} - {{ variant.price | money }}",
      "      </option>",
      "    {% endfor %}",
      "  </select>",
      '  <button type="submit">Add to cart</button>',
      "{% endform %}",
    ],
  },
];

export function getSnippetsByLanguage(language: string): CodeSnippet[] {
  switch (language) {
    case "javascript":
      return javascriptSnippets;
    case "typescript":
      return typescriptSnippets;
    case "python":
      return pythonSnippets;
    case "rust":
      return rustSnippets;
    case "golang":
      return golangSnippets;
    case "java":
      return javaSnippets;
    case "c":
      return cSnippets;
    case "cpp":
      return cppSnippets;
    case "csharp":
      return csharpSnippets;
    case "ruby":
      return rubySnippets;
    case "php":
      return phpSnippets;
    case "swift":
      return swiftSnippets;
    case "kotlin":
      return kotlinSnippets;
    case "scala":
      return scalaSnippets;
    case "lua":
      return luaSnippets;
    case "zig":
      return zigSnippets;
    case "liquid":
      return liquidSnippets;
    default:
      return javascriptSnippets;
  }
}

export function getRandomSnippet(language: string): CodeSnippet {
  const snippets = getSnippetsByLanguage(language);
  return snippets[Math.floor(Math.random() * snippets.length)];
}

// Get all snippets across all languages
function getAllSnippets(): CodeSnippet[] {
  return [
    ...javascriptSnippets,
    ...typescriptSnippets,
    ...pythonSnippets,
    ...rustSnippets,
    ...golangSnippets,
    ...javaSnippets,
    ...cSnippets,
    ...cppSnippets,
    ...csharpSnippets,
    ...rubySnippets,
    ...phpSnippets,
    ...swiftSnippets,
    ...kotlinSnippets,
    ...scalaSnippets,
    ...luaSnippets,
    ...zigSnippets,
    ...liquidSnippets,
  ];
}

export function getRandomSnippetByDifficulty(
  language: string,
  difficulty: Difficulty,
): CodeSnippet {
  // If language is "all", search across all languages
  const snippets =
    language === "all" ? getAllSnippets() : getSnippetsByLanguage(language);

  // Filter by difficulty
  const filtered = snippets.filter((s) => s.difficulty === difficulty);

  // If no snippets match the difficulty for this language, fall back to any snippet
  if (filtered.length === 0) {
    return snippets[Math.floor(Math.random() * snippets.length)];
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}
