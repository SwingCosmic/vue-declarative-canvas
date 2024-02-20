import { NumberOrUnitValue } from "@lib/math/UnitValue";
import { ITypedObject } from "@lib/types/model";
import { MatrixTransform } from "./MatrixTransform";
import { Rotate3DTransform, RotateTransform } from "./RotateTransform";
import { Scale3DTransform, ScaleTransform } from "./ScaleTransform";
import { SkewTransform, SkewXTransform, SkewYTransform } from "./SkewTransform";
import { Translate3DTransform, TranslateTransform } from "./TranslateTransform";
import { PerspectiveTransform } from "./PerspectiveTransform";

export interface AffineTransform2DInit {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export interface Matrix3x2Init {
  m11: number; m12: number;
  m21: number; m22: number;

  m41: number; m42: number;
}
export interface Matrix4x4Init extends Matrix3x2Init {
                            m13: number; m14: number;
                            m23: number; m24: number;
  m31: number; m32: number; m33: number; m34: number;
                            m43: number; m44: number;
}

export type Matrix2D = AffineTransform2DInit | Matrix3x2Init;
export type Matrix3D = Matrix4x4Init;
export type MatrixTransformInit = Matrix2D & ITypedObject<"matrix">;
export type Matrix3DTransformInit = Matrix3D & ITypedObject<"matrix3d">;

export type Matrix3x2Tuple = [number, number, number, number, number, number];
export type Matrix4x4Tuple = [
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number, 
];

export interface RotateTransformInit extends ITypedObject<"rotate"> {
  angle: NumberOrUnitValue;
}

export interface Rotate3DTransformInit extends ITypedObject<"rotate3d"> {
  angle: NumberOrUnitValue;
  x: number;
  y: number;
  z: number;
}

export interface ScaleTransformInit extends ITypedObject<"scale"> {
  x: number;
  y: number;
}
export interface Scale3DTransformInit extends ITypedObject<"scale3d"> {
  x: number;
  y: number;
  z: number;
}

export interface TranslateTransformInit extends ITypedObject<"translate"> {
  x: NumberOrUnitValue;
  y: NumberOrUnitValue;
}

export interface Translate3DTransformInit extends ITypedObject<"translate3d"> {
  x: NumberOrUnitValue;
  y: NumberOrUnitValue;
  z: NumberOrUnitValue;
}

export interface SkewXTransformInit extends ITypedObject<"skewX"> {
  angleX: NumberOrUnitValue;
}
export interface SkewYTransformInit extends ITypedObject<"skewY"> {
  angleY: NumberOrUnitValue;
}
export interface SkewTransformInit extends ITypedObject<"skew"> {
  angleX: NumberOrUnitValue;
  angleY: NumberOrUnitValue;
}

export interface PerspectiveTransformInit extends ITypedObject<"perspective"> {
  length: NumberOrUnitValue | "none";
}



export type TransformInit = 
  | MatrixTransformInit 
  | Matrix3DTransformInit 
  | RotateTransformInit 
  | Rotate3DTransformInit 
  | ScaleTransformInit
  | Scale3DTransformInit
  | SkewTransformInit
  | SkewXTransformInit
  | SkewYTransformInit
  | TranslateTransformInit
  | Translate3DTransformInit
  | PerspectiveTransformInit
;

export type AllTransformInit = string | TransformInit | TransformInit[];

export type Transform = 
  | MatrixTransform 
  | RotateTransform
  | Rotate3DTransform
  | ScaleTransform
  | Scale3DTransform
  | SkewTransform
  | SkewXTransform
  | SkewYTransform
  | TranslateTransform
  | Translate3DTransform
  | PerspectiveTransform
;

export interface ITransform {
  /**
   * 转换为CSS transform值
   */
  toCSSValue(): string;
  /**
   * 转换为底层的变换矩阵
   */
  toMatrix(): DOMMatrix;

  readonly is2D: boolean;
}

export abstract class TransformBase<T extends string> implements ITransform, ITypedObject<T> {
  readonly kind: T;

  constructor(kind: T) {
    this.kind = kind;
  }

  toCSSValue() {
    return this.toCSSTransformComponent().toString();
  }

  abstract toMatrix(): DOMMatrix;
  protected abstract toCSSTransformComponent(): CSSTransformComponent;
  abstract readonly is2D: boolean;

}