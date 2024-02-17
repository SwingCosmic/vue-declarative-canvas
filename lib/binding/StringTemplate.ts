import { NamedParamRef } from "./ParamRef";


export interface StringTemplate {
  "@refs": NamedParamRef[];
  "@str": string;
}

export function isStringTemplate(value: any): value is StringTemplate {
  return value && typeof value === "object" && "@str" in value;
}
