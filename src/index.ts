import Lexer from "./classes/Lexer"
import { Parser } from "./classes/Parser"

function cli(argv: string[]) {
  const args = argv.slice(2)

  switch (args[0]) {
    case "--help":
      console.log("Help command:")
      console.log()
      console.log("--tokenize    <string>")
      console.log("--parse       <string>")

      return

    case "--tokenize":
      console.log("Output:")
      console.log()
      console.log(new Lexer(args.slice(1).join("")).visualize())

      return

    case "--parse":
      const lexer = new Lexer(args.slice(1).join(""))
      const parser = new Parser(lexer.tokens)

      console.log("Output:")
      console.log()
      console.log(parser.parse())

      return

    default:
      throw new Error("Default branch of 'cli' function")
  }
}

cli(Bun.argv)
