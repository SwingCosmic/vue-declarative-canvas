import { IClonable } from "@lib/types/model";


export interface RectInit {
  x: number;
  y: number;
  width: number;
  height: number;
}


export class Rect implements RectInit, IClonable<Rect> {
  x: number;
  y: number;
  width: number;
  height: number;

  static readonly ZERO = new Rect(0, 0, 0, 0);

  static fromJSON(rect: RectInit) {
    return new Rect(rect.x, rect.y, rect.width, rect.height);
  }

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? 0;
    this.height = height ?? 0;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  toTuple(): [number, number, number, number] {
    return [this.x, this.y, this.width, this.height];
  }

}

