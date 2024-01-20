// Answer
type GreaterThan<
  T extends number,
  U extends number,
  Tstring extends string = `${T}`,
  Ustring extends string = `${U}`
> = T extends U
  ? false
  : Length<Tstring> extends Length<Ustring>
  ? MoreSignificant<Tstring, Ustring>
  : LongerThan<Tstring, Ustring>;

type MoreSignificant<T extends string, U extends string, Tsplit = Split<T>, Usplit = Split<U>> = [
  Tsplit,
  Usplit
] extends [
  [infer Tfirst extends string, ...infer Trest extends string[]],
  [infer Ufirst extends string, ...infer Urest extends string[]]
]
  ? Tfirst extends Ufirst
    ? MoreSignificant<T, U, Trest, Urest>
    : LongerThan<StringOfLength<ToNumber<Tfirst>>, StringOfLength<ToNumber<Ufirst>>>
  : false;

type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

type StringOfLength<T extends number, Acc extends "+"[] = []> = Acc["length"] extends T
  ? Join<Acc>
  : StringOfLength<T, [...Acc, "+"]>;

type Join<A extends string[], S extends string = ""> = A extends [infer F extends string, ...infer R extends string[]]
  ? Join<R, `${S}${F}`>
  : S;

type LongerThan<
  T extends string,
  U extends string,
  Tsplit extends string[] = Split<T>,
  Usplit extends string[] = Split<U>
> = Tsplit extends []
  ? false
  : Usplit extends []
  ? true
  : LongerThan<T, U, Tsplit extends [infer _, ...infer R] ? R : [], Usplit extends [infer _, ...infer R] ? R : []>;

type Length<S extends string> = Split<S>["length"];

type Split<S extends string, Acc extends unknown[] = []> = S extends `${infer Head}${infer Tail}`
  ? Split<Tail, [...Acc, Head]>
  : Acc;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];
