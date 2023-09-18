# Math Interpreter

CLI application that can solve all sorts of mathematical expressions.

The main purpose of this project was to play around with Lexical Analysis, Parsing and Interpreting ASTs.

## Explanation

The application asks for a string in input, which should contain a mathematical expression like: `1 + 1`.

Then the string is passed to a Lexer:

### Lexer

The main task of a Lexer is to read a string from input and output it as a serie of Tokens.

All tokens have this general structure:
```typescript
class Token {
  private type: TokenType,
  private value: any
}
```

The list of tokens is then fed to the Parser:

### Parser

The Parser's job is to analyze tokens and create an AST from them.

An AST (Abstract Syntax Tree) is a tree representation of the abstract syntactic structure of text.

Every node in an AST is ordered specifically: for example in this project every mathematical operation has some sort of priority of evaluation, like multiplication has precedence on addition. This can be seen in an AST by looking at the position in which every operation is set. 

Two specular ASTs may be completely different in operation's order of execution, even though the elements are the same ones.

In this example ASTs are made of nested objects:
```typescript
const AST: ASTNode = {
  type: OperationTypes.BINARY,
  left: [...],
  operator: TokenType.ADD
  right: {
    type: ParserTypes.NUMERIC,
    value: 10
  }
}
```

The AST is then passed to an Interpreter:

### Interpreter

The Interpreter uses the AST to "interpret" and evaluate each expression by traversing the tree, and outputs a result.

## Features
### Operations

Supported binary operations are (from less to more prioritized):
| Operation      | Symbol | Example  |
| -------------- | ------ | -------- |
| Addition       | +      | `x + y`  |
| Subtraction    | -      | `x - y`  |
| Multiplication | *      | `x * y`  |
| Division       | /      | `x / y`  |
| Modulo         | %      | `x % y`  |
| Power          | **     | `x ** y` |

Supported unary operations:
| Operation      | Symbol | Example  |
| -------------- | ------ | -------- |
| Negation       | -      | `-x`     |

Parenthesis:
| Operator       | Symbol | Example  |
| -------------- | ------ | -------- |
| Left Paren.    | (      | `(x...`  |
| Right Paren.   | )      | `...x)`  |

### Constants

Supported constants:
| Constant | Value     |
| -------- | --------- |
| PI       | 3.1415... |
| E        | 2.7182... |

### Functions

Supported functions:
| Function | Syntax                         | Example     |
| -------- | ------------------------------ | ----------- |
| SQRT     | sqrt(\<expr>)                  | `sqrt(1)`   |
| SIN      | sin(\<expr>)                   | `sin(1)`    |
| COS      | cos(\<expr>)                   | `cos(1)`    |
| TAN      | tan(\<expr>)                   | `tan(1)`    |
| POW      | pow(\<base:expr>, \<exp:expr>) | `pow(1, 2)` |
| ABS      | abs(\<expr>)                   | `abs(1)`    |
| ROUND    | round(\<expr>)                 | `round(1)`  |
| FLOOR    | floor(\<expr>)                 | `floor(1)`  |
| CEIL     | ceil(\<expr>)                  | `ceil(1)`   |