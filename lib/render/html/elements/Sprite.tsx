import { ElementProps } from "../ElementProps";
import { Sprite as SpriteElement } from "../../../meta/element";
import { CSSProperties, StyleValue } from "vue";
import { getUnitValue } from "@lib/math/UnitValue";

export function Sprite(props: ElementProps<SpriteElement>) {
  const e = props.element;
  const style: CSSProperties = {
    "object-fit": e.fit,
    height: getUnitValue(e.height),
    width: getUnitValue(e.width),
  };
  return (
    <img style={style}
      src={e.source}>
    </img>
  );
}