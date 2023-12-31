import { Constants, Functions, TokenTypes } from '../types/TypeEnums'
import { BaseToken, IdentifierToken, LiteralToken, Token } from './Token'

export default class Lexer {
  constructor(private input: string) { }

  public analyze(): Token[] {
    const tokens: BaseToken[] = []

    this.input = this.input.trim()

    while (this.input.length > 0) {
      const char = this.input[0]

      if (/\d/.test(char)) {
        const len = this.getLiteralLength(/\d|\./)
        const nStr = this.input.slice(0, len)
        this.consume(len)

        if (!/^\d+(\.\d+)?$/.test(nStr)) {
          throw new Error(`[ERROR] Not a valid number: ${nStr}`)
        }

        tokens.push(new LiteralToken(parseFloat(nStr)))
      } else if (char === "(") {
        tokens.push(new Token(TokenTypes.OPENPAREN))
        this.consume(1)
      } else if (char === ")") {
        tokens.push(new Token(TokenTypes.CLOSEPAREN))
        this.consume(1)
      } else if (char === "+") {
        tokens.push(new Token(TokenTypes.ADD))
        this.consume(1)
      } else if (char === "-") {
        tokens.push(new Token(TokenTypes.SUB))
        this.consume(1)
      } else if (char === "*") {
        if (this.getNext() === "*") {
          tokens.push(new Token(TokenTypes.POW))
          this.consume(2)
        } else {
          tokens.push(new Token(TokenTypes.MUL))
          this.consume(1)
        }
      } else if (char === "/") {
        tokens.push(new Token(TokenTypes.DIV))
        this.consume(1)
      } else if (char === "%") {
        tokens.push(new Token(TokenTypes.MOD))
        this.consume(1)
      } else if (/[a-z]/i.test(char)) {
        const len = this.getLiteralLength(/[a-z]/i)
        const iStr = this.input.slice(0, len).toUpperCase()
        tokens.push(new IdentifierToken(this.verifyIdentifier(iStr)))
        this.consume(len)
      } else if (char === ",") {
        tokens.push(new Token(TokenTypes.SEPARATOR))
        this.consume(1)
      } else {
        throw new Error(`[ERROR] Unrecognised token: "${char}"`)
      }

      this.input = this.input.trimStart()
    }

    tokens.push(new Token(TokenTypes.EOF))

    return tokens
  }

  private verifyIdentifier(identifier: string) {
    switch (identifier) {
      case Constants.PI:
      case Constants.E:
        return identifier

      case Functions.SQRT:
      case Functions.COS:
      case Functions.SIN:
      case Functions.POW:
      case Functions.TAN:
      case Functions.ABS:
      case Functions.ROUND:
      case Functions.FLOOR:
      case Functions.CEIL:
        return identifier

      default:
        throw new Error(`[ERROR] Not a valid identifier: ${identifier}`)
    }
  }

  private getLiteralLength(matchPattern: RegExp) {
    let i = 1

    while (matchPattern.test(this.input[i]) && i < this.input.length) i++

    return i
  }

  private getNext() {
    return this.input.slice(1).trimStart()[0]
  }

  private consume(n: number) {
    this.input = this.input.slice(n)
  }
}