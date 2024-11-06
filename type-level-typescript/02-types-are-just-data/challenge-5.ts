/**
 * Type the `stringify` function to take any kind of input.
 *
 * Don't use `any`!
 */
namespace stringify {
  // function stringify(input: TODO) {
  //   return input instanceof Symbol ? input.toString() : `${input}`;
  // }

  function stringify<T>(input: T) {
    return input instanceof Symbol ? input.toString() : `${input}`;
  }

  stringify("a string"); // ✅
  stringify(12); // ✅
  stringify(true); // ✅
  stringify(Symbol("cat")); // ✅
  stringify(20000n); // ✅
}
