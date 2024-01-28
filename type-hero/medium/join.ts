// Answer
type Join<T extends Primitive[], U extends Primitive> = T extends [
  infer F extends Primitive,
  ...infer R extends Primitive[]
]
  ? `${F}${R extends [] ? "" : U}${Join<R, U>}`
  : "";

type Primitive = string | number | bigint | boolean | null | undefined;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
  Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
  Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
  Expect<Equal<Join<["o"], "u">, "o">>,
  Expect<Equal<Join<[], "u">, "">>
];
