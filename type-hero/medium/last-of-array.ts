// Answer
type Last<T extends readonly unknown[]> = T extends readonly [...infer First, infer Last] ? Last : never;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

type additionalCases = [Expect<Equal<Last<[]>, never>>, Expect<Equal<Last<readonly [1, 2]>, 2>>];
