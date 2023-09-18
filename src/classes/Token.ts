import { Constants, Functions, TokenTypes } from "../types/TypeEnums"

export class IdentifierToken implements BaseToken {
  public readonly type: TokenTypes
  constructor(public readonly value: Constants | Functions) {
    this.type = TokenTypes.IDENTIFIER
  }
}

export class LiteralToken implements BaseToken {
  public readonly type: TokenTypes
  constructor(public readonly value: number) {
    this.type = TokenTypes.NUMBER
  }
}

export class Token implements BaseToken {
  constructor(public readonly type: TokenTypes) { }
}

export interface BaseToken {
  readonly type: TokenTypes
}