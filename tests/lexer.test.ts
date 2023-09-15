import { describe, expect, test, } from "bun:test"
import Lexer from "../src/classes/Lexer"
import { LiteralToken, Token, TokenType } from "../src/classes/Token"

describe("Lexer", () => {
  test("1 + 1", () => {
    const tokens = new Lexer("1 + 1").tokens

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new LiteralToken(TokenType.NUMBER, 1),
      new Token(TokenType.ADD),
      new LiteralToken(TokenType.NUMBER, 1),
      new Token(TokenType.EOF)
    ])
  })

  test("1.0 * 1", () => {
    const tokens = new Lexer("1.0 * 1").tokens

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new LiteralToken(TokenType.NUMBER, 1),
      new Token(TokenType.MUL),
      new LiteralToken(TokenType.NUMBER, 1),
      new Token(TokenType.EOF)
    ])
  })

  test("2.15 /1.2", () => {
    const tokens = new Lexer("2.15 /1.2").tokens

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new LiteralToken(TokenType.NUMBER, 2.15),
      new Token(TokenType.DIV),
      new LiteralToken(TokenType.NUMBER, 1.2),
      new Token(TokenType.EOF)
    ])
  })

  test("(4- 3.55555)", () => {
    const tokens = new Lexer("(4- 3.55555)").tokens

    expect(tokens).toBeArrayOfSize(6)
    expect(tokens).toEqual([
      new Token(TokenType.OPENPAREN),
      new LiteralToken(TokenType.NUMBER, 4),
      new Token(TokenType.SUB),
      new LiteralToken(TokenType.NUMBER, 3.55555),
      new Token(TokenType.CLOSEPAREN),
      new Token(TokenType.EOF)
    ])
  })

  test("102 + 1002.2 ** 4 % 5", () => {
    const tokens = new Lexer("102 + 1002.2 ** 4 % 5").tokens

    expect(tokens).toBeArrayOfSize(8)
    expect(tokens).toEqual([
      new LiteralToken(TokenType.NUMBER, 102),
      new Token(TokenType.ADD),
      new LiteralToken(TokenType.NUMBER, 1002.2),
      new Token(TokenType.POW),
      new LiteralToken(TokenType.NUMBER, 4),
      new Token(TokenType.MOD),
      new LiteralToken(TokenType.NUMBER, 5),
      new Token(TokenType.EOF)
    ])
  })
})