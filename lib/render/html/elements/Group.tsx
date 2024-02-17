import ElementRender from "../ElementRender";
import { ElementProps } from "../ElementProps";
import { Group } from "../../../meta/element";
import { CSSProperties } from "vue";

export function Group(props: ElementProps<Group>) {
  const e = props.element;
  const style: CSSProperties = {};
  style["position"] = "relative";
  
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
      {props.element.children.map(c => <ElementRender element={c} />)}
    </div>
  );
}
