/**
 * Implement a generic that extracts
 * the last element of a tuple.
 */
namespace last {
  // type Last<Tuple extends any[]> = TODO

  type Last<Tuple extends unknown[]> = Tuple extends [infer First, ...unknown[], infer MaybeLast]
    ? MaybeLast extends never
      ? First
      : MaybeLast
    : Tuple extends [...unknown[], infer DefinitelyLast]
    ? DefinitelyLast
    : never;

  // Solution
  type SolutionLast<Tuple extends any[]> = Tuple extends [...any[], infer LastItem]
    ? //                                                👆
      //                         This will match all elements
      //                         in the tuple, except the last
      //                         one.
      LastItem
    : // 👆
      // `infer` defines a new type variable
      // which we return here.
      never;

  // Wow that one's simpler than I thought...
  type BetterLast<Tuple extends unknown[]> = Tuple extends [...unknown[], infer Last] ? Last : never;

  type res1 = Last<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, 3>>;

  type res2 = Last<[1]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Last<[]>;
  type test3 = Expect<Equal<res3, never>>;

  type res1b = BetterLast<[1, 2, 3]>;
  type test1b = Expect<Equal<res1b, 3>>;

  type res2b = BetterLast<[1]>;
  type test2b = Expect<Equal<res2b, 1>>;

  type res3b = BetterLast<[]>;
  type test3b = Expect<Equal<res3b, never>>;
}
