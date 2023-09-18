import { ASTNode } from "../types/ASTTypes"
import { ASTTypes, TokenTypes, Functions } from "../types/TypeEnums"

export class Interpreter {
  public static eval(node: ASTNode): number {
    if (node.type === ASTTypes.OP_BINARY) {
      const operator = node.operator
      const left = Interpreter.eval(node.left)
      const right = Interpreter.eval(node.right)

      return Interpreter.performBinaryOperation(left, operator, right)
    } else if (node.type === ASTTypes.OP_UNARY) {
      const operator = node.operator
      const value = Interpreter.eval(node.value)

      return Interpreter.performUnaryOperation(operator, value)
    } else if (node.type === ASTTypes.FUNCALL) {
      const funtype = node.funtype
      const args = node.args.map(arg => Interpreter.eval(arg))

      return Interpreter.performFunctionCall(funtype, args)
    } else if (node.type === ASTTypes.NUMERIC) {
      return node.value
    }

    throw new Error("[ERROR] Unexpected type in AST tree")
  }

  private static performFunctionCall(type: Functions, args: number[]): number {
    switch (type) {
      case Functions.SQRT:
        return Math.sqrt(args[0])
      case Functions.COS:
        return Math.cos(args[0])
      case Functions.SIN:
        return Math.sin(args[0])
      case Functions.POW:
        return Math.pow(args[0], args[1])
      case Functions.ABS:
        return Math.abs(args[0])
      case Functions.TAN:
        return Math.tan(args[0])
      case Functions.ROUND:
        return Math.round(args[0])
      default:
        throw new Error(`[ERROR] A valid function name was expected, but instead '${type}' was received`)
    }
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