import { Globals, Property } from "csstype";
import { ParamRef } from "../binding/ParamRef";
import { ParamComputed } from "../binding/ParamComputed";
import { StringTemplate } from "../binding/StringTemplate";


export type CSSEnum<T> = Exclude<T, Globals>;

export type Point2D = [x: number, y: number];

export type NumberWithUnit = number | string;

export type LayoutMode = "absolute" | "relative";

export interface DrawableElementBase<T extends string> {
  kind: T;

  origin?: Point2D | string;
  transform?: DOMMatrixInit;
  layoutMode?: LayoutMode;
  x?: NumberWithUnit;
  y?: NumberWithUnit;
}

export interface Group extends DrawableElementBase<"group"> {
  children: DrawableElementInit[];
  containerMode?: "fixed"  | "flex";

  direction?: CSSEnum<Property.FlexDirection>;
  justify?: CSSEnum<Property.JustifyContent>;
  align?: CSSEnum<Property.AlignItems>;
}


export interface Sprite extends DrawableElementBase<"sprite"> {
  source: string;
  width?: NumberWithUnit;
  height?: NumberWithUnit;
  fit?: CSSEnum<Property.ObjectFit>;
}

export interface Text extends DrawableElementBase<"text"> {
  text: string;
  
  fill?: string | CanvasGradient | CanvasPattern;
  stroke?: string;
  strokeWidth?: NumberWithUnit;
  lineJoin?: CanvasLineJoin;

  fontFamily?: string;
  fontSize?: NumberWithUnit;
  fontStyle?: CSSEnum<Property.FontStyle>;
  fontWeight?: CSSEnum<Property.FontWeight>;
  fontVariant?: CanvasFontVariantCaps;
  align?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  whiteSpace?: CSSEnum<Property.WhiteSpace>;
  letterSpacing?: number;

  padding?: number;
  lineHeight?: NumberWithUnit;

}

export interface Graphics extends DrawableElementBase<"graphics"> {
  // geometry: Geometry;
  path: string;
  fill?: string;
  stroke?: string;

  width?: NumberWithUnit;
  height?: NumberWithUnit;
}

export type DrawableElement = Sprite | Text | Graphics | Group;

export type ElementInit<T extends DrawableElementBase<any>> = {
  [P in keyof T]: P extends "kind" | "children"  ? T[P] 
    : T[P] | ParamRef<T[P]> | ParamComputed<T[P]> | StringTemplate
}

export type DrawableElementInit = 
  | ElementInit<Sprite> 
  | ElementInit<Text> 
  | ElementInit<Graphics> 
  | ElementInit<Group>
;