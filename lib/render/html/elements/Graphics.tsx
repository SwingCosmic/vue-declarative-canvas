import ElementRender from "../ElementRender";
import { ElementProps } from "../ElementProps";
import { Graphics } from "../../../meta/element";
import { SVGAttributes  } from "vue";
import { getNumberWithUnit } from "../util";

export function Graphics(props: ElementProps<Graphics>) {
  const e = props.element;
  const attrs: SVGAttributes = {
    
  };
  
  return (
    <svg  
      width={e.width}
      height={e.height}>
      <path  
        {...attrs}
        d={e.path}
        fill={e.fill}
        stroke={e.stroke}
      >
      </path>
    </svg>
  );
}