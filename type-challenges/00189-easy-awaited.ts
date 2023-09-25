// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };
type ExtraTest = PromiseLike<string>;

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
  Expect<Equal<MyAwaited<ExtraTest>, string>>
];

// @ts-expect-error
type error = MyAwaited<number>;

// ============= Your Code Here =============
type MyPromiseLike<T> = { then: (onFulfilled: (arg: T) => unknown) => unknown };

type MyAwaited<T extends MyPromiseLike<unknown>> = T extends MyPromiseLike<infer Value>
  ? Value extends MyPromiseLike<unknown>
    ? MyAwaited<Value>
    : Value
  : never;

// Note:
// type T is not assignable to the inbuilt PromiseLike<T> type
type IsTAssignableToPromiseLike = T extends PromiseLike<unknown> ? true : false;
type IsTAssignableToPromiseLikeTest = Expect<Equal<IsTAssignableToPromiseLike, false>>;

// so to make the last test pass
// Expect<Equal<MyAwaited<T>, number>>
// we need to implement a PromiseLike type that T is assignable to
// (MyPromiseLike)

// here is a version of my solution where T is changed to be assignable to the inbuilt PromiseLike type
type AssignableT = PromiseLike<number>;

type MyAwaitedWithPromiseLike<T extends PromiseLike<unknown>> = T extends PromiseLike<infer Value>
  ? Value extends PromiseLike<unknown>
    ? MyAwaitedWithPromiseLike<Value>
    : Value
  : never;

type casesWithPromiseLike = [
  Expect<Equal<MyAwaitedWithPromiseLike<X>, string>>,
  Expect<Equal<MyAwaitedWithPromiseLike<Y>, { field: number }>>,
  Expect<Equal<MyAwaitedWithPromiseLike<Z>, string | number>>,
  Expect<Equal<MyAwaitedWithPromiseLike<Z1>, string | boolean>>,
  // @ts-expect-error
  Expect<Equal<MyAwaitedWithPromiseLike<T>, number>>,
  Expect<Equal<MyAwaitedWithPromiseLike<AssignableT>, number>>,
  Expect<Equal<MyAwaitedWithPromiseLike<ExtraTest>, string>>
];

// ============= Popular Solution =============
// https://github.com/type-challenges/type-challenges/issues/18837#issuecomment-1518715442

// constraining T to be a PromiseLike thats result is either `any` or PromiseLike<`any`>
// allows the original T to be assignable to PromiseLike
type MyAwaitedSolution<T extends PromiseLike<any | PromiseLike<any>>> = T extends PromiseLike<infer V>
  ? V extends PromiseLike<any>
    ? MyAwaited<V>
    : V
  : never;

type casesSolution = [
  Expect<Equal<MyAwaitedSolution<X>, string>>,
  Expect<Equal<MyAwaitedSolution<Y>, { field: number }>>,
  Expect<Equal<MyAwaitedSolution<Z>, string | number>>,
  Expect<Equal<MyAwaitedSolution<Z1>, string | boolean>>,
  Expect<Equal<MyAwaitedSolution<T>, number>>,
  Expect<Equal<MyAwaitedSolution<ExtraTest>, string>>
];

// Here is my original solution adjusted to work with the solutions method
// (changing the type constraint of T from MyPromiseLike<unknown> to PromiseLike<any>)
type MyAwaitedFixed<T extends PromiseLike<any>> = T extends MyPromiseLike<infer Value>
  ? Value extends PromiseLike<unknown>
    ? MyAwaited<Value>
    : Value
  : never;

type casesMyAwaitedFixed = [
  Expect<Equal<MyAwaitedFixed<X>, string>>,
  Expect<Equal<MyAwaitedFixed<Y>, { field: number }>>,
  Expect<Equal<MyAwaitedFixed<Z>, string | number>>,
  Expect<Equal<MyAwaitedFixed<Z1>, string | boolean>>,
  Expect<Equal<MyAwaitedFixed<T>, number>>,
  Expect<Equal<MyAwaitedFixed<ExtraTest>, string>>
];
