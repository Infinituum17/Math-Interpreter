import { Constants, TokenTypes } from "../types/TypeEnums"

export class Token {
  constructor(public readonly type: TokenTypes, public readonly value: number | Constants | null = null) { }
}