/**
 * Implement a `FromEntries` generic, transforming
 * a union of [key, value] entries into an object type.
 */
namespace fromEntries {
  // type FromEntries<Entries extends [any, any]> = TODO;

  // Should this be Entries extends [PropertyKey, unknown] instead?
  type FromEntries<Entries extends [any, any]> = {
    [Key in Entries[0]]: Entries extends [Key, infer Value] ? Value : never;
  };

  type res1 = FromEntries<["a", string]>;
  //   ^?
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = FromEntries<["a", string] | ["b", number]>;
  //   ^?
  type test2 = Expect<Equal<res2, { a: string; b: number }>>;

  type res3 = FromEntries<never>;
  //   ^?
  type test3 = Expect<Equal<res3, {}>>;

  // Solution
  type FromEntriesSolution<Entries extends [any, any]> = {
    [Entry in Entries as Entry[0]]: Entry[1];
  };

  type res1Solution = FromEntriesSolution<["a", string]>;
  //   ^?
  type test1Solution = Expect<Equal<res1Solution, { a: string }>>;

  type res2Solution = FromEntriesSolution<["a", string] | ["b", number]>;
  //   ^?
  type test2Solution = Expect<Equal<res2Solution, { a: string; b: number }>>;

  type res3Solution = FromEntriesSolution<never>;
  //   ^?
  type test3Solution = Expect<Equal<res3Solution, {}>>;
}
