/**
 * Lodash's `compact` function takes an array
 * that can contain "falsy values", and returns
 * an array with these values filtered out.
 * Write its generic type signature!
 *
 * Note: The list of "falsy" values is
 * false, null, 0, "", and undefined.
 */
namespace compact {
  // declare function compact(list: TODO): TODO;

  declare function compact<T>(list: T[]): RemoveFalsy<T>[];

  type Falsy = false | 0 | "" | null | undefined;
  type RemoveFalsy<T> = Exclude<T, Falsy>;

  let res1 = compact([1, 2, null, 3, undefined, 4]);
  type test1 = Expect<Equal<typeof res1, number[]>>;

  let res2 = compact([undefined, 0 as const, "a", "", "b", "c", "d"]);
  type test2 = Expect<Equal<typeof res2, string[]>>;

  let res3 = compact([...([1, undefined, true, "", "hello", null] as const)]);
  type test3 = Expect<Equal<typeof res3, (1 | true | "hello")[]>>;
}
