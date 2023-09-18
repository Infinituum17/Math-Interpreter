import { describe, expect, test } from "bun:test"
import { Interpreter } from "../src/classes/Interpreter"
import { Parser } from "../src/classes/Parser"
import Lexer from "../src/classes/Lexer"

describe("Functions and Constants", () => {
  test("PI", () => {
    expect(Interpreter.eval(new Parser(new Lexer("PI").analyze()).parse()))
      .toBe(3.141592653589793);
  })

  test("PI + 1", () => {
    expect(Interpreter.eval(new Parser(new Lexer("PI + 1").analyze()).parse()))
      .toBe(4.141592653589793);
  })

  test("E", () => {
    expect(Interpreter.eval(new Parser(new Lexer("E").analyze()).parse()))
      .toBe(2.718281828459045);
  })

  test("sqrt(4)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("sqrt(4)").analyze()).parse()))
      .toBe(2)
  })

  test("sqrt", () => {
    // TODO: Refactor when bun:test expect.toThrow is fixed
    let error: unknown

    try {
      new Parser(new Lexer("sqrt").analyze()).parse()
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
  })

  test("sin(PI / 2)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("sin(PI / 2)").analyze()).parse()))
      .toBe(1)
  })

  test("cos(PI)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("cos(PI)").analyze()).parse()))
      .toBe(-1)
  })

  test("sqrt(sin(PI / 2) * 4)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("sqrt(sin(PI / 2) * 4)").analyze()).parse()))
      .toBe(2)
  })

  test("pow(2, 2)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("pow(2, 2)").analyze()).parse()))
      .toBe(4)
  })

  test("pow(2)", () => {
    // TODO: Refactor when bun:test expect.toThrow is fixed
    let error: unknown

    try {
      new Parser(new Lexer("pow(2)").analyze()).parse()
    } catch (e) {
      error = e
    }

    expect(error).toBeDefined()
  })

  test("round(tan(PI / 4))", () => {
    expect(Interpreter.eval(new Parser(new Lexer("round(tan(PI / 4))").analyze()).parse()))
      .toBe(1)
  })

  test("abs(-5)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("abs(-5)").analyze()).parse()))
      .toBe(5)
  })

  test("round(1 / 3)", () => {
    expect(Interpreter.eval(new Parser(new Lexer("round(1 / 3)").analyze()).parse()))
      .toBe(0)
  })
})