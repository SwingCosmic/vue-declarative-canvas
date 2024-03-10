import { ElementProps } from "../ElementProps";
import { Graphics as GraphicsElement } from "../../../meta/element";
import { Shape } from "../../../meta/shape";
import { SVGAttributes  } from "vue";
import { getUnitValue } from "@lib/math/UnitValue";

interface ShapeProps {
  shape: Shape;
  attrs: SVGAttributes;
}

function ShapeElement({ shape, attrs }: ShapeProps) {
  switch (shape.kind) {
    case "ellipse":
      return (
        <ellipse
          {...attrs}
          cx={shape.center.x}
          cy={shape.center.y}
          rx={shape.radiusX}
          ry={shape.radiusY}
        />
      );
    case "line":
      return (
        <line 
          {...attrs}
          x1={shape.start.x}
          y1={shape.start.y}
          x2={shape.end.x}
          y2={shape.end.y}
        />
      );
    case "rect":
      return (
        <rect 
          {...attrs}
          x={shape.rect.x}
          y={shape.rect.y}
          width={shape.rect.width}
          height={shape.rect.height}
          rx={shape.radiusX}
          ry={shape.radiusY}
        />
      );
    case "polygon":
    case "polyline":
      const points = shape.points
        .map(p => p.x + "," + p.y)
        .join(" ");
      return shape.kind == "polyline" 
        ? <polyline {...attrs} points={points} /> 
        : <polygon {...attrs} points={points} />;
    case "path":
      return (
        <path {...attrs}
          d={shape.data}
        />
      );
    case "shape-group":
      console.warn("暂不支持shape-group的fillRule");
      return (
        <g>
          {shape.shapes.map((s, i) => (
            <ShapeElement key={i} attrs={attrs} shape={s} />
          ))}
        </g>
      );
    default:
      return <></>;
  }
}

export function Graphics(props: ElementProps<GraphicsElement>) {
  const e = props.element;
  const attrs: SVGAttributes = {
    fill: e.fill,
    stroke: e.stroke
  };
  
  return (
    <svg  
      width={e.width}
      height={e.height}>
      <ShapeElement attrs={attrs} shape={e.shape} />
    </svg>
  );
}