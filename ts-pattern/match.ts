import { match } from "ts-pattern";
import type { Ape } from "./types.js";

const matchApe = (ape: Ape) =>
  match(ape)
    .with("🐒", (value) => console.log(`${value} is a Monkey`))
    .with("🦧", (value) => console.log(`${value} is an Orangutan`))
    .with("🦍", (value) => console.log(`${value} is a Gorilla`))
    .when(
      (neverApe) => true,
      (neverApe) => console.log(`${neverApe} is not an ape`),
    )
    // .otherwise((nonApe) => logNonApe)
    .exhaustive();

matchApe("🐒");
matchApe("🦧");
matchApe("🦍");
// @ts-expect-error
matchYesNoUnknown("🐼"); // TypeScript will complain if you don't pass it an ape
