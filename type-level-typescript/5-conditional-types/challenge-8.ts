/**
 * Implement the AND logical door:
 * AND<true, true> => true
 * AND<false, false> => false
 * AND<true, false> => false
 * AND<false, true> => false
 *
 * Hint: you can check several values at once by wrapping
 *       them in a tuple type (pattern matching).
 */
namespace and {
  // type AND<A, B> = TODO;

  type AND<A extends boolean, B extends boolean> = [A, B] extends [true, true] ? true : false;

  type res1 = AND<true, true>;
  type test1 = Expect<Equal<res1, true>>;

  type res2 = AND<false, false>;
  type test2 = Expect<Equal<res2, false>>;

  type res3 = AND<true, false>;
  type test3 = Expect<Equal<res3, false>>;

  type res4 = AND<false, true>;
  type test4 = Expect<Equal<res4, false>>;
}
