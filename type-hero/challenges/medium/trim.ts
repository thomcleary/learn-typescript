// Answer
type Whitespace = " " | "\n" | "\t";

type Trim<S extends string> = S extends `${Whitespace}${infer Rest}` | `${infer Rest}${Whitespace}` ? Trim<Rest> : S;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];
