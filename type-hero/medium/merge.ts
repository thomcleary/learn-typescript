// Answer
type Merge<F, S> = Compute<Omit<F, keyof S> & S>;

type Compute<T> = {
  [K in keyof T]: T[K];
};

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];
