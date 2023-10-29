// Getting Started: https://github.com/gvergnaud/ts-pattern#getting-started
import { match, P } from "ts-pattern";
import util from "util";

console.log("---------------------");
console.log("Getting Started");
console.log("---------------------");
console.log();

// ----------------------------------------------------------------------------
// Example: a state reducer with ts-pattern
// ----------------------------------------------------------------------------
type State =
  | { status: "idle" }
  | { status: "loading"; startTime: number }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

type Event =
  | { type: "fetch" }
  | { type: "success"; data: string }
  | { type: "error"; error: Error }
  | { type: "cancel" };

const reducer = (state: State, event: Event) =>
  // match takes a value and returns a builder on which you can add your pattern matching cases.
  match([state, event])
    // .returnType is an optional method that you can call if you want to force all following code-branches to
    // return a value of a specific type.
    // It takes a single type parameter, provided between <AngleBrackets>.
    // Here, we use this method to make sure all branches return a valid State object.
    .returnType<State>()
    // Then we add a first with clause:
    // - The first argument is the pattern: the shape of value you expect for this branch.
    // - The second argument is the handler function: the code branch that will be called if the input value matches the pattern.
    //   - The handler function takes the input value as first parameter with its type narrowed down to what the pattern matches.
    //     - `state` is inferred as { status: 'loading' }
    //     - `event` is inferred as { type: 'success', data: string }
    .with([{ status: "loading" }, { type: "success" }], ([state, event]) => ({ status: "success", data: event.data }))
    // In the second with clause, we use the P.select function:
    // P.select() lets you extract a piece of your input value and inject it into your handler.
    // It is pretty useful when pattern matching on deep data structures because it avoids the hassle of destructuring your input in your handler.
    // Since we didn't pass any name to P.select(), It will inject the event.error property as first argument to the handler function.
    // Note that you can still access the full input value with its type narrowed by your pattern as second argument of the handler function:
    // - You can only have a single anonymous selection, if you need to select more properties, you will need to give them names.
    //   - .with([{ status: "loading", startTime: P.select("startTime") }, { type: "error", error: P.select("error") }], ({ startTime, error }, stateAndEvent) => ({
    .with([{ status: "loading" }, { type: "error", error: P.select() }], (error, stateAndEvent) => ({
      status: "error",
      error,
    }))
    // If you need to match on everything but a specific value, you can use a P.not(<pattern>) pattern.
    // It's a function taking a pattern and returning its opposite:
    .with([{ status: P.not("loading") }, { type: "fetch" }], () => ({ status: "loading", startTime: Date.now() }))
    // Sometimes, we need to make sure our input value respects a condition that can't be expressed by a pattern.
    // For example, imagine you need to check that a number is positive.
    // In these cases, we can use guard functions: functions taking a value and returning a boolean.
    //
    // With TS-Pattern, there are two ways to use a guard function:
    // - use P.when(<guard function>) inside one of your patterns
    // - pass it as second parameter to .with(...)
    //
    // This pattern will only match if the guard function returns true
    .with(
      [
        {
          status: "loading",
          startTime: P.when((t) => t + 2000 < Date.now()),
        },
        { type: "cancel" },
      ],
      // .with optionally accepts a guard function as second parameter,
      // between the pattern and the handler callback:
      // ([state, event]) => state.startTime + 2000 < Date.now(),
      () => ({ status: "idle" }),
    )
    // P._ will match any value.
    // You can use it either at the top level, or within another pattern.
    //   .with(P._, () => state)
    //   .with([P._, P._], () => state)
    //   .with([P._, { type: P._ }], () => state)
    .with(P._, () => state)
    // .exhaustive() executes the pattern matching expression, and returns the result
    // It also enables exhaustiveness checking,
    // making sure we don't forget any possible case in our input value
    .exhaustive();
//  .otherwise(() => state)
// Alternatively, you can use .otherwise(),
// which takes an handler function returning a default value.
// .otherwise(handler) is equivalent to .with(P._, handler).exhaustive().

console.log("--- Example: state reducer ---");
console.log();

const logEvent = (state: State, event: Event) => {
  console.log(`event > ${event.type}`);
  console.log(`state: ${util.inspect(state, { colors: true })}`);
  console.log();
};

let state: State = { status: "idle" };
console.log("Initial state:", state);
console.log();

const fetch = { type: "fetch" } satisfies Event;
state = reducer(state, fetch);
logEvent(state, fetch);

const success = { type: "success", data: "response data" } satisfies Event;
state = reducer(state, success);
logEvent(state, success);

const cancel = { type: "cancel" } satisfies Event;
state = reducer(state, fetch);
logEvent(state, fetch);
state = reducer(state, cancel);
logEvent(state, cancel);
console.log("Wait 2s before cancelling...");
console.log();
await (async () => new Promise((resolve) => setTimeout(resolve, 2000)))();
state = reducer(state, cancel);
logEvent(state, cancel);

const error = { type: "error", error: new Error() } satisfies Event;
state = reducer(state, fetch);
logEvent(state, fetch);
state = reducer(state, error);
logEvent(state, error);

// ----------------------------------------------------------------------------
// Matching several patterns
// ----------------------------------------------------------------------------
// As you may know,
// switch statements allow handling several cases with the same code block:
declare let type: "text" | "span" | "p" | "btn" | "button";
const _ = () => {
  switch (type) {
    case "text":
    case "span":
    case "p":
      return "text";

    case "btn":
    case "button":
      return "button";
  }
};

// Similarly,
// ts-pattern lets you pass several patterns to .with() and if one of these patterns matches your input,
// the handler function will be called:
const sanitize = (name: string) =>
  match(name)
    .with("text", "span", "p", () => "text")
    .with("btn", "button", () => "button")
    .otherwise(() => name);

sanitize("span"); // 'text'
sanitize("p"); // 'text'
sanitize("button"); // 'button'

// As you might expect,
// this also works with more complex patterns than strings and exhaustiveness checking works as well.

console.log("--- Example: Matching several patterns ---");
console.log();

(["btn", "button", "p", "span", "text"] satisfies (typeof type)[]).forEach((t) => {
  console.log(`type: ${t}`);
  console.log(`sanitized: ${sanitize(t)}`);
  console.log();
});
