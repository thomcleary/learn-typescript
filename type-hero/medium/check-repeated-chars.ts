// Answer
type CheckRepeatedChars<T extends string, Chars extends string = never> = T extends `${infer Head}${infer Tail}`
  ? Head extends Chars
    ? true
    : CheckRepeatedChars<Tail, Chars | Head>
  : false;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
];
