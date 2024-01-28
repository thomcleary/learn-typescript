// Answer
type Unique<T extends unknown[], U extends T[number][] = []> = T extends [infer F, ...infer R]
  ? Unique<R, [...U, ...(_Includes<U, F> extends true ? [] : [F])]>
  : U;

type _Includes<T extends unknown[], K> = T extends [infer F, ...infer R]
  ? _Equal<F, K> extends true
    ? true
    : _Includes<R, K>
  : false;

type _Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, "a", 2, "b", 2, "a"]>, [1, "a", 2, "b"]>>,
  Expect<Equal<Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>, [string, number, 1, "a", 2, "b"]>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>
];
