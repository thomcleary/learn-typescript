/**
 * Let's improve the type-safety of lodash's `omitBy` function.
 * `omitBy` takes an object, a type predicate, and removes
 * keys that do not pass this predicate.
 *
 * The output type should:
 * - Keep keys that are *not* assignable to the predicate's return type.
 * - Remove keys that are *equal* to the predicate's return type.
 * - Make keys that aren't equal but *assignable* to the predicate's
 *   return type *optional*.
 *
 * @examples:
 *
 * let res1 = omitBy({ name: 'a', age: 1 }, isNumber) // => { name: 'a' }
 * //    ^? { name: string }
 * let res2 = omitBy({ name: 'a', age: 1 }, isString) // => { age: 1 }
 * //    ^? { age: number }
 * let res3 = omitBy({ key: Math.random() > .5 ? 'a' : 1 }, isString)
 * //    ^? { key?: number }
 */
namespace omitBy {
  // declare function omitBy(obj: TODO, predicate: (value: TODO) => value is TODO): OmitBy<TODO, TODO>;

  // type OmitBy<Obj, OmittedValue> = TODO;

  declare function omitBy<Obj extends object, OmittedValue extends unknown>(
    obj: Obj,
    predicate: (value: unknown) => value is OmittedValue
  ): OmitBy<Obj, OmittedValue>;

  type OmitBy<Obj, OmittedValue> = FromEntries<ExcludeOptional<Entries<Obj>, OmittedValue>> &
    FromEntriesOptional<ExtractOptional<Entries<Obj>, OmittedValue>>;

  type FromEntries<Entries extends [any, any]> = { [Entry in Entries as Entry[0]]: Entry[1] };

  type FromEntriesOptional<Entries extends [any, any]> = { [Entry in Entries as Entry[0]]?: Entry[1] };

  type ExtractOptional<Entries, OmittedValue> = ExcludeUnassignable<
    Entries extends [infer Key, infer Value]
      ? OmittedValue extends Value
        ? [Key, Exclude<Value, OmittedValue>]
        : never
      : never,
    OmittedValue
  >;

  type ExcludeOptional<Entries, OmittedValue> = ExcludeUnassignable<
    Entries extends [infer Key, infer Value] ? (OmittedValue extends Value ? never : [Key, Value]) : never,
    OmittedValue
  >;

  type ExcludeUnassignable<Entries, OmittedValue> = Exclude<Entries, [any, OmittedValue]>;

  type Entries<Obj> = {
    [K in keyof Obj]: [K, Obj[K]];
  }[keyof Obj];

  // Predicate functions:
  const isUndefined = (x: unknown): x is undefined => typeof x === "undefined";
  const isNumber = (x: unknown): x is number => typeof x === "number";
  const isString = (x: unknown): x is string => typeof x === "string";

  // Tests:
  declare const user: { name: string; age: number | undefined };
  const res1 = omitBy(user, isUndefined);
  //    ^?
  type test1 = Expect<Equal<typeof res1, { name: string; age?: number }>>;

  declare const video: { src: string; createdAt: number; updatedAt: number };
  const res2 = omitBy(video, isNumber);
  //    ^?
  type test2 = Expect<Equal<typeof res2, { src: string }>>;

  declare const image: { src: string; id: number | string };
  const res3 = omitBy(image, isString);
  //    ^?
  type test3 = Expect<Equal<typeof res3, { id?: number }>>;

  // Solution
  // We need two type parameters.
  declare function omitBySolution<
    // The input object:
    Obj,
    // and the type of value we want to omit:
    Omitted extends ValueOf<Obj>
  >(obj: Obj, predicate: (value: ValueOf<Obj>) => value is Omitted): OmitBySolution<Obj, Omitted>;

  // ValueOf from chapter 3:
  type ValueOf<T> = T[keyof T];

  // This function computes our return type.
  type OmitBySolution<Obj, Omitted> =
    // 1. We create a Mapped Types containing keys *assignable* to the
    //    `Omitted` type. This is the what handles optional keys.
    {
      [Key in GetOptionalKeys<Obj, Omitted>]?: Exclude<Obj[Key], Omitted>;
    } & //    are *not* assignable to the omitted values. // 2. We intersect it with types that only contain keys that
    Pick<Obj, GetRequiredKeys<Obj, Omitted>>;

  // This function returns keys for values that are assignable
  // but different from the `Omitted` type.
  type GetOptionalKeys<
    Obj,
    Omitted,
    // 1. First, let's assign `keyof Obj` to a `K` variable.
    K extends keyof Obj = keyof Obj
  > =
    // 2. We then *map over* K using distributivity
    //    (Read chapter 8 for more detail):
    K extends unknown
      ? // If `Omitted` is assignable to this value,
        // BUT they are different types, we return the key
        PartiallyOverlap<Omitted, Obj[K]> extends true
        ? K
        : // Otherwise, we filter it out.
          never
      : never;

  // This type checks if `A` is assignable to `B`
  // but are different types.
  type PartiallyOverlap<A, B> = [A] extends [B] ? ([B] extends [A] ? false : true) : false;

  // This function returns keys for values that are *not* assignable
  // to the `Omitted` type.
  type GetRequiredKeys<
    Obj,
    Omitted,
    // 1. First, let's assign `keyof Obj` to a `K` variable.
    K extends keyof Obj = keyof Obj
  > =
    // 2. We then *map over* K using distributivity
    //    (Read chapter 8 for more detail):
    K extends unknown ? ([Omitted] extends [Obj[K]] ? never : K) : never;
}
