// Score x/x

type Quiz1 = "Welcome!" extends string ? true : false;
type Test1 = Expect<Equal<Quiz1, true>>;

type Quiz2 = boolean extends true ? true : false;
type Test2 = Expect<Equal<Quiz2, false>>;

type Quiz3 = "https" extends "http" ? true : false;
type Test3 = Expect<Equal<Quiz3, false>>;

type Quiz4 = "3000" extends number ? true : false;
type Test4 = Expect<Equal<Quiz4, false>>;

type Quiz5 = "1" | 0 extends number ? true : false;
type Test5 = Expect<Equal<Quiz5, false>>;

type Quiz6 = "Hi!" extends string & number ? true : false;
type Test6 = Expect<Equal<Quiz6, false>>;

type Quiz7 = "hello world!" extends `${string} ${string}` ? true : false;
type Test7 = Expect<Equal<Quiz7, true>>;

type Quiz8 = "8080" extends `${number}` ? true : false;
type Test8 = Expect<Equal<Quiz8, true>>;

type Quiz9 = " > 1.618" extends `${string} > ${string}` ? true : false;
type Test9 = Expect<Equal<Quiz9, true>>;

type User10 = { age: number; name: string };
type Quiz10 = { age: 21; name: "Amelia" } extends User10 ? true : false;
type Test10 = Expect<Equal<Quiz10, true>>;

type Box = { value: number };
type Some<T> = { type: "Some"; value: T };
type Quiz11 = Some<123> extends Box ? true : false;
type Test11 = Expect<Equal<Quiz11, true>>;

type User12 = { age: number; name: string };
type Quiz12 = { name: "Gabriel" } extends User12 ? true : false;
type Test12 = Expect<Equal<Quiz12, false>>;

type Post = {
  name: string;
  author: { id: string };
};
type Article = {
  name: string;
  author: { id: number };
};
type Quiz13 = Post extends Article ? true : false;
type Test13 = Expect<Equal<Quiz13, false>>;

type Widget = {
  type: "barChart" | "lineChart" | "scatterPlot";
  position: { x: number; y: number; width: number; height: number };
};
const maybeWidget = {
  type: "barChart",
  position: { x: 0, y: 0, width: 100, height: 200 },
};
type Quiz14 = typeof maybeWidget extends Widget ? true : false;
// @ts-expect-error
type Test14 = Expect<Equal<Quiz14, true>>;
// Object literals have types inferred as primitives
// type: "barChart" is inferred as string
// So is not assignable to "barChart" | "lineChart" | "scatterPlot"
// adding `as const` after the object definition would tell TypeScript
// to infer the types of maybeWidget's properties as literal types

type Quiz15 = number | string extends {} ? true : false;
type Test15 = Expect<Equal<Quiz15, true>>;

type Quiz16 = number | string extends object ? true : false;
type Test16 = Expect<Equal<Quiz16, false>>;

type Quiz17 = string[] extends (string | number)[] ? true : false;
// @ts-expect-error
type Test17 = Expect<Equal<Quiz17, false>>;
// The type of the array only has to be assignable to the type of the other array

type Quiz18 = [1, 2, 3, 4] extends [number, number, number] ? true : false;
type Test18 = Expect<Equal<Quiz18, false>>;

type Quiz19 = [] extends string[] ? true : false;
type Test19 = Expect<Equal<Quiz19, true>>;

type Quiz20 = string[] extends [string, ...string[]] ? true : false;
// @ts-expect-error
type Test20 = Expect<Equal<Quiz20, true>>;
// Potentially string[] can be an empty array []
// Which is not assignable to this variadic tuple, which requires at least
// one element

type Quiz21 = [] extends [string, ...string[]] ? true : false;
type Test21 = Expect<Equal<Quiz21, false>>;

type Quiz22 = number[] extends readonly number[] ? true : false;
// @ts-expect-error
type Test22 = Expect<Equal<Quiz22, false>>;
// non readonly arrays are assignable to readonly arrays
// but not the other way around
const readonlyFn = (arr: readonly number[]) => arr.length;
const mutableFn = (arr: number[]) => arr.push(1);
const mutableArray: number[] = [];
readonlyFn(mutableArray);
mutableFn(mutableArray);
const readonlyArray: readonly number[] = [];
readonlyFn(readonlyArray);
// @ts-expect-error
mutableFn(readonlyArray);

type Quiz23 = Readonly<{ prop: string }> extends { prop: string } ? true : false;
// @ts-expect-error
type Test23 = Expect<Equal<Quiz23, false>>;
// Bug in current version of TypeScript lets you assign readonly objects to mutable ones
// https://github.com/microsoft/TypeScript/issues/13347

type Quiz24 = [1, 2] extends number[] & { length: 2 } ? true : false;
type Test24 = Expect<Equal<Quiz24, true>>;

type Quiz25 = [never] extends [1 | 2 | 3] ? true : false;
// @ts-expect-error
type Test25 = Expect<Equal<Quiz25, false>>;
// never is assignable to 1 | 2 | 3
// since never is the empty set it is assignable to everything

type Quiz26 = void extends never ? true : false;
type Test26 = Expect<Equal<Quiz26, false>>;

type Quiz27 = { key: unknown } extends { key: string } ? true : false;
type Test27 = Expect<Equal<Quiz27, false>>;

type Quiz28 = unknown extends null | {} | undefined ? true : false;
type Test28 = Expect<Equal<Quiz28, true>>;

type Quiz29 = { key: unknown } extends { key: infer Key } ? true : false;
type Test29 = Expect<Equal<Quiz29, true>>;

type Quiz30 = 42 extends infer MeaningOfLife extends string ? true : false;
// @ts-expect-error
type Test30 = Expect<Equal<Quiz30, true>>;
// the second type constraint will only pass if the inferred Variable respects
// the constraint. Here it isn't the case as 42 isn't assignable to string

function main31<A, B>() {
  type Quiz31 = A extends B ? true : false;
  // @ts-expect-error
  type Test31 = Expect<Equal<Quiz31, false>>;
}
// There is no correct answer here 🐒
// You can create types in the body of a generic function
// Since the type checker doesn't know the types of A and B it can't
// check if one is assignable to another
// Hence the expression does not reduce
// The type of Quiz31 is `A extends B ? true : false`
// also the site said...
// "And don't worry, I'll still count your answer as correct in your final score 😉"

function main32<A extends "a" | "b", B extends string>() {
  type Quiz32 = A extends B ? true : false;
  // @ts-expect-error
  type Test32 = Expect<Equal<Quiz32, true>>;
}
// The type of Quiz32 is `A extends B ? true : false`
// All we know is that B is inside the string set
// Potentially it could be another literal type other than "a" or "b"
// like "c" or "d", which is why TypeScript stops reducing this type
// Article on generic functions and passing type checking...
// https://type-level-typescript.com/articles/making-generic-functions-pass-type-checking

type Quiz33 = (() => "a" | "b") extends () => string ? true : false;
type Test33 = Expect<Equal<Quiz33, true>>;

type Quiz34 = (() => number) extends () => 1 | 2 ? true : false;
type Test34 = Expect<Equal<Quiz34, false>>;

type Quiz35 = ((arg: number) => void) extends (arg: 1 | 2) => void ? true : false;
// @ts-expect-error
type Test35 = Expect<Equal<Quiz35, false>>;
// Building an accurate intuition of the assignability of function types
// is significantly more challenging than the quiz we've been playing so far.
// Section on function types follows this quiz question...
