/**
 * You fetch data from an API that returns data as a nested JSON structure.
 * The shape of the data isn't very ergonomic, and you would like to
 * write a `deserialize` function that transforms the response into
 * a flatter structure.
 *
 * Your API returns entities with this shape:
 * `{ id, attributes, relationships }`.
 *
 * - `id` is the unique identifier of the current entity.
 * - `attributes` is an object containing all properties of the
 *   current entity.
 * - `relationships` is a record of other related entities.
 *    They can be either objects, or array of objects of
 *    shape `{ id, attributes, relationships }`.
 *
 * Type the generic `deserialize` function to take one of these objects,
 * and recursively flattens the `id`, `attributes` and `relationships` keys
 * to the same level of nesting.
 */
namespace jsonResponse {
  // declare function deserialize<T>(response: T): TODO;

  // recursively maps over each property in a structure of objects
  // and puts | never in front of all of them to force TypeScript to evaluate and display them.
  type Compute<T> = { [K in keyof T]: Compute<T[K]> } | never;

  type Obj = Record<PropertyKey, unknown>;

  type Response = { id: unknown; attributes: Obj; relationships?: Record<PropertyKey, Array<Response> | Obj> };

  declare function deserialize<T extends Response>(response: T): Compute<Deserialize<T>>;

  type Deserialize<T extends Response> = Pick<T, "id"> &
    T["attributes"] & {
      [K in keyof T["relationships"]]: T["relationships"][K] extends Response
        ? Deserialize<T["relationships"][K]>
        : T["relationships"][K] extends Array<infer R extends Response>
        ? Deserialize<R>[]
        : T["relationships"][K];
    };

  // simple object
  const res1 = deserialize({
    id: 1,
    type: "user",
    attributes: { name: "Gabriel", age: 29 },
  });
  type expected1 = { id: number; name: string; age: number };
  type test1 = Expect<Equal<typeof res1, expected1>>;

  // one relationship
  const res2 = deserialize({
    id: 1,
    type: "user",
    attributes: { name: "Gabriel", age: 29 },
    relationships: {
      bike: {
        id: 9,
        type: "bike",
        attributes: { wheelCount: 2, size: "medium" as const },
      },
    },
  });
  type expected2 = {
    id: number;
    name: string;
    age: number;
    bike: {
      id: number;
      wheelCount: number;
      size: "medium";
    };
  };
  type test2 = Expect<Equal<typeof res2, expected2>>;

  // several relationships
  const res3 = deserialize({
    id: 1,
    type: "user",
    attributes: { name: "Gabriel", age: 29 },
    relationships: {
      friends: [
        {
          id: 2,
          type: "user",
          attributes: { name: "Bob", age: 32 },
        },
      ],
      articles: [
        {
          id: 3,
          type: "article",
          attributes: { title: "Mapped Types", content: "..." },
        },
      ],
    },
  });
  type expected3 = {
    id: number;
    name: string;
    age: number;
    friends: { id: number; name: string; age: number }[];
    articles: { id: number; title: string; content: string }[];
  };
  type test3 = Expect<Equal<typeof res3, expected3>>;

  // Solution
  declare function deserializeSolution<T>(response: T): Compute<DeserializeSolution<T>>;

  type DeserializeSolution<T> = (T extends { id: infer Id; attributes: infer Attrs } ? { id: Id } & Attrs : {}) &
    DeserializeRelationships<T>;

  type DeserializeRelationships<T> = T extends { relationships: infer R }
    ? {
        [K in keyof R]: R[K] extends (infer V)[] ? DeserializeSolution<V>[] : DeserializeSolution<R[K]>;
      }
    : {};
}
