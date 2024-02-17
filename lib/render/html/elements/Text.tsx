import ElementRender from "../ElementRender";
import { ElementProps } from "../ElementProps";
import { Text } from "../../../meta/element";
import { CSSProperties, StyleValue } from "vue";
import { getNumberWithUnit } from "../util";

export function Text(props: ElementProps<Text>) {
  const e = props.element;
  const style: StyleValue = {
    color: e.fill as any,
    whiteSpace: "nowrap",

    "font-family": e.fontFamily,
    "font-size": getNumberWithUnit(e.fontSize),
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