// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

// ============= Your Code Here =============
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

const testMyReadonly: MyReadonly<Todo1> = {
  title: "title",
  description: "description",
  completed: true,
  meta: {
    author: "author",
  },
};
// @ts-expect-error
testMyReadonly.title = "a different title";
// @ts-expect-error
testMyReadonly.description = "a different description";
// @ts-expect-error
testMyReadonly.completed = !test.completed;
// @ts-expect-error
testMyReadonly.meta = { author: "a different author" };
// This one should be okay to reassign though
testMyReadonly.meta.author = "a different author";
