import { Vector2 } from "./Vector2";

// HACK: Vite's babel plugin doesn't work, but webpack's works well.

(() => {
  "operator-overloading enabled";
  const a = new Vector2(1, 1);
  const b = new Vector2(2, 2);
  // @ts-ignore
  const sum: Vector2 = a + b;

  if (!(sum instanceof Vector2)) {
    const error = new Error("Bad compilation: operator overloading is not enabled.Please check Babel's config");
    console.error(error);
    throw error;
  }
})();


export * from "./Vector2";