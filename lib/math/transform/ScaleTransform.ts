import { NumberWithUnit } from "@lib/math/NumberWithUnit";
import { RotateTransformInit, ScaleTransformInit, TransformBase } from "./Transform";
import { getNumberWithUnit } from "../NumberWithUnit";


export class ScaleTransform extends TransformBase<"scale">  {

  get is2D() {
    return this._scale.is2D;
  }

  private readonly _scale: CSSScale;

  static empty() {
    return new ScaleTransform(1, 1);
  }

  static create(scale: ScaleTransformInit) {
    return new ScaleTransform(scale.x, scale.y, scale.z);
  }

  constructor(x: number, y: number, z?: number) {
    super("scale");
    this._scale = new CSSScale(x, y, z);
  }

  toCSSTransformComponent() {
    return this._scale;
  }


  toMatrix(): DOMMatrix {
    return this._scale.toMatrix();
  }
}