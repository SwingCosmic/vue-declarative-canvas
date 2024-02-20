import { NumberOrUnitValue, getCSSNumericValue } from "@lib/math/UnitValue";
import { SkewTransformInit, SkewXTransformInit, SkewYTransformInit, TransformBase } from "./Transform";
import { getUnitValue } from "../UnitValue";


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

  constructor(angleX: NumberOrUnitValue, angleY: NumberOrUnitValue) {
    super("skew");
    this._skew = new CSSSkew(
      CSSNumericValue.parse(getUnitValue(angleX, "deg")!), 
      CSSNumericValue.parse(getUnitValue(angleY, "deg")!), 
    );
  }

  toCSSTransformComponent() {
    return this._skew;
  }


  toMatrix(): DOMMatrix {
    return this._skew.toMatrix();
  }
}

export class SkewXTransform extends TransformBase<"skewX">  {

  get is2D() {
    return this._skew.is2D;
  }

  private readonly _skew: CSSSkewX;

  static empty() {
    return new SkewXTransform(1);
  }

  static create(skew: SkewXTransformInit) {
    return new SkewXTransform(skew.angleX);
  }

  constructor(angleX: NumberOrUnitValue) {
    super("skewX");
    this._skew = new CSSSkewX(
      getCSSNumericValue(angleX, "deg", true)!
    );
  }

  toCSSTransformComponent() {
    return this._skew;
  }


  toMatrix(): DOMMatrix {
    return this._skew.toMatrix();
  }
}

export class SkewYTransform extends TransformBase<"skewY">  {

  get is2D() {
    return this._skew.is2D;
  }

  private readonly _skew: CSSSkewY;

  static empty() {
    return new SkewYTransform(1);
  }

  static create(skew: SkewYTransformInit) {
    return new SkewYTransform(skew.angleY);
  }

  constructor(angleY: NumberOrUnitValue) {
    super("skewY");
    this._skew = new CSSSkewY(
      getCSSNumericValue(angleY, "deg", true)!
    );
  }

  toCSSTransformComponent() {
    return this._skew;
  }


  toMatrix(): DOMMatrix {
    return this._skew.toMatrix();
  }
}