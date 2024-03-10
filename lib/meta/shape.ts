import { Vector2, Point } from "@lib/math";
import { RectInit } from "@lib/math/Rect";
import { ITypedObject } from "@lib/types/model";


export interface Line extends ITypedObject<"line"> {
  start: Point;
  end: Point;
}

export interface Rectangle extends ITypedObject<"rect"> {
  rect: RectInit;
  radiusX?: number;
  radiusY?: number;
}

export interface Ellipse extends ITypedObject<"ellipse"> {
  center: Point;
  radiusX: number;
  radiusY: number;
}

export interface Polygon extends ITypedObject<"polygon"> {
  points: Point[];
}

export interface Polyline extends ITypedObject<"polyline"> {
  points: Point[];
}

export interface Path extends ITypedObject<"path"> {
  data: string;
}

export interface ShapeGroup extends ITypedObject<"shape-group"> {
  shapes: Shape[];
  fillRule: CanvasFillRule;
}

export type Shape = Line | Rectangle | Ellipse | Polygon | Polyline | Path | ShapeGroup;