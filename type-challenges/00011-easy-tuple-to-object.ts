// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, "2", 3, "4"] as const;

const symThree = Symbol("three");
type TupleOfPropertyKeys = [1, "two", typeof symThree];

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      { tesla: "tesla"; "model 3": "model 3"; "model X": "model X"; "model Y": "model Y" }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4" }>>,
  Expect<Equal<TupleToObject<TupleOfPropertyKeys>, { 1: 1; two: "two"; [symThree]: typeof symThree }>>
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

// ============= Your Code Here =============
type TupleToObject<T extends readonly PropertyKey[]> = {
  [Key in T[number]]: Key;
};

// PropertyKey is a TypeScript utility type that is just
// string | number | symbol

const TestTupleOfPropertyKeys: TupleToObject<TupleOfPropertyKeys> = {
  1: 1,
  two: "two",
  [symThree]: symThree,
};
