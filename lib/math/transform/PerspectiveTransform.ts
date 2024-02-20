import { NumberOrUnitValue, getCSSNumericValue } from "@lib/math/UnitValue";
import { TransformBase, PerspectiveTransformInit } from "./Transform";


export class PerspectiveTransform extends TransformBase<"perspective">  {

  get is2D() {
    return this._perspective.is2D;
  }

  private readonly _perspective: CSSPerspective;

  static empty() {
    return new PerspectiveTransform("none");
  }

  static create(scale: PerspectiveTransformInit) {
    return new PerspectiveTransform(scale.length);
  }

  constructor(length: NumberOrUnitValue | "none") {
    super("perspective");
    
    let v: any = length;
    if (length !== "none") {
      v = getCSSNumericValue(length, "px", true)!;
    }
    this._perspective = new CSSPerspective(v);
  }

  toCSSTransformComponent() {
    return this._perspective;
  }


  toMatrix(): DOMMatrix {
    return this._perspective.toMatrix();
  }
}
