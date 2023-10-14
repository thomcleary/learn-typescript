// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

// ============= Your Code Here =============
type Last<T extends any[]> = T extends [...infer First, infer Last] ? Last : never;

// ============= Popular Solution =============
type LastSolution<T extends any[]> = [any, ...T][T["length"]];

type casesSolution = [
  Expect<Equal<LastSolution<[2]>, 2>>,
  Expect<Equal<LastSolution<[3, 2, 1]>, 1>>,
  Expect<Equal<LastSolution<[() => 123, { a: string }]>, { a: string }>>
];
