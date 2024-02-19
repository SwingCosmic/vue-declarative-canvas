import { TransformBase, Transform } from "./Transform";


export class TransformGroup  {
  readonly transforms: CSSTransformComponent[];
  constructor(transforms: Transform[]) {
    this.transforms = transforms.map(t => t.toCSSTransformComponent());
  }

  toString() {
    return new CSSTransformValue(this.transforms).toString();
  }
}