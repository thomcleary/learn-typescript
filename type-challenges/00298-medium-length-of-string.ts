// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============
type LengthOfString<S extends string, Acc extends string[] = []> = S extends ""
  ? Acc["length"]
  : S extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [...Acc, First]>
  : Acc["length"];

// ============= Popular Solution =============
type LengthOfStringSolution<S extends string, T extends string[] = []> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T["length"];
