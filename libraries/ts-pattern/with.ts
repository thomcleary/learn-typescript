import { P, match } from "ts-pattern";
import type { Ape } from "./types.js";

// with
// https://github.com/gvergnaud/ts-pattern#with

export const ApeInfo = {
  "🐒": { name: "Monkey" },
  "🦧": { name: "Orangutan" },
  "🦍": { name: "Gorilla" },
} satisfies Record<Ape, { name: string }>;

const matchApe = (ape: unknown) =>
  match(ape)
    .with("🐒", (value) => ApeInfo[value])
    .with("🦧", (value) => ApeInfo[value])
    .with("🦍", (value) => ApeInfo[value])
    .with(P.string, (value) => `A ${value} ape?...`)
    .otherwise((value) => `${value?.toString()} is definitely not an ape...`);

console.log(matchApe("🐒"));
console.log(matchApe("🦧"));
console.log(matchApe("🦍"));
console.log(matchApe("Monkey"));
console.log(matchApe(1));
console.log(matchApe(true));
console.log(matchApe({ monkey: "this is a monkey" }));
