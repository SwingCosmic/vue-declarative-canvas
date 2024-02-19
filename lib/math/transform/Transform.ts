import { NumberWithUnit } from "@lib/math/NumberWithUnit";
import { ITypedObject } from "@lib/types/model";
import { MatrixTransform } from "./MatrixTransform";
import { RotateTransform } from "./RotateTransform";
import { ScaleTransform } from "./ScaleTransform";
import { SkewTransform } from "./SkewTransform";

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

type MatrixTransformObjectInit = (AffineTransform2DInit | Matrix3x2Init | Matrix4x4Init) & ITypedObject<"matrix">;
export type MatrixTransformInit = MatrixTransformObjectInit | string;

export type Matrix3x2Tuple = [number, number, number, number, number, number];
export type Matrix4x4Tuple = [
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number, 
];

export interface RotateTransformInit extends ITypedObject<"rotate"> {
  angle: NumberWithUnit;
  x?: NumberWithUnit;
  y?: NumberWithUnit;
  z?: NumberWithUnit;
}

export interface ScaleTransformInit extends ITypedObject<"scale"> {
  x: number;
  y: number;
  z?: number;
}

export interface SkewTransformInit extends ITypedObject<"skew"> {
  angleX: NumberWithUnit;
  angleY: NumberWithUnit;
}



export type TransformInit = 
  | MatrixTransformInit 
  | RotateTransformInit 
  | ScaleTransformInit
  | SkewTransformInit
;

export type AllTransformInit = TransformInit | TransformInit[];

export type Transform = 
  | MatrixTransform 
  | RotateTransform
  | ScaleTransform
  | SkewTransform
;

export abstract class TransformBase<T extends string> implements ITypedObject<T> {
  readonly kind: T;

  constructor(kind: T) {
    this.kind = kind;
  }

  /**
   * 转换为CSS transform
   */
  toString() {
    return this.toCSSTransformComponent().toString();
  }

  abstract toMatrix(): DOMMatrix;
  protected abstract toCSSTransformComponent(): CSSTransformComponent;
  abstract readonly is2D: boolean;

}