import { MatrixTransform } from "./MatrixTransform";
import { PerspectiveTransform } from "./PerspectiveTransform";
import { Rotate3DTransform, RotateTransform } from "./RotateTransform";
import { Scale3DTransform, ScaleTransform } from "./ScaleTransform";
import { SkewTransform, SkewXTransform, SkewYTransform } from "./SkewTransform";
import { AllTransformInit, ITransform, Transform, TransformInit } from "./Transform";
import { TransformGroup } from "./TransformGroup";
import { Translate3DTransform, TranslateTransform } from "./TranslateTransform";


function createSingleTransform(transform: TransformInit): Transform {
  switch (transform.kind) {
    case "rotate":
      return RotateTransform.create(transform);
    case "rotate3d":
      return Rotate3DTransform.create(transform);
    case "scale":
      return ScaleTransform.create(transform);
    case "scale3d":
      return Scale3DTransform.create(transform);
    case "skew":
      return SkewTransform.create(transform);
    case "skewX":
      return SkewXTransform.create(transform);
    case "skewY":
      return SkewYTransform.create(transform);
    case "translate":
      return TranslateTransform.create(transform);
    case "translate3d":
      return Translate3DTransform.create(transform);
    case "matrix": 
    case "matrix3d":
      return MatrixTransform.create(transform);
    case "perspective":
      return PerspectiveTransform.create(transform);
    default: 
      throw new Error(`Unknown transform type '${(transform as any).kind}'`);
  }
}

export function createTransform(transform: AllTransformInit): ITransform {
  if (typeof transform === "string") {
    return TransformGroup.parseCSSTransform(transform);
  } else if (Array.isArray(transform)) {
    return new TransformGroup(transform.map(t => createSingleTransform(t)));
  }
  return createSingleTransform(transform);
}

export * from "./Transform";
