// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

// ============= Your Code Here =============
type MyPick<T, K extends keyof T> = {
  [P in keyof T & K]: T[P];
};

// ============= Popular Solution ===========
// https://github.com/type-challenges/type-challenges/issues/13427
type MyPickSolution<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

// There was no need to do an intersection of keyof T & K
// keyof T & K <=> K
type ForExample = MyPickSolution<Todo, keyof Todo & "another key">;
//   ^ type is {}
//
// because type of `keyof Todo & "another key"` is `never`
// since there is no overlap (empty intersect) in the types
// "title" | "description" | "completed"
// and
// "another key"
//
// which shows the constrain `K extends keyof T` is enough to enforce
// that the second type parameter to MyPick must only contain keys of T
