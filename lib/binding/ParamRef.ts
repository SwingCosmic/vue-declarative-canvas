
export interface ParamRef<T = any> {
  "@ref": string;
}

export interface NamedParamRef<T = any> extends ParamRef<T> {
  "@name": `\$${string}`;
}

export function isParamRef<T = any>(value: any): value is ParamRef<T> {
  return value && typeof value === "object" && "@ref" in value;
}
