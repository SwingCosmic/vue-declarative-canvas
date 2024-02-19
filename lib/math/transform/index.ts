import { MatrixTransform } from "./MatrixTransform";
import { RotateTransform } from "./RotateTransform";
import { ScaleTransform } from "./ScaleTransform";
import { SkewTransform } from "./SkewTransform";
import { AllTransformInit, Transform, TransformBase, TransformInit } from "./Transform";
import { TransformGroup } from "./TransformGroup";


function parseTransform(transform: TransformInit): Transform {
  if (typeof transform === "string") {
    return MatrixTransform.create(transform);
  } 
  switch (transform.kind) {
    case "rotate":
      return RotateTransform.create(transform);
    case "scale":
      return ScaleTransform.create(transform);
    case "skew":
      return SkewTransform.create(transform);
  
    default:
      return MatrixTransform.create(transform);
  }
}

export function transform(transform: AllTransformInit): Transform | TransformGroup {
  if (Array.isArray(transform)) {
    return new TransformGroup(transform.map(t => parseTransform(t)));
  }
  return parseTransform(transform);
}

export * from "./Transform";