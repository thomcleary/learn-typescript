// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = ["FALCON 9", "FALCON HEAVY", "DRAGON", "STARSHIP", "HUMAN SPACEFLIGHT"] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
];

// ============= Your Code Here =============
type Length<T extends readonly [unknown?, ...unknown[]]> = T["length"];

// Simpler solution
type SimplerLength<T extends readonly unknown[]> = T["length"];
type solutionCases = [
  Expect<Equal<SimplerLength<typeof tesla>, 4>>,
  Expect<Equal<SimplerLength<typeof spaceX>, 5>>,
  // @ts-expect-error
  SimplerLength<5>,
  // @ts-expect-error
  SimplerLength<"hello world">
];
