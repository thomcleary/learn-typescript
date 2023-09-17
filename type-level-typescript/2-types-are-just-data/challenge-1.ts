/**
 * Type the `move` function so that the `direction`
 * parameter can only be assigned to "backward" or "forward".
 */
namespace move {
  // function move(direction: TODO) {
  //   // some imaginary code that makes the thing move!
  // }

  function move(direction: "backward" | "forward") {
    // some imaginary code that makes the thing move!
  }

  // ✅
  move("backward");

  // ✅
  move("forward");

  // @ts-expect-error: ❌ not supported
  move("left");

  // @ts-expect-error: ❌ not supported
  move("right");
}
