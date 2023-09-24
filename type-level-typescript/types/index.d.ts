export {};

declare global {
  /**
   * Taken from: https://github.com/gvergnaud/type-level-typescript-workshop/blob/main/helpers.ts
   */
  type Equal<X, Y> = (<T>() => T extends Compute<X> ? 1 : 2) extends <T>() => T extends Compute<Y> ? 1 : 2
    ? true
    : false;

  export type Expect<T extends true> = T;

  export type Tuple = [any, ...any[]];

  /**
   * Compute is a helper converting intersections of objects into
   * flat, plain object types.
   *
   * @example
   * Compute<{ a: string } & { b: string }> -> { a: string, b: string }
   */
  export type Compute<obj> = { [k in keyof obj]: obj[k] } & unknown;
}
