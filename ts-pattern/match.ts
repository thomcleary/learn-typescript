import { match } from "ts-pattern";

type Ape = "🐒" | "🦧" | "🦍";

const logApe = (ape: Ape) => console.log("Ape:", ape);
const logNonApe = (nonApe: unknown) => console.log("Not ape:", nonApe);

const matchYesNoUnknown = (ape: Ape) =>
  match(ape)
    .with("🐒", logApe)
    .with("🦧", logApe)
    .with("🦍", logApe)
    .when(
      (neverApe) => true,
      (neverApe) => logNonApe(neverApe),
    )
    // .otherwise((nonApe) => logNonApe)
    .exhaustive();

matchYesNoUnknown("🐒");
matchYesNoUnknown("🦧");
matchYesNoUnknown("🦍");
// @ts-expect-error
matchYesNoUnknown("🐼"); // TypeScript will complain if you don't pass it an ape
