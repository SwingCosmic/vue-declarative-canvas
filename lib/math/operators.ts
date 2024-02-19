interface BinaryOperatorsMap {
  readonly Add: unique symbol;
  readonly Subtract: unique symbol;
  readonly Multiply: unique symbol;
  readonly Divide: unique symbol;
  readonly Mod: unique symbol;

  readonly And: unique symbol;
  readonly Or: unique symbol;
  readonly Xor: unique symbol;
  readonly ShiftLeft: unique symbol;
  readonly ShiftRight: unique symbol;
  readonly UnsignedShiftRight: unique symbol;
}

export const BinaryOperators: BinaryOperatorsMap = {
  Add: Symbol.for("+"),
  Subtract: Symbol.for("-"),
  Multiply: Symbol.for("*"),
  Divide: Symbol.for("/"),
  Mod: Symbol.for("%"),

  And: Symbol.for("&"),
  Or: Symbol.for("|"),
  Xor: Symbol.for("^"),
  ShiftLeft: Symbol.for("<<"),
  ShiftRight: Symbol.for(">>"),
  UnsignedShiftRight: Symbol.for(">>>"),
} as any;

interface UnaryOperatorsMap {
  readonly Plus: unique symbol;
  readonly Minus: unique symbol;

  readonly IncrementPrefix: unique symbol;
  readonly IncrementPostfix: unique symbol;
  readonly DecrementPrefix: unique symbol;
  readonly DecrementPostfix: unique symbol;

  readonly Not: unique symbol;
}

export const UnaryOperators: UnaryOperatorsMap = {
  Plus: Symbol.for("plus"),
  Minus: Symbol.for("minus"),

  IncrementPrefix: Symbol.for("prefix-increment"),
  IncrementPostfix: Symbol.for("postfix-increment"),
  DecrementPrefix: Symbol.for("prefix-decrement"),
  DecrementPostfix: Symbol.for("postfix-decrement"),

  Not: Symbol.for("~"),
} as any;

interface SpecialOperatorsMap {
  readonly Delete: unique symbol;
  readonly In: unique symbol;
}

export const SpecialOperators: SpecialOperatorsMap = {
  Delete: Symbol.for("delete"),
  In: Symbol.for("in"),
} as any;