
import { TokenTypes } from '../types/TypeEnums'
import { Token } from './Token'

export default class Lexer {
  private _tokens: Token[] = []

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

        if (!/^\d+(\.\d+)?$/.test(nStr)) {
          throw new Error("[ERROR] Not a valid number")
        }

        this.addToken(new Token(TokenTypes.NUMBER, parseFloat(nStr)))
      } else if (char === "(") {
        this.addTokenAndConsume(new Token(TokenTypes.OPENPAREN))
      } else if (char === ")") {
        this.addTokenAndConsume(new Token(TokenTypes.CLOSEPAREN))
      } else if (char === "+") {
        this.addTokenAndConsume(new Token(TokenTypes.ADD))
      } else if (char === "-") {
        this.addTokenAndConsume(new Token(TokenTypes.SUB))
      } else if (char === "*") {
        if (this.getNext() === "*") {
          this.addTokenAndConsume(new Token(TokenTypes.POW), 2)
        } else {
          this.addTokenAndConsume(new Token(TokenTypes.MUL))
        }
      } else if (char === "/") {
        this.addTokenAndConsume(new Token(TokenTypes.DIV))
      } else if (char === "%") {
        this.addTokenAndConsume(new Token(TokenTypes.MOD))
      } else {
        throw new Error(`Unrecognised token: "${char}"`)
      }

      this.input = this.input.trimStart()
    } while (this.input.length > 0)

    this.addToken(new Token(TokenTypes.EOF))
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
      if (token.value != null) {
        console.log(`Type: ${token.type} | Value: ${token.value}`)
      } else {
        console.log(`Type: ${token.type}`)
      }
    }

    return ""
  }

  public get tokens() {
    if (!this.hasAnalyzed()) this.parse()

    return this._tokens
  }

  private addTokenAndConsume(token: Token, i = 1) {
    this.addToken(token)
    this.consume(i)
  }

  private addToken(token: Token) {
    this._tokens.push(token)
  }
}