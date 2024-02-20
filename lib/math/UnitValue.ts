


export type UnitValue<U extends string = string> = `${number}${U}`;

export type NumberOrUnitValue<U extends string = string> = number | UnitValue<U>;

export function getUnitValue<U extends string>(
  value: string | number | null | undefined, 
  defaultUnit: U
): UnitValue<U> | undefined;
export function getUnitValue(
  value: string | number | null | undefined, 
): UnitValue<"px"> | undefined;
export function getUnitValue<U extends string>(
  value: string | number | null | undefined, 
  defaultUnit: U = "px" as any
): `${number}${U}` | undefined {
  if (typeof value === "number") {
    return `${value}${defaultUnit}`;
  }
  if (!value) {
    return undefined;
  }
  const m = /^(\d+)$/.exec(value);
  if (m) {
    return `${m[1] as any}${defaultUnit}`;
  }
  return value as any;
}

export function getNumber(value: string | number | null | undefined): number | undefined {
  if (typeof value === "number") {
    return value;
  }
  if (!value) {
    return undefined;
  }
  const m = /^(\d+)$/.exec(value);
  if (m) {
    return parseFloat(m[1]);
  }
  return NaN;
}

export function getCSSNumericValue(value: string | number | null | undefined, unit: string, convert = false) {
  let v = getUnitValue(value, unit);
  if (v == null) {
    return v;
  }
  let ret = CSSNumericValue.parse(v);
  if (convert) {
    ret = ret.to(unit);
  }
  return ret;
}