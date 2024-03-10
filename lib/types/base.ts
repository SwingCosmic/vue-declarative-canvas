export type HexCharUpper = "A" | "B" | "C" | "D" | "E" | "F";
export type HexCharLower = Lowercase<HexCharUpper>;
export type HexChar = HexCharUpper | HexCharLower;



/** 将形如`a.b.c`这样的属性路径转成对应嵌套对象里面的属性类型 */
export type GetNestedPropertyType<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer P}.${infer C}`
  ? P extends keyof T
      ? GetNestedPropertyType<T[P], C>
      : any
  : any;


export function getNestedProperty<T extends {}, K extends string>(path: K, obj: T): GetNestedPropertyType<T, K> {
  const propPaths = path.split(".").filter(p => !!p);
  let ret: any = obj;
  for (const p of propPaths) {
    ret = ret[p];
    // 此处不能使用===
    if (ret == null) {
      return null as any;
    }
  }
  return ret;
}


export function is<T>(obj: any, condition: boolean): obj is T {
  return condition;
}