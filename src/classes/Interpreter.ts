import { ASTNode } from "../types/ASTTypes"
import { ParseTypes, OperationTypes, TokenTypes } from "../types/TypeEnums"

export class Interpreter {
  public static eval(node: ASTNode): number {
    if (node.type === OperationTypes.BINARY) {
      const operator = node.operator
      const left = Interpreter.eval(node.left)
      const right = Interpreter.eval(node.right)

      return Interpreter.performBinaryOperation(left, operator, right)
    } else if (node.type === OperationTypes.UNARY) {
      const operator = node.operator
      const value = Interpreter.eval(node.value)

      return Interpreter.performUnaryOperation(operator, value)
    } else if (node.type === ParseTypes.NUMERIC) {
      return node.value
    }

    throw new Error("[ERROR] Unexpected type in AST tree")
  }

  private static performUnaryOperation(operator: TokenTypes, value: number): number {
    if (operator === TokenTypes.SUB) {
      return -value
    }

    throw new Error(`[ERROR] A valid unary operation was expected, but instead '${operator}' was received`)
  }

  private static performBinaryOperation(left: number, operator: TokenTypes, right: number): number {
    switch (operator) {
      case TokenTypes.ADD:
        return left + right
      case TokenTypes.SUB:
        return left - right
      case TokenTypes.MUL:
        return left * right
      case TokenTypes.DIV:
        return left / right
      case TokenTypes.MOD:
        return left % right
      case TokenTypes.POW:
        return left ** right
      default:
        throw new Error(`[ERROR] A valid binary operation was expected, but instead '${operator}' was received`)
    }
  }
}