import { ElementProps } from "../ElementProps";
import { Sprite as SpriteElement } from "../../../meta/element";
import { CSSProperties, StyleValue } from "vue";
import { getNumberWithUnit } from "../util";

export function Sprite(props: ElementProps<SpriteElement>) {
  const e = props.element;
  const style: CSSProperties = {
    "object-fit": e.fit,
    height: getNumberWithUnit(e.height),
    width: getNumberWithUnit(e.width),
  };
  return (
    <img style={style}
      src={e.source}>
    </img>
  );
}