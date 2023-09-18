import { ASTNode, Literal } from "../types/ASTTypes"
import { ASTTypes, TokenTypes, Constants, Functions } from "../types/TypeEnums"
import { getFunctionArgLength, mapConstantsToValue } from "../utils/Utils"
import { BaseToken, IdentifierToken, LiteralToken, Token } from "./Token"

export class Parser {
  private cursor = 0

  constructor(private tokens: BaseToken[]) { }

  private at(): BaseToken {
    return this.tokens[this.cursor]
  }

  private peek(n = 1): BaseToken {
    return this.tokens[this.cursor + n]
  }

  private consume(type: TokenTypes) {
    if (this.at().type === type) {
      this.cursor++
    } else {
      throw new Error(`[ERROR] Expected token of type ${type}, instead received ${this.at().type}`)
    }
  }

  public parse() {
    const ast = this.parseExpression()

    try {
      this.consume(TokenTypes.EOF)
    } catch (e) {
      throw new Error(`[ERROR] Cannot parse remaining tokens, expected ${TokenTypes.EOF}`)
    }

    return ast
  }

  private parseExpression(): ASTNode {
    let left = this.parseTerm()

    while (this.at().type === TokenTypes.ADD || this.at().type === TokenTypes.SUB) {
      const operator = this.at().type
      this.consume(this.at().type)
      const right = this.parseTerm()

      left = { type: ASTTypes.OP_BINARY, operator, left, right }
    }

    return left
  }

  private parseTerm(): ASTNode {
    let left = this.parseFactor()

    while (this.at().type === TokenTypes.MUL || this.at().type === TokenTypes.DIV || this.at().type === TokenTypes.MOD) {
      const operator = this.at().type
      this.consume(this.at().type)
      const right = this.parseFactor()

      left = { type: ASTTypes.OP_BINARY, operator, left, right }
    }

    return left
  }

  private parseFactor(): ASTNode {
    let left = this.parseBase()

    while (this.at().type === TokenTypes.POW) {
      const operator = this.at().type
      this.consume(this.at().type)
      const right = this.parseBase()

      left = { type: ASTTypes.OP_BINARY, operator, left, right }
    }

    return left
  }

  private parseBase(): ASTNode {
    let prefixOperator = (this.at().type === TokenTypes.SUB) ? this.parseUnary() : null

    if (this.at().type === TokenTypes.IDENTIFIER) {
      return this.parseIdentifier()
    }

    if (this.at().type === TokenTypes.NUMBER) {
      return this.parseLiteral(prefixOperator)
    }

    if (this.at().type === TokenTypes.OPENPAREN) {
      return this.parseFunctionCall(prefixOperator)
    }

    throw new Error(`[ERROR] Expected a parenthesis token, an integer in input or a unary operation, instead received ${this.at().type}`)
  }

  private parseUnary(): TokenTypes.SUB {
    this.consume(TokenTypes.SUB)
    return TokenTypes.SUB
  }

  private parseIdentifier(): ASTNode {
    const name = (this.at() as IdentifierToken).value!
    this.consume(TokenTypes.IDENTIFIER)

    if (name in Constants) {
      return { type: ASTTypes.NUMERIC, value: mapConstantsToValue(name as Constants) }
    }

    if (name in Functions) {
      const args = this.parseFunctionArgs()

      if (getFunctionArgLength(name as Functions) !== args.length)
        throw new Error(`[ERROR] Invalid number of arguments for function ${name}`)

      return { type: ASTTypes.FUNCALL, args, funtype: name as Functions }
    } else {
      throw new Error(`[ERROR] Invalid identifier ${name}`)
    }
  }

  private parseLiteral(prefixOperator: TokenTypes.SUB | null): ASTNode {
    let literal: Literal = { type: ASTTypes.NUMERIC, value: ((this.at() as LiteralToken).value)! }
    this.consume(TokenTypes.NUMBER)

    if (prefixOperator !== null) {
      return { type: ASTTypes.OP_UNARY, operator: prefixOperator, value: literal }
    }

    return literal
  }

  private parseFunctionCall(prefixOperator: TokenTypes.SUB | null): ASTNode {
    this.consume(TokenTypes.OPENPAREN)
    const expr = this.parseExpression()
    this.consume(TokenTypes.CLOSEPAREN)

    if (prefixOperator !== null) {
      return { type: ASTTypes.OP_UNARY, operator: prefixOperator, value: expr }
    }

    return expr
  }

  private parseFunctionArgs(): ASTNode[] {
    const args: ASTNode[] = [];

    this.consume(TokenTypes.OPENPAREN)

    while (this.peek().type === TokenTypes.SEPARATOR) {
      args.push(this.parseExpression())
      this.consume(TokenTypes.SEPARATOR)
    }
    args.push(this.parseExpression())

    this.consume(TokenTypes.CLOSEPAREN)

    return args
  }
}

