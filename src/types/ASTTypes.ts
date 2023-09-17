import { LiteralTypes, OperationTypes, TokenTypes } from "./TypeEnums"

export type ASTNode = BinaryOperation | Literal | UnaryOperation

export interface BinaryOperation {
  type: OperationTypes.BINARY,
  operator: TokenTypes,
  left: ASTNode,
  right: ASTNode
}

export interface UnaryOperation {
  type: OperationTypes.UNARY,
  operator: TokenTypes,
  value: ASTNode
}

export interface Literal {
  type: LiteralTypes,
  value: number
}