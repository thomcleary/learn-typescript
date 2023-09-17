/**
 * The `merge` function accepts an object of type `A`
 * and an object of type `B`, and return an object
 * with all properties of `A` and `B`.
 * Make it generic!
 */
namespace merge {
  // function merge(a: TODO, b: TODO): TODO {
  //   return { ...a, ...b };
  // }

  function merge<A, B>(a: A, b: B): A & B {
    return { ...a, ...b };
  }

  const res1 = merge({ name: "Bob" }, { age: 42 });
  type test1 = Expect<Equal<typeof res1, { name: string } & { age: number }>>;

  const res2 = merge({ greeting: "Hello" }, {});
  type test2 = Expect<Equal<typeof res2, { greeting: string }>>;

  const res3 = merge({}, { greeting: "Hello" });
  type test3 = Expect<Equal<typeof res3, { greeting: string }>>;

  const res4 = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  type test4 = Expect<Equal<typeof res4, { a: number; b: number } & { c: number; d: number }>>;
}
