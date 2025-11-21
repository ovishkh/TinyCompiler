# Compiler Concepts & Theory

A comprehensive guide to understanding compiler design and implementation concepts used in TinyCompiler.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Compilation Phases](#compilation-phases)
3. [Parsing Techniques](#parsing-techniques)
4. [Abstract Syntax Trees](#abstract-syntax-trees)
5. [Code Generation](#code-generation)
6. [Optimization Techniques](#optimization-techniques)
7. [Error Handling](#error-handling)
8. [Advanced Topics](#advanced-topics)

---

## Core Concepts

### What is a Compiler?

A **compiler** is a program that translates source code written in one programming language (source language) into another language (target language), usually machine code or intermediate representation.

**Basic Flow:**
```
Source Code → Lexical Analysis → Syntax Analysis → Semantic Analysis → Code Generation → Target Code
```

### Lexemes and Tokens

**Lexeme**: The actual sequence of characters in the source code.
```
Example: "variable_name", "123", "(", "+"
```

**Token**: An abstract symbol representing a lexeme.
```
Token type: IDENTIFIER, NUMBER, LPAREN, PLUS
Token value: The actual lexeme
```

### Grammar

A **grammar** is a formal system for defining the syntax of a language using production rules.

**Example BNF (Backus-Naur Form):**
```
<expression> ::= <term> | <expression> '+' <term>
<term> ::= <factor> | <term> '*' <factor>
<factor> ::= NUMBER | '(' <expression> ')'
```

### Language Classes

- **Regular Languages** - Recognized by finite automata, used for tokens
- **Context-Free Languages** - Recognized by pushdown automata, used for syntax
- **Context-Sensitive Languages** - More expressive, used in semantic analysis

---

## Compilation Phases

### Phase 1: Lexical Analysis (Tokenization)

**Purpose**: Break source code into tokens

**Process**:
1. Read input character by character
2. Recognize patterns (keywords, operators, identifiers)
3. Generate token stream

**Implementation in TinyCompiler**:
```javascript
// Tokenizer recognizes:
- Parentheses: ( )
- Numbers: [0-9]+
- Strings: "..."
- Names: [a-zA-Z]+
```

**Key Algorithms**:
- **Finite Automata** - Match patterns character by character
- **Regular Expressions** - Pattern matching rules

### Phase 2: Syntax Analysis (Parsing)

**Purpose**: Build Abstract Syntax Tree (AST) from tokens

**Process**:
1. Read token stream
2. Apply grammar rules
3. Build hierarchical structure

**Parsing Strategies**:
- **Top-Down (Recursive Descent)** - Start from root, parse down (used in TinyCompiler)
- **Bottom-Up (Shift-Reduce)** - Start from leaves, build up

**Example - TinyCompiler's Parser**:
```javascript
function walk() {
  let token = tokens[current];
  
  if (token.type === 'paren' && token.value === '(') {
    // Parse CallExpression
    let node = { type: 'CallExpression', name: token.value, params: [] };
    while (/* not closing paren */) {
      node.params.push(walk()); // Recursive descent
    }
    return node;
  }
}
```

### Phase 3: Semantic Analysis

**Purpose**: Check meaning and validity of code

**Operations**:
- Type checking
- Symbol table management
- Scope resolution
- Use-before-define checking

**Example**:
```javascript
// Check if variable is defined before use
if (symbolTable.has(variableName)) {
  // Valid - use it
} else {
  // Error - undefined variable
}
```

### Phase 4: Intermediate Code Generation

**Purpose**: Generate intermediate representation

**Options**:
- Three-address code
- Bytecode
- Virtual machine instructions
- Another AST (like TinyCompiler does)

### Phase 5: Optimization

**Purpose**: Improve code efficiency

**Techniques** (covered in Advanced Topics section)

### Phase 6: Code Generation

**Purpose**: Produce target code

**Options**:
- Machine code
- Assembly
- C code
- JavaScript (like TinyCompiler)

---

## Parsing Techniques

### Recursive Descent Parsing

**Method**: Implement each grammar rule as a function

**Advantages**:
- Easy to understand and implement
- Good error recovery
- Natural representation of grammar

**Disadvantages**:
- Not all grammars work (left-recursive grammars fail)
- Can be inefficient

**Example**:
```javascript
function parseExpression() {
  return parseAddition();
}

function parseAddition() {
  let left = parseMultiplication();
  while (currentToken.type === PLUS) {
    advance();
    let right = parseMultiplication();
    left = { type: 'Addition', left, right };
  }
  return left;
}

function parseMultiplication() {
  let left = parsePrimary();
  while (currentToken.type === STAR) {
    advance();
    let right = parsePrimary();
    left = { type: 'Multiplication', left, right };
  }
  return left;
}

function parsePrimary() {
  if (currentToken.type === NUMBER) {
    return { type: 'Number', value: currentToken.value };
  }
  // ... handle other cases
}
```

### Operator Precedence Parsing

**Method**: Use precedence rules to handle operators

**Precedence Levels**:
1. Parentheses (highest)
2. Exponentiation
3. Multiplication/Division
4. Addition/Subtraction
5. Comparison (lowest)

**Example**:
```
2 + 3 * 4  →  2 + (3 * 4)  // Multiplication has higher precedence
```

### LL(k) and LR(k) Parsers

- **LL(1)**: Left-to-right, leftmost derivation, 1 lookahead token
- **LR(1)**: Left-to-right, rightmost derivation, 1 lookahead token

---

## Abstract Syntax Trees

### What is an AST?

An **Abstract Syntax Tree** is a tree representation of the abstract syntactic structure of source code.

**Characteristics**:
- Removes unnecessary syntactic details
- Preserves semantic information
- Hierarchical structure

### AST Nodes

Each node represents a construct in the source language:

```javascript
// NumberLiteral node
{
  type: 'NumberLiteral',
  value: '42'
}

// CallExpression node
{
  type: 'CallExpression',
  name: 'add',
  params: [
    { type: 'NumberLiteral', value: '2' },
    { type: 'NumberLiteral', value: '3' }
  ]
}
```

### Tree Traversal

**Depth-First Traversal**:
```
    Program
      │
      └─ CallExpression(add)
          ├─ NumberLiteral(2)
          └─ CallExpression(subtract)
              ├─ NumberLiteral(4)
              └─ NumberLiteral(2)

Visit order: Program → add → 2 → subtract → 4 → 2
```

**Visitor Pattern**:
```javascript
const visitor = {
  NumberLiteral: {
    enter(node, parent) { /* ... */ },
    exit(node, parent) { /* ... */ }
  },
  CallExpression: {
    enter(node, parent) { /* ... */ },
    exit(node, parent) { /* ... */ }
  }
};
```

---

## Code Generation

### Strategies

#### 1. Direct Code Generation
Generate target code directly from AST without intermediate steps.

**Advantages**:
- Fast compilation
- Simpler implementation

**Disadvantages**:
- Harder to optimize
- Less flexible

#### 2. Intermediate Code Generation
Generate intermediate representation first, then optimize and generate target code.

**Advantages**:
- Better optimization opportunities
- More flexible
- Easier to support multiple targets

**Disadvantages**:
- Slower compilation
- More complex

### Code Templates

Use template patterns for code generation:

```javascript
// Template for function calls
const callTemplate = (name, args) => `${name}(${args.join(', ')})`;

// Apply template
callTemplate('add', ['2', '3'])  // → "add(2, 3)"
```

### Recursive Code Generation

```javascript
function codeGenerator(node) {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n');
    
    case 'CallExpression':
      return `${node.name}(${node.params.map(codeGenerator).join(', ')})`;
    
    case 'NumberLiteral':
      return node.value;
  }
}
```

---

## Optimization Techniques

### Constant Folding

Replace constant expressions with their computed value.

```
Before:  2 + 3 * 4
After:   14

Or:
Before:  {type: 'Addition', left: 2, right: 12}
After:   {type: 'NumberLiteral', value: 14}
```

### Dead Code Elimination

Remove unreachable code.

```javascript
// Dead code example:
if (false) {
  console.log('This never runs');  // Dead code
}
```

### Loop Invariant Code Motion

Move expressions that don't change out of loops.

```
Before:
for (i = 0; i < n; i++) {
  x = y * z;  // y and z don't change
  a[i] = x;
}

After:
x = y * z;
for (i = 0; i < n; i++) {
  a[i] = x;
}
```

### Strength Reduction

Replace expensive operations with cheaper ones.

```
Before:  x = i * 2;
After:   x = i << 1;  // Bit shift is faster

Before:  x = i * 0;
After:   x = 0;       // Constant
```

### Common Subexpression Elimination

Avoid computing the same expression multiple times.

```
Before:
a = x + y;
b = x + y;
c = x + y;

After:
temp = x + y;
a = temp;
b = temp;
c = temp;
```

---

## Error Handling

### Error Types

#### 1. Lexical Errors
Problems during tokenization.
```
Example: Unknown character @
Error: "I dont know what this character is: @"
```

#### 2. Syntax Errors
Problems during parsing.
```
Example: Missing closing parenthesis
Error: "Unexpected token: EOF"
```

#### 3. Semantic Errors
Problems during semantic analysis.
```
Example: Type mismatch, undefined variable
Error: "Variable 'x' is not defined"
```

### Error Recovery

Strategies to continue compilation after finding errors:

1. **Panic Mode** - Skip tokens until reaching a known good state
2. **Phrase Level** - Local correction of common errors
3. **Error Productions** - Include error productions in grammar
4. **Global Correction** - Find minimal edits to make code valid

### Error Messages

Good error messages include:
- Error type and description
- Location (line, column)
- Context (line of code)
- Suggestion for fix

```
Error: Unexpected token
Location: line 5, column 12
Context: (add 2 (subtract 4 ))
         ~~~~~~~~~~~~        ^
Message: Expected expression, got ')'
```

---

## Advanced Topics

### Symbol Tables

Data structure maintaining information about identifiers.

```javascript
class SymbolTable {
  constructor() {
    this.symbols = {};
    this.scopes = [{}];
  }
  
  define(name, info) {
    this.scopes[this.scopes.length - 1][name] = info;
  }
  
  lookup(name) {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (name in this.scopes[i]) {
        return this.scopes[i][name];
      }
    }
    return null;
  }
  
  enterScope() {
    this.scopes.push({});
  }
  
  exitScope() {
    this.scopes.pop();
  }
}
```

### Type Systems

#### Static Typing
Types checked at compile time.
```
int x = 5;      // Valid
int y = "str";  // Compile error
```

#### Dynamic Typing
Types checked at runtime.
```
x = 5;
x = "str";      // Runtime check
```

### Register Allocation

Assign variables to processor registers.

```
// Before:
a = b + c;
d = a * e;

// After (with 2 registers):
r1 = load b;
r2 = load c;
r1 = r1 + r2;
store r1, a;
r1 = load e;
r2 = load a;
r1 = r2 * r1;
store r1, d;
```

### Just-In-Time Compilation (JIT)

Compile code at runtime, optimizing for actual usage patterns.

**Process**:
1. Execute interpreted code
2. Monitor hot spots (frequently executed code)
3. Compile hot spots to machine code
4. Execute compiled code for better performance

### Intermediate Representations (IR)

#### Three-Address Code
Instructions with at most 3 operands.

```
t1 = 2 + 3
t2 = t1 * 4
result = t2
```

#### Static Single Assignment (SSA)
Each variable assigned exactly once.

```
x1 = 2
y1 = 3
z1 = x1 + y1
```

### Formal Language Theory

#### Context-Free Grammar (CFG)
```
S → aS | bS | ε
```

#### Regular Expressions
```
([a-z]+)@([a-z]+)\\.([a-z]+)  // Email pattern
```

### Compiler Optimization Levels

**Level 0**: No optimization
- Fast compilation
- Easier debugging

**Level 1**: Basic optimizations
- Constant folding
- Dead code elimination

**Level 2**: Moderate optimizations
- Loop optimizations
- Inlining

**Level 3**: Aggressive optimizations
- Advanced data flow analysis
- Profile-guided optimization

---

## Resources

### Books
- "Compilers: Principles, Techniques, and Tools" (Dragon Book)
- "Engineering a Compiler"
- "Crafting Interpreters"

### Online Resources
- [Compiler Design](https://en.wikipedia.org/wiki/Compiler)
- [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
- [Parsing Algorithms](https://en.wikipedia.org/wiki/Parsing)

### Tools & Languages
- **YACC/Bison** - Parser generators
- **Lex/Flex** - Lexer generators
- **LLVM** - Compiler infrastructure
- **GCC/Clang** - Production compilers

---

## Practical Exercises

1. **Extend TinyCompiler**
   - Add support for operators: `+`, `-`, `*`, `/`
   - Add variable assignment: `(set x 5)`
   - Add conditionals: `(if (> x 0) ...)`

2. **Build a Simple Interpreter**
   - Evaluate expressions instead of generating code
   - Maintain variable state

3. **Implement Optimization Passes**
   - Constant folding
   - Dead code elimination
   - Loop unrolling

4. **Create a Type System**
   - Enforce type checking
   - Type inference

5. **Add Debugging Support**
   - Line number tracking
   - Stack traces
   - Breakpoints

---

**Last Updated:** November 21, 2025

**Happy Learning! 🚀**
