// Answer
type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
  ? IsTruthy<First> extends true
    ? true
    : AnyOf<Rest>
  : false;

type IsTruthy<T extends unknown> = T extends false | 0 | undefined | null | "" | []
  ? false
  : keyof T extends never // Check for {} value as {} type is the set of everything except (null | undefined)
  ? false
  : true;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>>,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// Popular Solution
type AnyOfSolution<T extends readonly any[]> = T extends Falsy[] ? false : true;

type Falsy = false | "" | null | undefined | 0 | [] | Record<any, never>;
