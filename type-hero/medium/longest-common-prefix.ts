// Answer
import type { Equal, Expect } from "@type-challenges/utils";

type LongestCommonPrefix<
  T extends string[],
  P extends string = "",
> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? First extends ""
    ? P
    : Head<Rest[number]> extends Head<First>
      ? LongestCommonPrefix<[Tail<First>, ...Tails<Rest>], `${P}${Head<First>}`>
      : P
  : P;

type Head<S extends string> = S extends `${infer Head}${string}` ? Head : "";
type Tail<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail
  : "";

type Tails<S extends string[], Mapped extends string[] = []> = S extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? Tails<Rest, [...Mapped, Tail<First>]>
  : Mapped;

// Tests
type cases = [
  Expect<Equal<LongestCommonPrefix<["flower", "flow", "flight"]>, "fl">>,
  Expect<Equal<LongestCommonPrefix<["dog", "racecar", "race"]>, "">>,
  Expect<Equal<LongestCommonPrefix<["", "", ""]>, "">>,
  Expect<Equal<LongestCommonPrefix<["a", "", ""]>, "">>,
  Expect<Equal<LongestCommonPrefix<["", "a", ""]>, "">>,
  Expect<Equal<LongestCommonPrefix<["", "", "a"]>, "">>,
  Expect<Equal<LongestCommonPrefix<["a", "a", ""]>, "">>,
  Expect<Equal<LongestCommonPrefix<["a", "", "a"]>, "">>,
  Expect<Equal<LongestCommonPrefix<["", "a", "a"]>, "">>,
  Expect<Equal<LongestCommonPrefix<["a", "a", "a"]>, "a">>,
  Expect<Equal<LongestCommonPrefix<["abc", "abcd", "abcde"]>, "abc">>,
  Expect<Equal<LongestCommonPrefix<[" ", " ", " "]>, " ">>,
  Expect<
    Equal<
      LongestCommonPrefix<["type-challenges", "type-hero", "typescript"]>,
      "type"
    >
  >,
];
