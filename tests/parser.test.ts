import { describe, expect, test } from "bun:test"
import Lexer from "../src/classes/Lexer"
import { Parser } from "../src/classes/Parser"
import { ParseTypes, OperationTypes, TokenTypes } from "../src/types/TypeEnums"

describe("Parser", () => {
  test("1 + 1", () => {
    const lexer = new Lexer("1 + 1")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: OperationTypes.BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ParseTypes.NUMERIC,
        value: 1
      },
      right: {
        type: ParseTypes.NUMERIC,
        value: 1
      }
    })
  })

  test("10 * 3 + 4", () => {
    const lexer = new Lexer("10 * 3 + 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: OperationTypes.BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: OperationTypes.BINARY,
        operator: TokenTypes.MUL,
        left: {
          type: ParseTypes.NUMERIC,
          value: 10
        },
        right: {
          type: ParseTypes.NUMERIC,
          value: 3
        }
      },
      right: {
        type: ParseTypes.NUMERIC,
        value: 4
      }
    })
  })

  test("10 + 3 * 4", () => {
    const lexer = new Lexer("10 + 3 * 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: OperationTypes.BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ParseTypes.NUMERIC,
        value: 10
      },
      right: {
        type: OperationTypes.BINARY,
        operator: TokenTypes.MUL,
        left: {
          type: ParseTypes.NUMERIC,
          value: 3
        },
        right: {
          type: ParseTypes.NUMERIC,
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
      type: OperationTypes.BINARY,
      operator: TokenTypes.MUL,
      left: {
        type: OperationTypes.BINARY,
        operator: TokenTypes.ADD,
        left: {
          type: ParseTypes.NUMERIC,
          value: 10
        },
        right: {
          type: ParseTypes.NUMERIC,
          value: 3.2
        }
      },
      right: {
        type: ParseTypes.NUMERIC,
        value: 4
      }
    })
  })

  test("-3", () => {
    const lexer = new Lexer("-3")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: OperationTypes.UNARY,
      operator: TokenTypes.SUB,
      value: {
        type: ParseTypes.NUMERIC,
        value: 3
      }
    })
  })

  test("--3", () => {
    const lexer = new Lexer("--3")
    const parser = new Parser(lexer.analyze())

    expect(parser.parse).toThrow()
  })

  test("1 + 2 ** 3", () => {
    const lexer = new Lexer("1 + 2 / 3 ** 4")
    const parser = new Parser(lexer.analyze())
    const result = parser.parse()

    expect(result).toEqual({
      type: OperationTypes.BINARY,
      operator: TokenTypes.ADD,
      left: {
        type: ParseTypes.NUMERIC,
        value: 1
      },
      right: {
        type: OperationTypes.BINARY,
        operator: TokenTypes.DIV,
        left: {
          type: ParseTypes.NUMERIC,
          value: 2
        },
        right: {
          type: OperationTypes.BINARY,
          operator: TokenTypes.POW,
          left: {
            type: ParseTypes.NUMERIC,
            value: 3
          },
          right: {
            type: ParseTypes.NUMERIC,
            value: 4
          }
        }
      }
    })
  })
})