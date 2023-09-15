import { TokenTypes } from "../enums/TokenTypes.enum"

export class Token {
  constructor(public readonly type: TokenTypes, public readonly value: number | null = null) { }
}