import { Transform, ITransform } from "./Transform";


export class TransformGroup implements ITransform  {
  readonly transform: CSSTransformValue;
  constructor(transforms: Transform[]);
  constructor(cssTransform: CSSTransformValue);
  constructor(transforms: Transform[] | CSSTransformValue) {
    if (Array.isArray(transforms)) {
      this.transform = new CSSTransformValue(transforms.map(t => t.toCSSTransformComponent()));
    } else {
      this.transform = transforms;
    }
  }

  static parseCSSTransform(styleValue: string) {
    const transform = CSSStyleValue.parse("transform", styleValue) as CSSTransformValue;
    return new TransformGroup(transform);
  }

  get is2D() {
    return this.transform.is2D;
  }

  toCSSValue() {
    return this.transform.toString();
  }

  toMatrix(): DOMMatrix {
    return this.transform.toMatrix();
  }
}