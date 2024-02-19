
export type NumberWithUnit<U extends string = string> = number | `${number}${U}`;

export function getNumberWithUnit(value: string | number | undefined, defaultUnit = "px"): string | undefined {
  if (typeof value === "number") {
    return value + defaultUnit;
  }
  if (!value) {
    return undefined;
  }
  const m = /^(\d+)$/.exec(value);
  if (m) {
    return m[1] + defaultUnit;
  }
  return value;
}

