import { StyleValue } from "vue";
import { DrawableElement } from "../../meta/element";

export function getNumberWithUnit(value?: string | number): string | undefined {
  if (typeof value === "number") {
    return value + "px";
  } 
  if (!value) {
    return undefined;
  }
  const m = /^(\d+)$/.exec(value);
  if (m) {
    return m[1] + "px";
  }
  return value;
}


export function getTransform(e: DrawableElement) {
  let transform = "";
  if (e.transform) {
    const matrixTransform = new CSSMatrixComponent(DOMMatrix.fromMatrix(e.transform));
    transform = new CSSTransformValue([matrixTransform]).toString();
  }
  let origin = e.origin;
  if (Array.isArray(origin)) {
    origin = origin.join(" ");
  }

  const attrs: StyleValue = {
    left: getNumberWithUnit(e.x),
    top: getNumberWithUnit(e.y),
    transform,
    transformOrigin: origin,
  };

  let mode = e.layoutMode;
  attrs.position = mode  || "static";
  return attrs;
}