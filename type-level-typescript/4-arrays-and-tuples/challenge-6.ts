/**
 * Implement a generic that gets the length
 * of a tuple type.
 *
 * Hint:
 * How would you get the length of an array in JavaScript?
 * The type-level version is very similar :)
 */
namespace length {
  // type Length<Tuple extends any[]> = TODO;

  type Length<Tuple extends any[]> = Tuple["length"];

  type res1 = Length<[]>;
  type test1 = Expect<Equal<res1, 0>>;

  type res2 = Length<[any]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Length<[any, any]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = Length<[any, any, any]>;
  type test4 = Expect<Equal<res4, 3>>;

  type res5 = Length<[...["a", "b", "c"], ...[string, number, boolean]]>;
  type test5 = Expect<Equal<res5, 6>>;

  type res6 = Length<[...any[]]>;
  type test6 = Expect<Equal<res6, number>>;
}
