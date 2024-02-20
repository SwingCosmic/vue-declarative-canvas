import { NumberOrUnitValue, getCSSNumericValue } from "@lib/math/UnitValue";
import { TransformBase, Translate3DTransformInit, TranslateTransformInit } from "./Transform";


export class TranslateTransform extends TransformBase<"translate">  {

  get is2D() {
    return this._translate.is2D;
  }

  private readonly _translate: CSSTranslate;

  static empty() {
    return new TranslateTransform(0, 0);
  }

  static create(translate: TranslateTransformInit) {
    return new TranslateTransform(translate.x, translate.y);
  }

  constructor(x: NumberOrUnitValue, y: NumberOrUnitValue) {
    super("translate");
    this._translate = new CSSTranslate(
      getCSSNumericValue(x, "px")!, 
      getCSSNumericValue(y, "px")!
    );
  }

  toCSSTransformComponent() {
    return this._translate;
  }


  toMatrix(): DOMMatrix {
    return this._translate.toMatrix();
  }
}


export class Translate3DTransform extends TransformBase<"translate3d">  {

  get is2D() {
    return this._translate.is2D;
  }

  private readonly _translate: CSSTranslate;

  static empty() {
    return new Translate3DTransform(0, 0, 0);
  }

  static create(translate: Translate3DTransformInit) {
    return new Translate3DTransform(translate.x, translate.y, translate.z);
  }

  constructor(x: NumberOrUnitValue, y: NumberOrUnitValue, z: NumberOrUnitValue) {
    super("translate3d");
    this._translate = new CSSTranslate(
      getCSSNumericValue(x, "px")!, 
      getCSSNumericValue(y, "px")!,
      getCSSNumericValue(z, "px")!
    );
  }

  toCSSTransformComponent() {
    return this._translate;
  }


  toMatrix(): DOMMatrix {
    return this._translate.toMatrix();
  }
}