import { CSSProperties } from "vue";
import { DrawableElement } from "../../meta/element";
import { getUnitValue } from "@lib/math/UnitValue";
import { Vector2 } from "@lib/math";

export function getLayout(e: DrawableElement) {
  let origin = e.origin;
  if (Array.isArray(origin)) {
    origin = origin.join(" ");
  }

  const attrs: CSSProperties = {
    left: getUnitValue(e.x),
    top: getUnitValue(e.y),
    transformOrigin: typeof origin === "object" ? Vector2.fromJSON(origin).toString() : origin,
    zIndex: e.zIndex,
  };

  let mode = e.layoutMode;
  attrs.position = mode  || "static";
  return attrs;
}