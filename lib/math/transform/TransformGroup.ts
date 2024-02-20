import { Transform, ITransform } from "./Transform";


export class TransformGroup implements ITransform  {
  readonly transforms: CSSTransformComponent[];
  constructor(transforms: Transform[]) {
    this.transforms = transforms.map(t => t.toCSSTransformComponent());
  }

  toCSSValue() {
    return new CSSTransformValue(this.transforms).toString();
  }

  toMatrix(): DOMMatrix {
    return new CSSTransformValue(this.transforms).toMatrix();
  }
}