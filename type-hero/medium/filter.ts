// Answer
type Filter<T extends unknown[], P, Filtered extends T[number][] = []> = T extends [infer First, ...infer Rest]
  ? Filter<Rest, P, [...Filtered, ...(First extends P ? [First] : [])]>
  : Filtered;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type Falsy = false | 0 | "" | null | undefined;

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>
];
