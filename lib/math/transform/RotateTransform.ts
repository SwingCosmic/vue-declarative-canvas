import { NumberOrUnitValue, getCSSNumericValue } from "@lib/math/UnitValue";
import { Rotate3DTransformInit, RotateTransformInit, TransformBase } from "./Transform";
import { getUnitValue } from "../UnitValue";


export class RotateTransform extends TransformBase<"rotate">  {

  get is2D() {
    return this._rotate.is2D;
  }

  private readonly _rotate: CSSRotate;

  static create(rotate: RotateTransformInit) {
    return new RotateTransform(rotate.angle);
  }

  constructor(angle: NumberOrUnitValue) {
    super("rotate");
    this._rotate = new CSSRotate(CSSNumericValue.parse(getUnitValue(angle, "deg")!));
  }

  toCSSTransformComponent() {
    return this._rotate;
  }

  toMatrix(): DOMMatrix {
    return this._rotate.toMatrix();
  }
}

export class Rotate3DTransform extends TransformBase<"rotate3d">  {

  get is2D() {
    return this._rotate.is2D;
  }

  private readonly _rotate: CSSRotate;

  static create(rotate: Rotate3DTransformInit) {
    return new Rotate3DTransform(rotate.x, rotate.y, rotate.z, rotate.angle);
  }

  constructor(x: NumberOrUnitValue, y: NumberOrUnitValue, z: NumberOrUnitValue, angle: NumberOrUnitValue,) {
    super("rotate3d");

    const cssNumberArgs = [x, y, z, angle].map(
      a => getCSSNumericValue(a, "deg", true)!
    ) as [CSSNumericValue, CSSNumericValue, CSSNumericValue, CSSNumericValue];
    this._rotate = new CSSRotate(...cssNumberArgs);
  }

  toCSSTransformComponent() {
    return this._rotate;
  }


  toMatrix(): DOMMatrix {
    return this._rotate.toMatrix();
  }
}