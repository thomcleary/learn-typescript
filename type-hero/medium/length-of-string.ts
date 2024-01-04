// Answer
type LengthOfString<S extends string, L extends "+"[] = []> = S extends `${infer _}${infer Tail}`
  ? LengthOfString<Tail, [...L, "+"]>
  : L["length"];

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];
