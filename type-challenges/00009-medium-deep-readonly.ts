// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<DeepReadonly<X1>, Expected1>>, Expect<Equal<DeepReadonly<X2>, Expected2>>];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };

// ============= Your Code Here =============
type Object = { [Key: PropertyKey]: unknown };

type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends Object
    ? DeepReadonly<T[K]>
    : T[K] extends Array<infer Values>
    ? DeepReadonlyArray<T[K]>
    : T[K];
} & {};

type DeepReadonlyArray<T extends Array<unknown>> = T extends [infer First, ...infer Rest]
  ? readonly [First extends Object ? DeepReadonly<First> : First, ...DeepReadonlyArray<Rest>]
  : [];

// ============= Popular Solution =============
type DeepReadonlySolution<T> = {
  readonly [key in keyof T]: keyof T[key] extends never ? T[key] : DeepReadonlySolution<T[key]>;
};

type casesSolution = [
  Expect<Equal<DeepReadonlySolution<X1>, Expected1>>,
  Expect<Equal<DeepReadonlySolution<X2>, Expected2>>
];

// Explanation by example
type MakeObjectPropertiesReadonly<T extends object> = {
  readonly [key in keyof T]: T[key];
} & {};

type ReadonlyArray = MakeObjectPropertiesReadonly<[1, 2, 3]>;
//   ^?
