import { Property, DataType } from "csstype";
import { ParamRef } from "../binding/ParamRef";
import { ParamComputed } from "../binding/ParamComputed";
import { StringTemplate } from "../binding/StringTemplate";
import { ITypedObject } from "@lib/types/model";
import { Point } from "@lib/math";
import { AllTransformInit } from "@lib/math/transform";
import { NumberOrUnitValue } from "../math/UnitValue";
import { Shape } from "./shape";
import { Color, IFillable, ISizeable } from "./base";
import { CSSEnum } from "./base";


export type LayoutMode = "absolute" | "relative";

export interface DrawableElementBase<T extends string>  {
  kind: T;
  origin?: Point | string;
  transform?: AllTransformInit;
  layoutMode?: LayoutMode;
  x?: NumberOrUnitValue;
  y?: NumberOrUnitValue;
  zIndex?: number;
}

export interface Group extends DrawableElementBase<"group"> {
  children: DrawableElementInit[];
  containerMode?: "fixed"  | "flex";

  direction?: CSSEnum<Property.FlexDirection>;
  justify?: CSSEnum<Property.JustifyContent>;
  align?: CSSEnum<Property.AlignItems>;
  borderRadius?: number;
  background?: Color;
}


export interface Sprite extends DrawableElementBase<"sprite">, ISizeable {
  source: string;

  fit?: CSSEnum<Property.ObjectFit>;
}

export interface Text extends DrawableElementBase<"text">, IFillable {
  text: string;
  
  fontFamily?: string;
  fontSize?: NumberOrUnitValue;
  fontStyle?: CSSEnum<Property.FontStyle>;
  fontWeight?: DataType.FontWeightAbsolute;
  fontVariant?: CanvasFontVariantCaps;
  align?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  whiteSpace?: CSSEnum<Property.WhiteSpace>;
  letterSpacing?: number;

  padding?: number;
  lineHeight?: NumberOrUnitValue;

}

export interface Graphics extends DrawableElementBase<"graphics">, IFillable, ISizeable {
  shape: Shape;

}

export type DrawableElement = Sprite | Text | Graphics | Group;

export type ElementInit<T extends DrawableElementBase<string>> = {
  [P in keyof T]: P extends "kind" | "children"  ? T[P] 
    : T[P] | ParamRef<T[P]> | ParamComputed<T[P]> | StringTemplate
}

export type DrawableElementInit = 
  | ElementInit<Sprite> 
  | ElementInit<Text> 
  | ElementInit<Graphics> 
  | ElementInit<Group>
;