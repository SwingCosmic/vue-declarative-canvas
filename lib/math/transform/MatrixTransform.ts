import { is } from "@lib/types/base";
import { ITypedObject } from "@lib/types/model";
import { AffineTransform2DInit, Matrix3x2Init, Matrix3x2Tuple, Matrix4x4Init, Matrix4x4Tuple, TransformBase } from "./Transform";



export class MatrixTransform extends TransformBase<"matrix"> implements Matrix4x4Init {

  get m11() { return this._matrix.m11; }
  set m11(v: number) { this._matrix.m11 = v; }
  get m12() { return this._matrix.m12; }
  set m12(v: number) { this._matrix.m12 = v; }
  get m13() { return this._matrix.m13; }
  set m13(v: number) { this._matrix.m13 = v; }
  get m14() { return this._matrix.m14; }
  set m14(v: number) { this._matrix.m14 = v; }
  
  get m21() { return this._matrix.m21; }
  set m21(v: number) { this._matrix.m21 = v; }
  get m22() { return this._matrix.m22; }
  set m22(v: number) { this._matrix.m22 = v; }
  get m23() { return this._matrix.m23; }
  set m23(v: number) { this._matrix.m23 = v; }
  get m24() { return this._matrix.m24; }
  set m24(v: number) { this._matrix.m24 = v; }
  
  get m31() { return this._matrix.m31; }
  set m31(v: number) { this._matrix.m31 = v; }
  get m32() { return this._matrix.m32; }
  set m32(v: number) { this._matrix.m32 = v; }
  get m33() { return this._matrix.m33; }
  set m33(v: number) { this._matrix.m33 = v; }
  get m34() { return this._matrix.m34; }
  set m34(v: number) { this._matrix.m34 = v; }
  
  get m41() { return this._matrix.m41; }
  set m41(v: number) { this._matrix.m41 = v; }
  get m42() { return this._matrix.m42; }
  set m42(v: number) { this._matrix.m42 = v; }
  get m43() { return this._matrix.m43; }
  set m43(v: number) { this._matrix.m43 = v; }
  get m44() { return this._matrix.m44; }
  set m44(v: number) { this._matrix.m44 = v; }
  

  get is2D() {
    return this._matrix.is2D;
  }
  private readonly _matrix: DOMMatrix;

  static empty() {
    return new MatrixTransform(1, 0, 0, 1, 0, 0);
  }

  static create(matrix: AffineTransform2DInit | Matrix3x2Init | Matrix4x4Init | DOMMatrixReadOnly | string) {
    let m = matrix as DOMMatrixReadOnly;
    if (typeof matrix === "string") {
      const transform = CSSStyleValue.parse("transform", matrix) as CSSTransformValue;
      m = transform.toMatrix();
    } else if (!(matrix instanceof DOMMatrixReadOnly)) {
      m = DOMMatrix.fromMatrix(matrix);
    }

    if (m.is2D) {
      return new MatrixTransform(
        m.m11, m.m12,
        m.m21, m.m22,
        m.m41, m.m42
      ); 
    } 
    return new MatrixTransform(
      m.m11, m.m12, m.m13, m.m14,
      m.m21, m.m22, m.m23, m.m24,
      m.m31, m.m32, m.m33, m.m34,
      m.m41, m.m42, m.m43, m.m44
    ); 
  }

  constructor(...args: Matrix3x2Tuple | Matrix4x4Tuple) {
    if (args.length != 6 && args.length != 16) {
      throw new RangeError("There must be 6 or 16 input values for Matrix.");
    }
    
    super("matrix");
    this._matrix = DOMMatrix.fromMatrix({});
    if (args.length === 6) {
      this.m11 = args[0];  this.m12 = args[1];  this.m13 = 0;        this.m14 = 0;
      this.m21 = args[2];  this.m22 = args[3];  this.m23 = 0;        this.m24 = 0;
      this.m31 = 0;        this.m32 = 0;        this.m33 = 1;        this.m34 = 0;
      this.m41 = args[4];  this.m42 = args[5];  this.m43 = 0;        this.m44 = 1;
    } else {
      this.m11 = args[0];  this.m12 = args[1];  this.m13 = args[2];  this.m14 = args[3];
      this.m21 = args[4];  this.m22 = args[5];  this.m23 = args[6];  this.m24 = args[7];
      this.m31 = args[8];  this.m32 = args[9];  this.m33 = args[10]; this.m34 = args[11];
      this.m41 = args[12]; this.m42 = args[13]; this.m43 = args[14]; this.m44 = args[15];
    }
    
  }

  get(row: number, col: number): number {
    if (row < 0 || row > 3 || col < 0 || col > 3) {
      throw new RangeError("Row and column values must be between 0 and 3.");
    }

    const index = row * 4 + col;
    switch (index) {
      case 0: return this.m11;
      case 1: return this.m12;
      case 2: return this.m13;
      case 3: return this.m14;
      case 4: return this.m21;
      case 5: return this.m22;
      case 6: return this.m23;
      case 7: return this.m24;
      case 8: return this.m31;
      case 9: return this.m32;
      case 10: return this.m33;
      case 11: return this.m34;
      case 12: return this.m41;
      case 13: return this.m42;
      case 14: return this.m43;
      case 15: return this.m44;
      default: throw new Error("Invalid index.");
    }
  }

  set(row: number, col: number, value: number) {
    if (row < 0 || row > 3 || col < 0 || col > 3) {
      throw new RangeError("Row and column values must be between 0 and 3.");
    }

    const index = row * 4 + col;
    switch (index) {
      case 0: this.m11 = value; break;
      case 1: this.m12 = value; break;
      case 2: this.m13 = value; break;
      case 3: this.m14 = value; break;
      case 4: this.m21 = value; break;
      case 5: this.m22 = value; break;
      case 6: this.m23 = value; break;
      case 7: this.m24 = value; break;
      case 8: this.m31 = value; break;
      case 9: this.m32 = value; break;
      case 10: this.m33 = value; break;
      case 11: this.m34 = value; break;
      case 12: this.m41 = value; break;
      case 13: this.m42 = value; break;
      case 14: this.m43 = value; break;
      case 15: this.m44 = value; break;
      default: throw new Error("Invalid index.");
    }
  }

  toMatrix() {
    // 克隆一个
    return DOMMatrix.fromMatrix(this._matrix);
  }

  toCSSTransformComponent() {
    return new CSSMatrixComponent(this._matrix);
  }

  toJSON(): Matrix4x4Init & ITypedObject<"matrix"> {
    return {
      ...this._matrix.toJSON(),
      kind: this.kind,
    };
  }


}