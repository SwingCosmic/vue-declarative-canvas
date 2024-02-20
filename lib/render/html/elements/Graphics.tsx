import { ElementProps } from "../ElementProps";
import { Graphics as GraphicsElement } from "../../../meta/element";
import { SVGAttributes  } from "vue";
import { getUnitValue } from "@lib/math/UnitValue";

export function Graphics(props: ElementProps<GraphicsElement>) {
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