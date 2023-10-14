// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];

// ============= Your Code Here =============
type TupleToUnion<T extends [unknown, ...unknown[]], U = never> = T extends [infer First, ...infer Rest]
  ? Rest extends [unknown, ...unknown[]]
    ? TupleToUnion<Rest, U | First>
    : U | First
  : U;

type Test1 = TupleToUnion<[123, "456", true]>;
//   ^?
type Test2 = TupleToUnion<[123]>;
//   ^?
type Test3 = TupleToUnion<[keyof { a: 1; b: 2; c: [3] }]>;
//   ^?

// ============= Popular Solution =============
export type TupleToUnionSolution<T> = T extends Array<infer ITEMS> ? ITEMS : never;
