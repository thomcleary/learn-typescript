// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type cases = [Expect<Equal<LookUp<Animal, "dog">, Dog>>, Expect<Equal<LookUp<Animal, "cat">, Cat>>];

// ============= Your Code Here =============
type LookUp<U extends { type: string }, T extends U["type"]> = U extends { type: infer Type extends string }
  ? Uppercase<Type> extends Uppercase<T>
    ? U
    : never
  : never;

type TestDog = LookUp<Animal, "dog">;
//   ^?
type TestCat = LookUp<Animal, "cat">;
//   ^?
//@ts-expect-error
type TestInvalid = LookUp<Animal, "mouse">;
//   ^?

// After looking at some solutions, could have done this too
type BetterLookUp<U extends { type: string }, T extends U["type"]> = U extends { type: T } ? U : never;
