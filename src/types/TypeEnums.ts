export enum ParseTypes {
  NUMERIC = "Numeric",
  FUNCALL = "Function"
}

export enum OperationTypes {
  BINARY = "BinaryOperation",
  UNARY = "UnaryOperation"
}

export enum TokenTypes {
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
  ROUND = "ROUND"
}