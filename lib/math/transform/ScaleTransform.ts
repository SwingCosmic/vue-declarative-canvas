import { NumberOrUnitValue } from "@lib/math/UnitValue";
import { ScaleTransformInit, Scale3DTransformInit, TransformBase } from "./Transform";


export class ScaleTransform extends TransformBase<"scale">  {

  get is2D() {
    return this._scale.is2D;
  }

  private readonly _scale: CSSScale;

  static empty() {
    return new ScaleTransform(1, 1);
  }

  static create(scale: ScaleTransformInit) {
    return new ScaleTransform(scale.x, scale.y);
  }

  constructor(x: number, y: number) {
    super("scale");
    this._scale = new CSSScale(x, y);
  }

  toCSSTransformComponent() {
    return this._scale;
  }


  toMatrix(): DOMMatrix {
    return this._scale.toMatrix();
  }
}

export class Scale3DTransform extends TransformBase<"scale3d">  {

  get is2D() {
    return this._scale.is2D;
  }

  private readonly _scale: CSSScale;

  static empty() {
    return new Scale3DTransform(1, 1, 1);
  }

  static create(scale: Scale3DTransformInit) {
    return new Scale3DTransform(scale.x, scale.y, scale.z);
  }

  constructor(x: number, y: number, z: number) {
    super("scale3d");
    this._scale = new CSSScale(x, y, z);
  }

  toCSSTransformComponent() {
    return this._scale;
  }


  toMatrix(): DOMMatrix {
    return this._scale.toMatrix();
  }
}