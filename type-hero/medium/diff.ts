// Answer
type Diff<O, O1> = Compute<Omit<O, keyof O1> & Omit<O1, keyof O>>;

type Compute<T> = {
  [K in keyof T]: T[K];
};

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// Popular Solution
type DiffSolution<O, O1> = Omit<O & O1, keyof (O | O1)>;
