/**
 * Implement a generic that gets the length
 * of a tuple type, and adds one to it.
 *
 * This challenge may seem a bit random, but
 * this is actually the basis of representing
 * numbers and doing arithmetics at the type level!
 */
namespace lengthPlusOne {
  // type LengthPlusOne<Tuple extends any[]> = TODO;

  type LengthPlusOne<Tuple extends any[]> = [...Tuple, "add 1"]["length"];

  type res1 = LengthPlusOne<[]>;
  type test1 = Expect<Equal<res1, 1>>;

  type res2 = LengthPlusOne<[any]>;
  type test2 = Expect<Equal<res2, 2>>;

  type res3 = LengthPlusOne<[any, any]>;
  type test3 = Expect<Equal<res3, 3>>;

  type res4 = LengthPlusOne<[any, any, any]>;
  type test4 = Expect<Equal<res4, 4>>;
}
