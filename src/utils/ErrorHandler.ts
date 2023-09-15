export function todo(what: string) {
  throw new Error(`[TODO] ${what} is not implemented`)
}

export function unreachable(what: string) {
  throw new Error(`[ERROR] Reached unreachable code from ${what}`)
}

export function error(what: string) {
  throw new Error(`[ERROR] Error from ${what}`)
}

export function log(what: string) {
  console.log(`[DEBUG] ${what}`)
}