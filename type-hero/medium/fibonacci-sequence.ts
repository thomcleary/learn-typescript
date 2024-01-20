// Answer
type Fibonacci<T extends number, P extends "+"[] = ["+"], C extends "+"[] = ["+"]> = T extends 1 | 2
  ? C["length"]
  : Fibonacci<MinusOne<T>, C, Add<P, C>>;

type Add<A extends unknown[], B extends unknown[]> = [...A, ...B];
type MinusOne<A extends number> = FillAcc<A> extends [infer _, ...infer Rest] ? Rest["length"] : 0;
type FillAcc<T extends number, Acc extends "+"[] = []> = Acc["length"] extends T ? Acc : FillAcc<T, [...Acc, "+"]>;

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// Additional Tests
type Seventeenth = Expect<Equal<Fibonacci<17>, 1597>>; // This is as high as the solution will go before hitting recursion limits
type Twentieth = Expect<Equal<Fibonacci<20>, 6765>>; // After making addition non recursive, it can go this high...
// T=21 will cause C to be a tuple with > 10_000 elements which causes an error as the the 21st Fib number is 10946
