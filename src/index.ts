import { todo } from "./utils/ErrorHandler"
import Lexer from "./classes/Lexer"

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
      const lexer = new Lexer(args.slice(1).join(""))

      console.log("Output:")
      console.log()
      console.log(lexer.visualize())

      return

    case "--parse":
      todo("Parser")
      return

    default:
      todo("Default branch of 'cli' function")
      return
  }
}

cli(Bun.argv)
