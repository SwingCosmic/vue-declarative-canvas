import { StyleValue } from "vue";
import { DrawableElement } from "../../meta/element";
import { getNumberWithUnit } from "@lib/math/NumberWithUnit";
import { transform } from "@lib/math/transform";
import { Vector2 } from "@lib/math";

export function getTransform(e: DrawableElement) {
  let transformCss = "";
  if (e.transform) {
    transformCss = transform(e.transform).toString();
  }
  let origin = e.origin;
  if (Array.isArray(origin)) {
    origin = origin.join(" ");
  }

  const attrs: StyleValue = {
    left: getNumberWithUnit(e.x),
    top: getNumberWithUnit(e.y),
    transform: transformCss,
    transformOrigin: typeof origin === "object" ? Vector2.fromJSON(origin).toString() : origin,
  };

  let mode = e.layoutMode;
  attrs.position = mode  || "static";
  return attrs;
}