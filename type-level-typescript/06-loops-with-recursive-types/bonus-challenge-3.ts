/**
 * Write a `Take` type level function
 * that takes a tuple, a `N` number and
 * returns the first `N` elements of this
 * tuple.
 *
 * Hint: you will need to use T["length"]
 * to read the length of a tuple `T`.
 */
namespace take {
  // type Take<Tuple extends any[], N, Output extends any[] = []> = TODO;

  type Take<Tuple extends any[], N, Output extends any[] = []> = N extends 0
    ? []
    : N extends Output["length"]
    ? Output
    : Tuple extends [infer First, ...infer Rest]
    ? Take<Rest, N, [...Output, First]>
    : Output;

  // After viewing solution:
  // N extends 0 ? [] : ...
  // is not necessary
  // N extends Output["length"] ? Output : ...
  // will do the same check
  // that is, if N is 0 then N is assignable to Output["length"] on the first loop
  // and Output will be returned (which is [] on the first loop)
  type TakeSimplified<Tuple extends any[], N, Output extends any[] = []> = N extends Output["length"]
    ? Output
    : Tuple extends [infer First, ...infer Rest]
    ? Take<Rest, N, [...Output, First]>
    : Output;
  // Take <==> TakeSimplified

  type res1 = Take<[1, 2, 3], 2>;
  type test1 = Expect<Equal<res1, [1, 2]>>;

  type res2 = Take<[1, 2, 3], 1>;
  type test2 = Expect<Equal<res2, [1]>>;

  type res3 = Take<[1, 2, 3], 0>;
  type test3 = Expect<Equal<res3, []>>;

  type res4 = Take<[1, 2], 5>;
  type test4 = Expect<Equal<res4, [1, 2]>>;

  // Solution
  type TakeSolution<Tuple extends any[], N, Output extends any[] = []> =
    // 1. if our output has the right length, return it:
    Output["length"] extends N
      ? Output
      : // 2. if the input tuple isn't empty,
      //    add it's first value to the output
      //    and recurse on the rest:
      Tuple extends [infer First, ...infer Rest]
      ? Take<Rest, N, [...Output, First]>
      : // 3. if our tuple is empty, return the output:
        Output;
}
