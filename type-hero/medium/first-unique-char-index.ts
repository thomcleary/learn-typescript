// Answer
type FirstUniqueCharIndex<T extends string, I extends "+"[] = []> = T extends `${infer Head}${infer Tail}`
  ? Tail extends `${infer _}${Head}${infer _}`
    ? FirstUniqueCharIndex<RemoveChar<Tail, Head>, [...I, "+"]>
    : I["length"]
  : -1;

type RemoveChar<T extends string, K extends string, S extends string = ""> = T extends `${infer Head}${infer Tail}`
  ? RemoveChar<Tail, K, Head extends K ? S : `${S}${Head}`>
  : S;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];
