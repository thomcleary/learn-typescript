/**
 * Since intersections are applied recursively,
 * how would you write an `Assign<A, B>` type-level
 * function that matches the behavior of `{...a, ...b}`,
 * and overrides properties of `A` with properties of `B`?
 */
namespace assign {
  // type Assign<A, B> = TODO

  type Assign<A, B> = Omit<A, keyof B> & B;

  const assign = <A, B>(obj1: A, obj2: B): Assign<A, B> => ({
    ...obj1,
    ...obj2,
  });

  // Override `id`
  type res1 = Assign<{ name: string; id: number }, { id: string }>;
  type test1 = Expect<Equal<res1, { name: string } & { id: string }>>;

  // Override `age` and `role`
  type res2 = Assign<{ name: string; age: string; role: string }, { age: 42; role: "admin" }>;
  type test2 = Expect<Equal<res2, { name: string } & { age: 42; role: "admin" }>>;

  // No overlap
  type res3 = Assign<{ name: string; id: number }, { age: number }>;
  type test3 = Expect<Equal<res3, { name: string; id: number } & { age: number }>>;

  // Using type inference from values
  const res4 = assign({ name: "Bob", id: 4 }, { id: "3" });
  type test4 = Expect<Equal<typeof res4, { name: string } & { id: string }>>;
}
