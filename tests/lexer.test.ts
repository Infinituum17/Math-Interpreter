import { describe, expect, test, } from "bun:test"
import Lexer from "../src/classes/Lexer"
import { Token } from "../src/classes/Token"
import { TokenTypes } from "../src/enums/TokenTypes.enum"

describe("Lexer", () => {
  test("1 + 1", () => {
    const tokens = new Lexer("1 + 1").tokens

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new Token(TokenTypes.NUMBER, 1),
      new Token(TokenTypes.ADD),
      new Token(TokenTypes.NUMBER, 1),
      new Token(TokenTypes.EOF)
    ])
  })

  test("1.0 * 1", () => {
    const tokens = new Lexer("1.0 * 1").tokens

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new Token(TokenTypes.NUMBER, 1),
      new Token(TokenTypes.MUL),
      new Token(TokenTypes.NUMBER, 1),
      new Token(TokenTypes.EOF)
    ])
  })

  test("2.15 /1.2", () => {
    const tokens = new Lexer("2.15 /1.2").tokens

    expect(tokens).toBeArrayOfSize(4)
    expect(tokens).toEqual([
      new Token(TokenTypes.NUMBER, 2.15),
      new Token(TokenTypes.DIV),
      new Token(TokenTypes.NUMBER, 1.2),
      new Token(TokenTypes.EOF)
    ])
  })

  test("(4- 3.55555)", () => {
    const tokens = new Lexer("(4- 3.55555)").tokens

    expect(tokens).toBeArrayOfSize(6)
    expect(tokens).toEqual([
      new Token(TokenTypes.OPENPAREN),
      new Token(TokenTypes.NUMBER, 4),
      new Token(TokenTypes.SUB),
      new Token(TokenTypes.NUMBER, 3.55555),
      new Token(TokenTypes.CLOSEPAREN),
      new Token(TokenTypes.EOF)
    ])
  })

  test("102 + 1002.2 ** 4 % 5", () => {
    const tokens = new Lexer("102 + 1002.2 ** 4 % 5").tokens

    expect(tokens).toBeArrayOfSize(8)
    expect(tokens).toEqual([
      new Token(TokenTypes.NUMBER, 102),
      new Token(TokenTypes.ADD),
      new Token(TokenTypes.NUMBER, 1002.2),
      new Token(TokenTypes.POW),
      new Token(TokenTypes.NUMBER, 4),
      new Token(TokenTypes.MOD),
      new Token(TokenTypes.NUMBER, 5),
      new Token(TokenTypes.EOF)
    ])
  })
})