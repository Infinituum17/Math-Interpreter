export enum ASTTypes {
  NUMERIC = "Numeric",
  FUNCALL = "Function",
  OP_BINARY = "BinaryOperation",
  OP_UNARY = "UnaryOperation"
}

export enum TokenTypes {
  SEPARATOR = "Separator",
  IDENTIFIER = "Identifier",
  NUMBER = "Number",
  ADD = "Addition",
  SUB = "Subtraction",
  MUL = "Multiplication",
  DIV = "Division",
  POW = "Power",
  MOD = "Modulo",
  OPENPAREN = "OpenParenthesis",
  CLOSEPAREN = "ClosedParenthesis",
  EOF = "End-Of-File"
}

export enum Constants {
  PI = "PI",
  E = "E"
}

export enum Functions {
  SQRT = "SQRT",
  SIN = "SIN",
  COS = "COS",
  POW = "POW",
  TAN = "TAN",
  ABS = "ABS",
  ROUND = "ROUND",
  FLOOR = "FLOOR",
  CEIL = "CEIL"
}