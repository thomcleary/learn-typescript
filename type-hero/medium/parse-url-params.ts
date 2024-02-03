// Answer
type ParseUrlParams<T extends string, P extends string = never> = T extends `${infer _}:${infer Param}/${infer Tail}`
  ? ParseUrlParams<Tail, P | Param>
  : T extends `${infer _}:${infer Param}`
  ? P | Param
  : P;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParseUrlParams<"">, never>>,
  Expect<Equal<ParseUrlParams<":id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user">, "id" | "user">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user/like">, "id" | "user">>
];
