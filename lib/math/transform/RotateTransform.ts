import { NumberWithUnit } from "@lib/math/NumberWithUnit";
import { RotateTransformInit, TransformBase } from "./Transform";
import { getNumberWithUnit } from "../NumberWithUnit";


export class RotateTransform extends TransformBase<"rotate">  {

  get is2D() {
    return this._rotate.is2D;
  }

  private readonly _rotate: CSSRotate;

  static create(rotate: RotateTransformInit) {
    if (rotate.x || rotate.y || rotate.z) {
      return new RotateTransform(rotate.x, rotate.y, rotate.z, rotate.angle);
    } else {
      return new RotateTransform(rotate.angle);
    }
  }

  constructor(...args: [NumberWithUnit] | [NumberWithUnit | undefined, NumberWithUnit | undefined, NumberWithUnit | undefined, NumberWithUnit]) {
    super("rotate");

    const cssNumberArgs = args.map(a => CSSNumericValue.parse(getNumberWithUnit(a, "deg")!));
    // @ts-ignore
    this._rotate = new CSSRotate(...cssNumberArgs);
  }

  toCSSTransformComponent() {
    return this._rotate;
  }


  toMatrix(): DOMMatrix {
    return this._rotate.toMatrix();
  }
}