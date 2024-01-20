// Answer
type ObjectEntries<T, K extends keyof T = keyof T> = K extends unknown
  ? [K, T[K] extends undefined ? undefined : Required<T>[K]]
  : never;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ["name", string] | ["age", number] | ["locations", string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ["key", string | undefined]>>
];
