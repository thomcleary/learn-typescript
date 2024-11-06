/**
 * Build a `DeepRequired` generic that turns every
 * key of a nested object structure into a required property.
 */
namespace deepRequired {
  // type DeepRequired<T> = TODO;

  type Primitive = boolean | string | number | bigint | symbol | null | undefined;

  type DeepRequired<T> = {
    [K in keyof T]-?: T[K] extends Primitive ? T[K] : DeepRequired<T[K]>;
  };

  type res1 = DeepRequired<{ a?: string; b?: string }>;
  //   ^?
  type test1 = Expect<Equal<res1, { a: string; b: string }>>;

  type res2 = DeepRequired<{ a?: { b?: string; c?: { d?: string } } }>;
  //   ^?
  type test2 = Expect<Equal<res2, { a: { b: string; c: { d: string } } }>>;

  type res3 = DeepRequired<{ a?: string; b?: { c?: string; d?: number }[] }>;
  //   ^?
  type test3 = Expect<Equal<res3, { a: string; b: { c: string; d: number }[] }>>;

  // Solution
  type DeepRequiredSolution<T> = { [K in keyof T]-?: DeepRequiredSolution<T[K]> };
  // TypeScript won't map primitive types
}
