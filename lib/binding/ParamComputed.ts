import { NamedParamRef } from "./ParamRef";

export interface ParamComputed<T = any> {
  "@refs": NamedParamRef[];
  "@expr": string;
}

export function isParamComputed<T = any>(value: any): value is ParamComputed<T> {
  return value && typeof value === "object" && "@expr" in value;
}


