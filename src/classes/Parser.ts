
import { ASTNode } from "../types/ASTTypes"
import { LiteralTypes, OperationTypes, TokenTypes } from "../types/TypeEnums"
import { Token } from "./Token"

export class Parser {
  private cursor = 0

  constructor(private tokens: Token[]) { }

  private at(): Token {
    return this.tokens[this.cursor]
  }

  private peek(n = 1): Token {
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
    return this.parseExpression()
  }

  private parseExpression(): ASTNode {
    let left = this.parseTerm()

    while (this.at().type === TokenTypes.ADD || this.at().type === TokenTypes.SUB) {
      const operator = this.at().type
      this.consume(this.at().type)
      const right = this.parseTerm()

      left = { type: OperationTypes.BINARY, operator, left, right }
    }

    return left
  }

  private parseTerm(): ASTNode {
    let left = this.parseFactor()

    while (this.at().type === TokenTypes.MUL || this.at().type === TokenTypes.DIV) {
      const operator = this.at().type
      this.consume(this.at().type)
      const right = this.parseFactor()

      left = { type: OperationTypes.BINARY, operator, left, right }
    }

    return left
  }

  private parseFactor(): ASTNode {
    let left = this.parseBase()

    while (this.at().type === TokenTypes.MOD || this.at().type === TokenTypes.POW) {
      const operator = this.at().type
      this.consume(this.at().type)
      const right = this.parseBase()

      left = { type: OperationTypes.BINARY, operator, left, right }
    }

    return left
  }

  private parseBase(): ASTNode {
    let prefixOperator: TokenTypes | null = null

    if (this.at().type === TokenTypes.SUB) {
      this.consume(TokenTypes.SUB)
      prefixOperator = TokenTypes.SUB
    }

    if (this.at().type === TokenTypes.NUMBER) {
      let literal = { type: LiteralTypes.NUMERIC, value: this.at().value! }
      this.consume(TokenTypes.NUMBER)

      if (prefixOperator !== null) {
        return { type: OperationTypes.UNARY, operator: prefixOperator, value: literal }
      }

      return literal
    }

    if (this.at().type === TokenTypes.OPENPAREN) {
      this.consume(TokenTypes.OPENPAREN)
      const expr = this.parseExpression()
      this.consume(TokenTypes.CLOSEPAREN)

      if (prefixOperator !== null) {
        return { type: OperationTypes.UNARY, operator: prefixOperator, value: expr }
      }

      return expr
    }

    throw new Error(`[ERROR] Expected a parenthesis token, an integer in input or a unary operation, instead received ${this.at().type}`)
  }
}

