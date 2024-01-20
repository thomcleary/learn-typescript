// Answer
type FlattenDepth<
  T extends unknown[],
  Depth extends number = 1,
  FlattenAcc extends "+"[] = []
> = ContainsArray<T> extends false
  ? T
  : FlattenAcc["length"] extends Depth
  ? T
  : FlattenDepth<Flatten<T>, Depth, [...FlattenAcc, "+"]>;

type ContainsArray<T extends unknown[], V extends T[number] = T[number]> = V extends unknown
  ? V extends Array<unknown>
    ? true
    : false
  : never;

type Flatten<T extends unknown[], F extends unknown[] = []> = T extends [infer First, ...infer Rest]
  ? First extends Array<infer _>
    ? Flatten<Rest, [...F, ...First]>
    : Flatten<Rest, [...F, First]>
  : F;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];
