/**
 * Re-implement `SpacesToUnderscores` by defining a `Split`
 * and a `Join` generic that behaves like the value-level
 * `.split(separator)` and `.join(separator)` methods.
 */
namespace spitAndJoin {
  type SpacesToUnderscores<Str> = Join<Split<Str, " ">, "_">;

  // type Split<Str, Separator extends string> = TODO;
  type Split<Str, Separator extends string> = Str extends `${infer First}${Separator}${infer Rest}`
    ? [First, ...Split<Rest, Separator>]
    : [Str];

  // type Join<List, Separator extends string> = TODO;
  type Join<List, Separator extends string> = List extends [infer First extends string, ...infer Rest extends string[]]
    ? Rest extends []
      ? First
      : `${First}${Separator}${Join<Rest, Separator>}`
    : never;

  type res1 = Split<"a.b.c", ".">;
  type test1 = Expect<Equal<res1, ["a", "b", "c"]>>;

  type res2 = Join<["a", "b", "c"], ".">;
  type test2 = Expect<Equal<res2, "a.b.c">>;

  type res3 = SpacesToUnderscores<"hey">;
  type test3 = Expect<Equal<res3, "hey">>;

  type res4 = SpacesToUnderscores<"user name">;
  type test4 = Expect<Equal<res4, "user_name">>;

  type res5 = SpacesToUnderscores<"type level typescript">;
  type test5 = Expect<Equal<res5, "type_level_typescript">>;

  // Solutions
  type SplitSolution<Str, Separator extends string> = Str extends `${infer Start}${Separator}${infer Rest}`
    ? [Start, ...Split<Rest, Separator>]
    : [Str];

  type JoinSolution<List, Separator extends string> = List extends [infer First]
    ? First
    : List extends [infer First, ...infer Rest]
    ? `${As<First, string>}${Separator}${Join<Rest, Separator>}`
    : "";
  type As<A, B> = A extends B ? A : never;
}
