import { error } from '../utils/ErrorHandler'
import { LiteralToken, Token, TokenInterface, TokenType, typeToString } from './Token'

export default class Lexer {
  private _tokens: TokenInterface[] = []

  constructor(private input: string) { }

  public hasAnalyzed() {
    return this._tokens.length != 0
  }

  private parse() {
    this.input = this.input.trim()

    if (this.input.length === 0) return

    do {
      const char = this.input[0]

      if (/\d/.test(char)) {
        const nStr = this.getLiteral(/\d|\./)

        if (!/^\d+(\.\d+)?$/.test(nStr)) error("Not a valid number")

        this.addToken(new LiteralToken(TokenType.NUMBER, parseFloat(nStr)))
      } else if (char === "(") {
        this.addTokenAndConsume(new Token(TokenType.OPENPAREN))
      } else if (char === ")") {
        this.addTokenAndConsume(new Token(TokenType.CLOSEPAREN))
      } else if (char === "+") {
        this.addTokenAndConsume(new Token(TokenType.ADD))
      } else if (char === "-") {
        this.addTokenAndConsume(new Token(TokenType.SUB))
      } else if (char === "*") {
        if (this.getNext() === "*") {
          this.addTokenAndConsume(new Token(TokenType.POW), 2)
        } else {
          this.addTokenAndConsume(new Token(TokenType.MUL))
        }
      } else if (char === "/") {
        this.addTokenAndConsume(new Token(TokenType.DIV))
      } else if (char === "%") {
        this.addTokenAndConsume(new Token(TokenType.MOD))
      } else {
        throw new Error(`Unrecognised token: "${char}"`)
      }

      this.input = this.input.trimStart()
    } while (this.input.length > 0)

    this.addToken(new Token(TokenType.EOF))
  }

  private getLiteral(matchPattern: RegExp) {
    const len = this.getLiteralLength(matchPattern)
    const result = this.input.slice(0, len)
    this.consume(len)

    return result
  }

  private getLiteralLength(matchPattern: RegExp) {
    let i = 1

    while (matchPattern.test(this.input[i])) i++

    return i
  }

  private getNext() {
    return this.input.slice(1).trimStart()[0]
  }

  private consume(n: number) {
    this.input = this.input.slice(n)
  }

  public visualize(): string {
    if (!this.hasAnalyzed()) this.parse()

    for (const token of this._tokens) {
      if (token instanceof LiteralToken) {
        console.log(`Type: ${typeToString(token.type)} | Value: ${token.lexeme}`)
      } else {
        console.log(`Type: ${typeToString(token.type)}`)
      }
    }

    return ""
  }

  public get tokens() {
    if (!this.hasAnalyzed()) this.parse()

    return this._tokens
  }

  private addTokenAndConsume(token: TokenInterface, i = 1) {
    this.addToken(token)
    this.consume(i)
  }

  private addToken(token: TokenInterface) {
    this._tokens.push(token)
  }
}