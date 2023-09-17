import { describe, expect, test } from "bun:test"
import Lexer from "../src/classes/Lexer"
import { Parser } from "../src/classes/Parser"
import { Interpreter } from "../src/classes/Interpreter"

describe("Interpreter", () => {
  test("1 + 1", () => {
    const lexer = new Lexer("1 + 1")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(2)
  })

  test("4 ** (1 / 2)", () => {
    const lexer = new Lexer("4 ** (1 / 2)")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(2)
  })

  test("6 ** 1 / 2", () => {
    const lexer = new Lexer("6 ** 1 / 2")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(3)
  })

  test("4 + 4 * 3 / 2", () => {
    const lexer = new Lexer("4 + 4 * 3 / 2")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(10)
  })

  test("(10 ** 2) * (6 + 1) + 40 * (30 / 15) - 10 + 7", () => {
    const lexer = new Lexer("(10 ** 2) * (6 + 1) + 40 * (30 / 15) - 10 + 7")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(777)
  })

  test("4 % 3 ** 2", () => {
    const lexer = new Lexer("4 % 3 ** 2")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(4)
  })

  test("3 / 4 ** 4 % 2", () => {
    const lexer = new Lexer("3 / 4 ** 4 % 2")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(0.01171875)
  })

  test("1 * 5 / 6 % 3 ** 2 - 38 / 2 ** (1 / 2) - 4 + 100 * 0.5", () => {
    const lexer = new Lexer("1 * 5 / 6 % 3 ** 2 - 38 / 2 ** (1 / 2) - 4 + 100 * 0.5")
    const parser = new Parser(lexer.analyze())

    expect(Interpreter.eval(parser.parse())).toBe(19.96327564824453)
  })
})