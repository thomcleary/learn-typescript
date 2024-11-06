/**
 * Type the `querySelector` function to return an HTMLElement of the
 * right type!
 *
 * Hint: TypeScript standard library exposes a `HTMLElementTagNameMap` type
 * containing all element types stored by their HTML tag name. Use it
 * to turn tag names into element types!
 */
namespace querySelector {
  type P = HTMLElementTagNameMap["p"];
  //   👆 For example, here is how to get the element type for "p".

  function querySelector<S extends string>(selector: S): SelectorToElement<S> | null {
    return document.querySelector(selector) as any;
  }

  // type SelectorToElement<Selector> = TODO;

  type HTMLTag = keyof HTMLElementTagNameMap;
  type GetTag<TagName extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[TagName];

  type SelectorToElement<Selector> = Selector extends `${infer Left} ${infer Right}`
    ? SelectorToElement<Right>
    : Selector extends `${infer Tag extends HTMLTag}${infer _}`
    ? GetTag<Tag>
    : Selector extends `${infer Tag extends HTMLTag}.${infer _}`
    ? GetTag<Tag>
    : Selector extends `${infer Tag extends HTMLTag}:${infer _}`
    ? GetTag<Tag>
    : never;

  const res1 = querySelector("p");
  type test1 = Expect<Equal<typeof res1, HTMLParagraphElement | null>>;

  const res2 = querySelector("div.className");
  type test2 = Expect<Equal<typeof res2, HTMLDivElement | null>>;

  const res3 = querySelector("div > a");
  type test3 = Expect<Equal<typeof res3, HTMLAnchorElement | null>>;

  const res4 = querySelector("p[attr]");
  type test4 = Expect<Equal<typeof res4, HTMLParagraphElement | null>>;

  const res5 = querySelector("p.text a[href='#']");
  type test5 = Expect<Equal<typeof res5, HTMLAnchorElement | null>>;

  // Test added after viewing solution
  const res6 = querySelector("div:hover");
  type test6 = Expect<Equal<typeof res6, HTMLDivElement | null>>;

  // Solution
  // Lookup the Element type from a tag name, and default to null:
  type SelectorToElementSolution<Selector> = Get<HTMLElementTagNameMap, SelectorToTagName<Selector>, null>;

  // Get an object's property and return a default value if the key doesn't exist:
  type Get<Obj, Key, Def> = Key extends keyof Obj ? Obj[Key] : Def;

  // Turns the selector string into a tag name string:
  type SelectorToTagName<Selector> = GetTagName<GetLastWord<Selector>>;

  // Get the last word of our selector string:
  type GetLastWord<Str> = Last<Split<Str, " ">>;

  // Get the tag name from a string like `a.class` or `a[attr]` or `a:pseudo`:
  type GetTagName<Str> = First<Split<Str, ":" | "[" | ".">>;

  // Get the last element from a tuple
  type Last<Tuple> = Tuple extends [...any, infer LastItem] ? LastItem : never;

  // Get the first element from a tuple
  type First<Tuple> = Tuple extends [infer FirstItem, ...any] ? FirstItem : never;

  // This split function is a bit complex because it needs to support
  // a union type as a separator.
  type Split<Str, Sep extends string, Output extends string[] = [], CurrentChunk extends string = ""> =
    // Loop through each character:
    Str extends `${infer First}${infer Rest}`
      ? // If `First` is a separator:
        First extends Sep
        ? // Add the current chunk to our output:
          Split<Rest, Sep, [...Output, CurrentChunk], "">
        : // Otherwise, add it to the chunk:
          Split<Rest, Sep, Output, `${CurrentChunk}${First}`>
      : // If the string is empty and `CurrentChunk` as well:
      CurrentChunk extends ""
      ? // Return the output:
        Output
      : // Otherwise, append the CurrentChunk to our Output:
        [...Output, CurrentChunk];
}
