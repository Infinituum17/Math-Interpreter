import { Constants, Functions } from "../types/TypeEnums";

export function mapConstantsToValue(constant: Constants) {
  switch (constant) {
    case Constants.PI: return Math.PI
    case Constants.E: return Math.E

    default: throw new Error(`[ERROR] Expected valid constant, instead ${constant} was provided`)
  }
}

export function getFunctionArgLength(type: Functions) {
  switch (type) {
    case Functions.SQRT:
    case Functions.COS:
    case Functions.SIN:
    case Functions.TAN:
    case Functions.ABS:
    case Functions.ROUND:
    case Functions.FLOOR:
    case Functions.CEIL:
      return 1
    case Functions.POW:
      return 2
    default:
      throw new Error(`[ERROR] A valid function name was expected, but instead '${type}' was received`)
  }
}