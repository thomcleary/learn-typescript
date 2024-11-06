/**
 * The `flatten` function takes a heterogeneous array
 * that can contain arrays, but also regular values.
 * It should flatten arrays but should leave other
 * values unchanged.
 *
 * Note: This is *not* a recursive flatten!
 * Only one level of nesting should be removed.
 */
namespace heterogeneousFlatten {
  // type Flatten<Arr extends any[]> = TODO;

  type Flatten<Arr extends any[]> = (Arr extends (infer Value)[]
    ? Value extends (infer InnerValue)[]
      ? InnerValue
      : Value
    : never)[] & {};
  // Doing `& {}` is weird TypeScript trick to make the type
  // you see in intellisense nicer
  // Without it, the type for res3 appears as
  // Flatten<(string | number[])[]>
  // With it, the type appears as
  // (string | number)[]

  declare function flatten<A extends any[]>(arr: A): Flatten<A>;

  let res1 = flatten([1, 2, [3, 4]]);
  type test1 = Expect<Equal<typeof res1, number[]>>;

  // if the array is already flat, leave it unchanged
  let res2 = flatten(["a", "b", "c", "d"]);
  type test2 = Expect<Equal<typeof res2, string[]>>;

  // This should work when the types of values are different.
  let res3 = flatten(["a", "b", [3, 4]]);
  type test3 = Expect<Equal<typeof res3, (number | string)[]>>;

  // This should work when the types of values are different.
  let res4 = flatten(["a", ["b"], [3, [4, 5]]]);
  type test4 = Expect<Equal<typeof res4, (number | string | number[])[]>>;

  // Solution
  type FlattenSolution<Arr extends any[]> =
    // Assign the content of the array
    // to an `Item` variable. Note that
    // `Item` is a union of several types:
    Arr extends (infer Item)[]
      ? // Unwrap each array element of Item.
        // Wrap the resulting union type in
        // an array.
        UnwrapArray<Item>[]
      : // This branch is unreachable.
        never;

  type UnwrapArray<T> =
    // Distribute `T`. If it's an
    // array, return its content,
    // otherwise, return `T`
    T extends (infer Item)[] ? Item : T;
}
