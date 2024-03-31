import ElementRender from "../ElementRender";
import { ElementProps } from "../ElementProps";
// vue-tsc bug 'Duplicate declaration "Group"'
import { Group as GroupElement } from "../../../meta/element";
import { CSSProperties } from "vue";
import { getUnitValue } from "@lib/math/UnitValue";

export function Group(props: ElementProps<GroupElement>) {
  const e = props.element;
  const style: CSSProperties = {
    "position": "relative",
    "border-radius": getUnitValue(e.borderRadius),
    "background-color": e.background,
  };
  
  let mode = e.containerMode || "absolute";
  if (mode == "flex") {
    style["display"] = "flex";
    style["flex-direction"] = e.direction;
    style["justify-content"] = e.justify;
    style["align-items"] = e.align;
  } else {

  }

  return (
    <div style={style}>
      {props.element.children.map((c, i) => (
        <ElementRender key={i} element={c} />
      ))}
    </div>
  );
}
