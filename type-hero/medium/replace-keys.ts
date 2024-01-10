// Answer
type ReplaceKeys<U, T extends PropertyKey, Y extends Record<PropertyKey, unknown>> = Prettify<ReplaceKeysUgly<U, T, Y>>;

type ReplaceKeysUgly<U, T extends PropertyKey, Y extends Record<PropertyKey, unknown>> = U extends unknown
  ? {
      [Key in T as Key extends keyof U ? Key : never]: Key extends keyof Y ? Y[Key] : never;
    } & Omit<U, T>
  : never;

type Prettify<T> = { [K in keyof T]: T[K] };

// Tests
import type { Equal, Expect } from "@type-challenges/utils";

type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type ReplacedNodeA = {
  type: "A";
  name: number;
  flag: string;
};

type ReplacedNodeB = {
  type: "B";
  id: number;
  flag: string;
};

type ReplacedNodeC = {
  type: "C";
  name: number;
  flag: string;
};

type NoNameNodeA = {
  type: "A";
  flag: number;
  name: never;
};

type NoNameNodeC = {
  type: "C";
  flag: number;
  name: never;
};

type Nodes = NodeA | NodeB | NodeC;
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC;
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB;

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, "name" | "flag", { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, "name", { aa: number }>, NodesNoName>>
];

// Popular Solution
type ReplaceKeysSolution<U, T, Y> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};
