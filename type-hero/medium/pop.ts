// Answer
type Pop<T extends unknown[]> = T extends [...infer First, infer Last] ? First : T;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>,
  Expect<Equal<Pop<[]>, []>>
];
