import { Interpreter } from "./classes/Interpreter"
import Lexer from "./classes/Lexer"
import { Parser } from "./classes/Parser"

async function cli(argv: string[]) {
  const args = argv.slice(2)

  if (args[0] === "--help") {
    return printHelp()
  } else if (args[0] === "--tokenize") {
    const lexer = new Lexer(args.slice(1).join(""))

    console.log("[Lexer] Output:")
    console.log()
    console.log(lexer.analyze())
    console.log()

    return
  } else if (args[0] === "--parse") {
    const lexer = new Lexer(args.slice(1).join(""))
    const parser = new Parser(lexer.analyze())

    console.log("[Parser] Output:")
    console.log()
    console.log(parser.parse())
    console.log()

    return
  } else if (args[0] === "--file") {
    const file = Bun.file(args[1])

    if (await file.exists()) {
      if (file.size !== 0) {
        printResult(await file.text())
        return
      } else {
        console.log(`File '${args[1]}' is empty.`)
        console.log()
        return
      }
    } else {
      console.log(`File '${args[1]}' doesn't exists.`)
      console.log()
      return
    }
  } else {
    printResult(args.join(""))
  }
}

function printHelp() {
  console.log("Help command:")
  console.log()
  console.log("[expression]  <string>")
  console.log("--tokenize    <string>")
  console.log("--parse       <string>")
  console.log()
}

function printResult(input: string) {
  if (input === "") return printHelp()

  const lexer = new Lexer(input)
  const parser = new Parser(lexer.analyze())

  console.log(`Result:`)
  console.log(Interpreter.eval(parser.parse()))
  console.log()
}

await cli(Bun.argv)
