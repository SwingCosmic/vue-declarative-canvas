export interface ITypedObject<T extends string> {
  kind: T;
}

export interface IClonable<T> {
  clone(): T;
}

export interface IEquatable<T> {
  equals(other?: T): boolean;
}