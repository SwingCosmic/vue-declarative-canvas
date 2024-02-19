import { Vector2, Point } from "@lib/math";
import { RectInit } from "@lib/math/Rect";
import { ITypedObject } from "@lib/types/model";

export interface GeometryBase<T extends string> extends ITypedObject<T> {

}

export interface Line extends GeometryBase<"line"> {
  start: Point;
  end: Point;
}

export interface Rectangle extends GeometryBase<"rect"> {
  rect: RectInit;
  radiusX?: number;
  radiusY?: number;
}

export interface Ellipse extends GeometryBase<"ellipse"> {
  center: Point;
  radiusX: number;
  radiusY: number;
}

export interface Polyline extends GeometryBase<"polyline"> {
  points: Point[];
}