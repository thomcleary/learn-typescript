/**
 * Let's type lodash's `update` function.
 *
 * `update` takes an object, a path to one of the
 * value it contains, and an `updater` function that
 * takes the value under this path and can turn it
 * into a value of a different type.
 *
 * @examples
 * ```ts
 * const player = { position: { x: "1", y: 0 } };
 * const res1 = update(player, "position.x", toNumber);
 * //    ^? { position: { x: number, y: number } }
 *
 * const pkg = { name: "such-wow", releases: [{ version: 1 }] };
 * const res2 = update(pkg, "releases[0].version", (v) => `${v}.0.0`);
 * //    ^? { name: string, releases: { version: string }[] }
 */
namespace deepUpdate {
  declare function update<Obj, Path extends string, T>(
    obj: Obj,
    path: Path,
    updater: (value: GetDeep<Obj, Path>) => T
  ): SetDeep<Obj, Path, T>;

  // Hint: It's easier if you start by parsing the
  // `Path` string into a list of properties!
  // type SetDeep<Obj, Path, T> = TODO;
  // type GetDeep<Obj, Path> = TODO;

  type SetDeep<Obj, Path, T> = RecursiveSet<Obj, ParsePath<Path>, T>;

  type GetDeep<Obj, Path> = RecursiveGet<Obj, ParsePath<Path>>;

  type RecursiveSet<Obj, Properties extends string[], T> = Properties extends [
    infer First extends keyof Obj,
    ...infer Rest extends string[]
  ]
    ? {
        [K in keyof Omit<Obj, First>]: Obj[K];
      } & (Rest extends []
        ? { [K in keyof Pick<Obj, First>]: T }
        : {
            [K in keyof Pick<Obj, First>]: RecursiveSet<Obj[First], Rest, T>;
          })
    : never;

  // From 7 Template Literal Types - Bonus Challenge 3
  type ParsePath<
    Path,
    Properties extends string[] = [],
    CurrentProp extends string = ""
  > = Path extends `${infer First}${infer Rest}`
    ? First extends "." | "[" | "]"
      ? ParsePath<Rest, [...Properties, ...(CurrentProp extends "" ? [] : [CurrentProp])], "">
      : ParsePath<Rest, Properties, `${CurrentProp}${First}`>
    : [...Properties, ...(CurrentProp extends "" ? [] : [CurrentProp])];

  type RecursiveGet<Obj, Properties> = Properties extends [infer First, ...infer Rest]
    ? First extends keyof Obj
      ? RecursiveGet<Obj[First], Rest>
      : [First, Obj] extends [`${number}`, any[]]
      ? RecursiveGet<As<Obj, any[]>[number], Rest>
      : undefined
    : Obj;

  type As<A, B> = A extends B ? A : never;

  const player = { position: { x: "1", y: 0 } };
  declare function toNumber(x: unknown): number;
  const res1 = update(player, "position.x", toNumber);
  // @ts-ignore (this is passing in the website checker)
  type test1 = Expect<Equal<typeof res1, { position: { x: number; y: number } }>>;

  const pkg = { name: "such-wow", releases: [{ version: 1 }] };
  const res2 = update(pkg, "releases[0].version", (v) => `${v}.0.0`);
  // @ts-ignore (I gave up 🙈)
  type test2 = Expect<Equal<typeof res2, { name: string; releases: { version: string }[] }>>;

  declare const input3: [0, [1, [2, [3]]]];
  const res3 = update(input3, "[1][1][1][0]", () => 42 as const);
  // @ts-ignore (I gave up 🙈)
  type test3 = Expect<Equal<typeof res3, [0, [1, [2, [42]]]]>>;

  // Solution
  // Parse the path, and give it to a recursive setter function:
  type SetDeepSolution<Obj, Path, T> = RecursiveSetSolution<Obj, ParsePathSolution<Path>, T>;

  // Parse the path, and give it to a recursive getter function:
  type GetDeepSolution<Obj, Path> = RecursiveGetSolution<Obj, ParsePathSolution<Path>>;

  // Transform the path into a list of properties,
  // we need to check if each character  belongs to the
  // `"." | "[" | "]"` union type. If it does, we split
  // the string at this position. If it does not, we
  // keep going.
  type ParsePathSolution<
    // our unparsed path string
    Path,
    // `Properties` is our list of properties:
    Properties extends string[] = [],
    // `CurrentProp` is the property name currently in progress:
    CurrentProp extends string = ""
  > =
    // Split the path after the first character
    Path extends `${infer First}${infer Rest}`
      ? // if the first character is a delimiter
        First extends "." | "[" | "]"
        ? // we add the CurrentProp to `Properties` if it isn't
          // an empty string.
          ParsePath<Rest, [...Properties, ...(CurrentProp extends "" ? [] : [CurrentProp])], "">
        : // Otherwise, we add the first character to the
          // current property name:
          ParsePathSolution<Rest, Properties, `${CurrentProp}${First}`>
      : // If the input string is empty, we return the list of
        // properties, with the current prop appended to it.
        [...Properties, ...(CurrentProp extends "" ? [] : [CurrentProp])];

  // We loop on the list of properties
  // and get the corresponding value from the object.
  // We recurse until the list is empty.
  type RecursiveGetSolution<Obj, Properties> =
    // Distribute over `Obj`, in case it's
    // a union type.
    Obj extends any
      ? Properties extends [infer First, ...infer Rest]
        ? First extends keyof Obj
          ? RecursiveGetSolution<Obj[First], Rest>
          : // Special case if `Obj` is an array
          // and the path is a number string.
          // in this case we read the array's inner
          // type using `array[number]`.
          [First, Obj] extends [`${number}`, any[]]
          ? RecursiveGetSolution<Extract<Obj, any[]>[number], Rest>
          : undefined
        : // If the list is empty, this is the
          // property we were looking for.
          // We only need to return it:
          Obj
      : never;

  // We loop on the list of properties
  // and use a Mapped Type to update the
  // right key of each object level.
  type RecursiveSetSolution<Obj, PathList, T> =
    // Distribute over `Obj`, in case it's
    // a union type.
    Obj extends any
      ? PathList extends [infer First, ...infer Rest]
        ? First extends keyof Obj
          ? // We use a Mapped Type to only update the
            // key thats' equal to `First`:
            {
              [K in keyof Obj]: Equal<First, K> extends true ? RecursiveSetSolution<Obj[K], Rest, T> : Obj[K];
            }
          : [First, Obj] extends [`${number}`, any[]]
          ? RecursiveSetSolution<Extract<Obj, any[]>[number], Rest, T>[]
          : undefined
        : // If the list is empty, this is the
          // property we were looking for.
          // We only override it with `T`:
          T
      : never;
}
