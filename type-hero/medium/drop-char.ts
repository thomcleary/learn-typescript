// Answer
type DropChar<S extends string, C extends string, R extends string = ""> = S extends `${infer Head}${infer Tail}`
  ? DropChar<Tail, C, `${R}${Head extends C ? "" : Head}`>
  : R;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

// Popular Solution
type DropCharSolution<S, C extends string> = S extends `${infer Start}${C}${infer Rest}`
  ? `${Start}${DropChar<Rest, C>}`
  : S;
