import { NumberOrUnitValue } from "@lib/math/UnitValue";
import { Globals, DataType } from "csstype";

export type CSSEnum<T> = Exclude<T, Globals>;



export type HexColor = `#${string}`;
export type RGBColor = `rgb(${string})`;
export type RGBAColor = `rgba(${string})`;
export type HSLColor = `hsl(${string})`;
export type HSLAColor = `hsla(${string})`;

export type Color = DataType.NamedColor | HexColor | RGBColor | RGBAColor | HSLColor | HSLAColor;


export interface StrokeStyle {
  lineCap?: CanvasLineCap;
  lineDashOffset?: number;
  lineJoin?: CanvasLineJoin;
  lineWidth?: NumberOrUnitValue;
  miterLimit?: number;
}


export interface IFillable extends StrokeStyle {
  fill?: Color;
  stroke?: Color;
}

export interface ISizeable {
  width?: NumberOrUnitValue;
  height?: NumberOrUnitValue;
}

