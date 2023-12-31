// Answer
import { type Replace } from "./replace";

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
  Replaced extends string = ""
> = S extends `${infer Head}${From}${infer Tail}`
  ? ReplaceAll<Tail, From, To, `${Replaced}${Head}${Replace<From, From, To>}`>
  : `${Replaced}${S}`;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>
];

// Popular Solution
type ReplaceAllSolution<S extends string, From extends string, To extends string> = From extends ""
  ? S
  : S extends `${infer Start}${From}${infer End}`
  ? `${Start}${To}${ReplaceAll<End, From, To>}`
  : S;
