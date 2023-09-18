import { ASTTypes, TokenTypes, Functions } from "./TypeEnums"

export type ASTNode = Literal | BinaryOperation | UnaryOperation | FunctionCall

export interface BinaryOperation {
  type: ASTTypes.OP_BINARY,
  left: ASTNode,
  operator: TokenTypes,
  right: ASTNode
}

export interface UnaryOperation {
  type: ASTTypes.OP_UNARY,
  operator: TokenTypes.SUB,
  value: ASTNode
}

export interface FunctionCall {
  type: ASTTypes.FUNCALL,
  funtype: Functions,
  args: ASTNode[]
}

export interface Literal {
  type: ASTTypes.NUMERIC,
  value: number
}