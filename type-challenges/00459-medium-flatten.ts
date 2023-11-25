// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>, [{ foo: "bar"; 2: 10 }, "foobar"]>>
];

// ============= Your Code Here =============
type Flatten<Arr extends unknown[]> = Arr extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? Rest extends []
      ? [...Flatten<First>]
      : [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : Arr;

// ============= Popular Solution =============
type FlattenSolution<S extends any[], T extends any[] = []> = S extends [infer X, ...infer Y]
  ? X extends any[]
    ? FlattenSolution<[...X, ...Y], T>
    : FlattenSolution<[...Y], [...T, X]>
  : T;
