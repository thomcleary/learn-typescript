// Answer
type Without<T extends unknown[], U extends T[number] | T[number][]> = T extends [infer F, ...infer R]
  ? [...(F extends (U extends Array<infer V> ? V : U) ? [] : [F]), ...Without<R, U>]
  : T;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];
