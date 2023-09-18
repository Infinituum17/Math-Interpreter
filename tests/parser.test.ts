import { describe, expect, test } from "bun:test"
import Lexer from "../src/classes/Lexer"
import { Parser } from "../src/classes/Parser"
import { ASTTypes, TokenTypes } from "../src/types/TypeEnums"

describe("Parser", () => {
  test("1 + 1", () => {
    const lexer = new Lexer("1 + 1")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: ASTTypes.OP_BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ASTTypes.NUMERIC,
        value: 1
      },
      right: {
        type: ASTTypes.NUMERIC,
        value: 1
      }
    })
  })

  test("10 * 3 + 4", () => {
    const lexer = new Lexer("10 * 3 + 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: ASTTypes.OP_BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ASTTypes.OP_BINARY,
        operator: TokenTypes.MUL,
        left: {
          type: ASTTypes.NUMERIC,
          value: 10
        },
        right: {
          type: ASTTypes.NUMERIC,
          value: 3
        }
      },
      right: {
        type: ASTTypes.NUMERIC,
        value: 4
      }
    })
  })

  test("10 + 3 * 4", () => {
    const lexer = new Lexer("10 + 3 * 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: ASTTypes.OP_BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ASTTypes.NUMERIC,
        value: 10
      },
      right: {
        type: ASTTypes.OP_BINARY,
        operator: TokenTypes.MUL,
        left: {
          type: ASTTypes.NUMERIC,
          value: 3
        },
        right: {
          type: ASTTypes.NUMERIC,
          value: 4
        }
      }
    })
  })

  test("(10 + 3.2) * 4", () => {
    const lexer = new Lexer("(10 + 3.2) * 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: ASTTypes.OP_BINARY,
      operator: TokenTypes.MUL,
      left: {
        type: ASTTypes.OP_BINARY,
        operator: TokenTypes.ADD,
        left: {
          type: ASTTypes.NUMERIC,
          value: 10
        },
        right: {
          type: ASTTypes.NUMERIC,
          value: 3.2
        }
      },
      right: {
        type: ASTTypes.NUMERIC,
        value: 4
      }
    })
  })

  test("-3", () => {
    const lexer = new Lexer("-3")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: ASTTypes.OP_UNARY,
      operator: TokenTypes.SUB,
      value: {
        type: ASTTypes.NUMERIC,
        value: 3
      }
    })
  })

  test("--3", () => {
    // TODO: Refactor when bun:test expect.toThrow is fixed
    let error: unknown

    try {
      new Parser(new Lexer("--3").analyze()).parse()
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
  })

  test("1 + 2 ** 3", () => {
    const lexer = new Lexer("1 + 2 / 3 ** 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: ASTTypes.OP_BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ASTTypes.NUMERIC,
        value: 1
      },
      right: {
        type: ASTTypes.OP_BINARY,
        operator: TokenTypes.DIV,
        left: {
          type: ASTTypes.NUMERIC,
          value: 2
        },
        right: {
          type: ASTTypes.OP_BINARY,
          operator: TokenTypes.POW,
          left: {
            type: ASTTypes.NUMERIC,
            value: 3
          },
          right: {
            type: ASTTypes.NUMERIC,
            value: 4
          }
        }
      }
    })
  })
})