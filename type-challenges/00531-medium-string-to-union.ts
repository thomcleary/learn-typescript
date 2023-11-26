// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<Equal<StringToUnion<"coronavirus">, "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s">>
];

// ============= Your Code Here =============
type StringToUnion<T extends string, U = never> = T extends `${infer First}${infer Rest}`
  ? StringToUnion<Rest, U | First>
  : U;

// ============= Popular Solution =============
type StrintToUnionSolution<T extends string> = T extends `${infer Letter}${infer Rest}`
  ? Letter | StrintToUnionSolution<Rest>
  : never;
