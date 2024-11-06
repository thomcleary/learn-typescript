/**
 * `Mutable` should take an object with read-only properties
 * and make them mutable.
 *
 * Hint: the syntax to remove the `readonly` modifier
 * is pretty similar to the syntax to remove the `?` optional
 * modifier...
 */
namespace mutable {
  // type Mutable<Obj> = TODO;

  // First attempt before reading the hint lol (this does work though)
  // type Mutable<Obj> = keyof Obj extends infer Keys extends PropertyKey
  //   ? {
  //       [Key in Keys]: Key extends keyof Obj ? Obj[Key] : never;
  //     }
  //   : never;

  type Mutable<Obj> = {
    -readonly [K in keyof Obj]: Obj[K];
  };

  type res1 = Mutable<{ readonly name: string; readonly age: number }>;
  //   ^?
  type test1 = Expect<Equal<res1, { name: string; age: number }>>;

  type res2 = Mutable<{ readonly a: string; b: "not readonly" }>;
  //   ^?
  type test2 = Expect<Equal<res2, { a: string; b: "not readonly" }>>;
}
