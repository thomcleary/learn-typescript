/**
 * combine Partial, Omit and Pick to create a generic
 * that makes the `id` key of an object type optional.
 */
namespace optionalId {
  // type MakeIdOptional<Obj extends { id: unknown }> = TODO;

  /**           This is called a type constraint.
   *            We'll learn more about them soon.
   *                         👇                      */
  type MakeIdOptional<Obj extends { id: unknown }> = Partial<Pick<Obj, "id">> & Omit<Obj, "id">;

  type res1 = MakeIdOptional<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<Equal<res1, { id?: number } & { name: string; age: unknown }>>;

  type res2 = MakeIdOptional<{
    id: string;
    title: string;
    content: string;
  }>;

  type test2 = Expect<Equal<res2, { id?: string } & { title: string; content: string }>>;
}
