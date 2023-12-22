// Filtering The Children (part 3)

// Yet again, Santa has made a request to change the children filtering code.
// This time he just sent an email to the entire engineering team (which is absolutely not the process, but since Santa is sometimes a bit difficult to communicate w, no one has yet had the courage to tell him).
// Here's the contents of the email.

// POST /sendmail HTTP/1.1
// Host: mail.hohoholdings.com
// Content-Type: text/plain; charset=utf-8
// Content-Length: [Content Length]

// From: kris.kringle@hohoholdings.com
// To: engineering@hohoholdings.com
// Subject: Code Changes Needed

// Hello beloved team!

// Looks like we need some changes to the code again!

// 1. there are sometimes naughty kids in the same list
// 1. turns out I don't actually need to see the nice children in the list, after all
// 1. my golf game ran late this morning.. so since the other two changes were quick to implement, I'm sure this will be just as fast!

// - Kris Kringle
//   "at Santa's workshop, we value loyalty over all else"

// Wow. What a pointless email.
// For once, calling a meeting would have been better.

// Good thing we got some experience reading the tests because this email may as well have said "do work. thanks." (lol).

// Off to the tests to see how this is actually supposed to work!

// Tests
import { Expect, Equal } from "type-testing";

type SantasList = {
  naughty_tom: { address: "1 candy cane lane" };
  good_timmy: { address: "43 chocolate dr" };
  naughty_trash: { address: "637 starlight way" };
  naughty_candace: { address: "12 aurora" };
};
type test_wellBehaved_actual = RemoveNaughtyChildren<SantasList>;
//   ^?
type test_wellBehaved_expected = {
  good_timmy: { address: "43 chocolate dr" };
};
type test_wellBehaved = Expect<Equal<test_wellBehaved_expected, test_wellBehaved_actual>>;

type Unrelated = {
  dont: "cheat";
  naughty_play: "fair";
};
type test_Unrelated_actual = RemoveNaughtyChildren<Unrelated>;
//   ^?
type test_Unrelated_expected = {
  dont: "cheat";
};
type test_Unrelated = Expect<Equal<test_Unrelated_expected, test_Unrelated_actual>>;

// Answer
type RemoveNaughtyChildren<T> = {
  [Key in keyof T as Key extends `naughty_${string}` ? never : Key]: T[Key];
};
