import { NumberWithUnit } from "@lib/math/NumberWithUnit";
import { RotateTransformInit, ScaleTransformInit, SkewTransformInit, TransformBase } from "./Transform";
import { getNumberWithUnit } from "../NumberWithUnit";


export class SkewTransform extends TransformBase<"skew">  {

  get is2D() {
    return this._skew.is2D;
  }

  private readonly _skew: CSSSkew;

  static empty() {
    return new SkewTransform(1, 1);
  }

  static create(skew: SkewTransformInit) {
    return new SkewTransform(skew.angleX, skew.angleY);
  }

  constructor(angleX: NumberWithUnit, angleY: NumberWithUnit) {
    super("skew");
    this._skew = new CSSSkew(
      CSSNumericValue.parse(getNumberWithUnit(angleX, "deg")!), 
      CSSNumericValue.parse(getNumberWithUnit(angleY, "deg")!), 
    );
  }

  toCSSTransformComponent() {
    return this._skew;
  }


  toMatrix(): DOMMatrix {
    return this._skew.toMatrix();
  }
}