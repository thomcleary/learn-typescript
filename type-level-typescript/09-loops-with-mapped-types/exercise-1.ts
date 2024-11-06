/**
 * `Pick` is a built-in helper function that takes an object type
 * `Obj`, an arbitrary type `T` and removes any keys from `Obj`
 * that aren't assignable to `T`.
 *
 * Try to implement your own version of it!
 */
namespace pick {
  // type MyPick<Obj, T> = TODO;

  type MyPick<Obj extends object, T extends PropertyKey> = {
    [Key in Extract<keyof Obj, T>]: Obj[Key];
  };

  type res1 = MyPick<{ a: string; b: number; c: boolean }, "a">;
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = MyPick<{ a: string; b: number; c: boolean }, "a" | "b">;
  type test2 = Expect<Equal<res2, { a: string; b: number }>>;

  type res3 = MyPick<
    {
      getName: () => string;
      setName: (x: string) => void;
    },
    `get${string}`
  >;
  type test3 = Expect<Equal<res3, { getName: () => string }>>;

  // Alternative Soltution

  // Alternatively, we can use a constraint on `T`
  // and simply loop over it:
  type MyPickAlternative<Obj, T extends keyof Obj> = {
    [K in T]: Obj[K];
  };
  // This is how `Pick` is really implemented,
  // but unfortunately, this doesn't support template
  // literal types like `get${string}`.
}
