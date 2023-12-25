// Answer
type Chainable<C = {}, Keys extends string[] = []> = {
  option<K extends string, V>(
    key: K & (K extends Keys[number] ? number : string), // Reduce to `never` if `option` already called with this key
    value: V
  ): Chainable<Omit<C, K> & { [Key in K]: V }, [...Keys, K]>;
  get(): C;
};

// Tests
import type { Alike, Expect } from "@type-challenges/utils";

declare const a: Chainable;

const result1 = a.option("foo", 123).option("bar", { value: "Hello World" }).option("name", "type-challenges").get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};
