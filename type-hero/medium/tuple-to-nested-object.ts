// Answer
type TupleToNestedObject<T extends string[], U> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? {
      [K in First]: TupleToNestedObject<Rest, U>;
    }
  : U;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<["a", "b", "c"], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
