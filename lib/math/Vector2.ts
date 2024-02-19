import { IClonable, IEquatable } from "@lib/types/model";
import { BinaryOperators, UnaryOperators } from "./operators";


export interface Point {
  x: number;
  y: number;
}

/**
 * 表示具有两个元素的向量，可以用来代表二维点
 */
export class Vector2 implements Point, IClonable<Vector2>, IEquatable<Vector2> {
  x: number;
  y: number;

  static readonly ZERO = new Vector2(0, 0);
  private static kEpsilon = 0.00001;

  static fromJSON(point: Point) {
    return new Vector2(point.x, point. y);
  }

  static parse(point: string) {
    const v = point
      .split(/([ ,]+)/)
      .filter(s => !!s);
    return new Vector2(parseFloat(v[0]), parseFloat(v[1]));
  }

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  get lengthSquared() {
    return this.x ** 2 + this.y ** 2;
  }

  get length() {
    return Math.sqrt(this.lengthSquared);
  }

  [BinaryOperators.Add](other: Point) {
    const x = this.x + other.x;
    const y = this.y + other.y;
    return new Vector2(x, y);
  }
  [BinaryOperators.Subtract](other: Point) {
    const x = this.x - other.x;
    const y = this.y - other.y;
    return new Vector2(x, y);
  }
  [BinaryOperators.Multiply](other: Point | number) {
    const x = this.x * (typeof other === "number" ? other : other.x);
    const y = this.y * (typeof other === "number" ? other : other.y);
    return new Vector2(x, y);
  }
  [BinaryOperators.Divide](other: Point | number) {
    const x = this.x / (typeof other === "number" ? other : other.x);
    const y = this.y / (typeof other === "number" ? other : other.y);
    return new Vector2(x, y);
  }


  [UnaryOperators.Minus]() {
    return new Vector2(-this.x, -this.y);
  }


  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  toTuple(): [number, number] {
    return [this.x, this.y];
  }
  
  toString() {
    return `${this.x}, ${this.y}`;
  }

  equals(other?: Vector2) {
    if (!other) {
      return false;
    }
    return this[BinaryOperators.Subtract](other).lengthSquared < Vector2.kEpsilon ** 2;
  }
}

