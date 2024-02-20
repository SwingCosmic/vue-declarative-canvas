import { ElementProps } from "../ElementProps";
import { Text as TextElement } from "../../../meta/element";
import { CSSProperties, StyleValue } from "vue";
import { getUnitValue } from "@lib/math/UnitValue";

export function Text(props: ElementProps<TextElement>) {
  const e = props.element;
  const style: StyleValue = {
    color: e.fill as any,
    whiteSpace: "nowrap",

    "font-family": e.fontFamily,
    "font-size": getUnitValue(e.fontSize),
    "font-style": e.fontStyle,
    "font-weight": e.fontWeight,
    "font-variant": e.fontVariant,

    "letter-spacing": e.letterSpacing,
    "text-align": e.align,
    "line-height": e.lineHeight,

  };
  
  return (
    <div style={style}>
      {e.text}
    </div>
  );
}