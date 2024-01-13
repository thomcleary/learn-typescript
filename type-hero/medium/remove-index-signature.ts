// Answer
type RemoveIndexSignature<T> = {
  [Key in keyof T as IsIndexSignature<Key> extends true ? never : Key]: T[Key];
};

type IsIndexSignature<T> = string extends T ? true : number extends T ? true : symbol extends T ? true : false;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol("foobar");
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];

// Popular Solution
type RemoveIndexSignatureSolution<T> = {
  [K in keyof T as PropertyKey extends Exclude<PropertyKey, K> ? K : never]: T[K];
};
