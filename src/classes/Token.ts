import { unreachable } from "../utils/ErrorHandler"

export class Token implements TokenInterface {
  constructor(public readonly type: TokenType) { }
}

export class LiteralToken<T> implements TokenValueInterface<T> {
  constructor(public readonly type: TokenType, public readonly lexeme: T) { }
}

export function typeToString(type: TokenType) {
  switch (type) {
    case TokenType.NUMBER: return "NUMBER"
    case TokenType.ADD: return "ADDITION"
    case TokenType.SUB: return "SUBTRACTION"
    case TokenType.MUL: return "MULTIPLICATION"
    case TokenType.DIV: return "DIVISION"
    case TokenType.POW: return "POWER"
    case TokenType.MOD: return "MODULO"
    case TokenType.OPENPAREN: return "OPENPAREN"
    case TokenType.CLOSEPAREN: return "CLOSEPAREN"
    case TokenType.EOF: return "EOF"
    default: unreachable("TokenType")
  }
}

export interface TokenInterface {
  readonly type: TokenType
}

export interface TokenValueInterface<T> extends TokenInterface {
  readonly lexeme: T
}

export enum TokenType {
  NUMBER,
  ADD,
  SUB,
  MUL,
  DIV,
  POW,
  MOD,
  OPENPAREN,
  CLOSEPAREN,
  EOF
}