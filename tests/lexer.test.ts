import { describe, expect, test, } from "bun:test"
import Lexer from "../src/classes/Lexer"
import { LiteralToken, Token } from "../src/classes/Token"
import { TokenTypes } from "../src/types/TypeEnums"

describe("Lexer", () => {
  test("1 + 1", () => {
    const tokens = new Lexer("1 + 1").analyze()

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new LiteralToken(1),
      new Token(TokenTypes.ADD),
      new LiteralToken(1),
      new Token(TokenTypes.EOF)
    ])
  })

  test("1.0 * 1", () => {
    const tokens = new Lexer("1.0 * 1").analyze()

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new LiteralToken(1),
      new Token(TokenTypes.MUL),
      new LiteralToken(1),
      new Token(TokenTypes.EOF)
    ])
  })

  test("2.15 /1.2", () => {
    const tokens = new Lexer("2.15 /1.2").analyze()

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new LiteralToken(2.15),
      new Token(TokenTypes.DIV),
      new LiteralToken(1.2),
      new Token(TokenTypes.EOF)
    ])
  })

  test("(4- 3.55555)", () => {
    const tokens = new Lexer("(4- 3.55555)").analyze()

    expect(tokens).toBeArrayOfSize(6)
    expect(tokens).toEqual([
      new Token(TokenTypes.OPENPAREN),
      new LiteralToken(4),
      new Token(TokenTypes.SUB),
      new LiteralToken(3.55555),
      new Token(TokenTypes.CLOSEPAREN),
      new Token(TokenTypes.EOF)
    ])
  })

  test("102 + 1002.2 ** 4 % 5", () => {
    const tokens = new Lexer("102 + 1002.2 ** 4 % 5").analyze()

    expect(tokens).toBeArrayOfSize(8)
    expect(tokens).toEqual([
      new LiteralToken(102),
      new Token(TokenTypes.ADD),
      new LiteralToken(1002.2),
      new Token(TokenTypes.POW),
      new LiteralToken(4),
      new Token(TokenTypes.MOD),
      new LiteralToken(5),
      new Token(TokenTypes.EOF)
    ])
  })
})