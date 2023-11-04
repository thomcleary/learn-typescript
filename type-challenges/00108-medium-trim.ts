// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str s ">, "str s">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];

// ============= Your Code Here =============
type Whitespace = " " | "\n" | "\t";

type Trim<S extends string> = S extends `${Whitespace}${infer Rest}`
  ? Trim<Rest>
  : S extends `${infer First}${Whitespace}`
  ? Trim<First>
  : S;

// Additional Tests
type additionalCases = [
  Expect<Equal<Trim<"a b c d ">, "a b c d">>,
  Expect<Equal<Trim<"  a  b  c  d  ">, "a  b  c  d">>,
  Expect<Equal<Trim<"   a   b   c   d   ">, "a   b   c   d">>
];

// ============= Popular Solution =============
type TrimSolution<S extends string> = S extends `${Whitespace}${infer T}` | `${infer T}${Whitespace}`
  ? TrimSolution<T>
  : S;
