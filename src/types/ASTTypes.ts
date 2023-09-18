import { ParseTypes, OperationTypes, TokenTypes, Functions } from "./TypeEnums"

export type ASTNode = BinaryOperation | Literal | UnaryOperation | FunctionCall

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
  type: ParseTypes.NUMERIC,
  value: number
}

export interface FunctionCall {
  type: ParseTypes.FUNCALL,
  funtype: Functions,
  args: ASTNode[]
}