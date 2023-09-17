import { LiteralTypes, OperationTypes, TokenTypes } from "./TypeEnums"

export type Expression = BinaryOperation | Literal | UnaryOperation

export interface BinaryOperation {
  type: OperationTypes.BINARY,
  operator: TokenTypes,
  left: Expression,
  right: Expression
}

export interface UnaryOperation {
  type: OperationTypes.UNARY,
  operator: TokenTypes,
  value: Expression
}

export interface Literal {
  type: LiteralTypes,
  value: number
}