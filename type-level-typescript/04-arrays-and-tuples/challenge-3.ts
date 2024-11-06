/**
 * Implement a generic that concatenates two tuples.
 */
namespace concat {
  // type Concat<Tuple1 extends any[], Tuple2 extends any[]> = TODO;

  type Concat<Tuple1 extends any[], Tuple2 extends any[]> = [...Tuple1, ...Tuple2];

  type res1 = Concat<[1, 2, 3], [4, 5]>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4, 5]>>;

  type res2 = Concat<[1, 2, 3], []>;
  type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}
