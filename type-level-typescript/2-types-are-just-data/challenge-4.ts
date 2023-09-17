/**
 * Type `debounceFn` as a function with a `cancel` method on it.
 *
 * Hint: To tell TS a variable is a function, you can either
 * use the type `Function` or `(() => void)`.
 */
namespace debouncedFn {
  // let debouncedFn: TODO;

  // debouncedFn = Object.assign(() => {}, { cancel: () => {} });

  let debouncedFn: Function & { cancel: Function };

  debouncedFn = Object.assign(() => {}, { cancel: () => {} });

  // ✅
  debouncedFn();

  // ✅
  debouncedFn.cancel();

  // ❌ `unknownMethod` does not exist on `debouncedFn`.
  // @ts-expect-error
  debouncedFn.unknownMethod();

  // ❌ can't assign a string to `debouncedFn`.
  // @ts-expect-error: ❌
  debouncedFn = "Hello";
}
