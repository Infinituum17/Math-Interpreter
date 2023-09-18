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
})