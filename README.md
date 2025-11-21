# TinyCompiler - Educational Compiler Implementation

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-ovishkh%2FTinyCompiler-blue?logo=github)](https://github.com/ovishkh/TinyCompiler)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green)](https://nodejs.org/)

## 📚 Project Overview

**TinyCompiler** is a fully functional educational compiler written in ~200 lines of JavaScript. It transforms LISP-like function call syntax into C-like function calls, demonstrating all major compiler phases in an easy-to-understand way.

### ✨ Features
- ✅ Complete compiler pipeline (Tokenizer → Parser → Transformer → Code Generator)
- ✅ Educational & well-commented code
- ✅ Web playground with live preview
- ✅ REST API for compilation
- ✅ Fully tested with comprehensive test suite
- ✅ MIT Licensed

### 🎯 Project Goal

This project serves as a learning tool to understand how compilers work by breaking down complex compilation concepts into digestible, well-commented code.

### 📦 Package Information
- **Name:** TinyCompiler
- **Version:** 1.0.0
- **Author:** Ovi Shekh <hi@ovishekh.com> ([ovishekh.com](https://ovishekh.com))
- **License:** MIT
- **Repository:** [github.com/ovishkh/TinyCompiler](https://github.com/ovishkh/TinyCompiler)
- **Live Demo:** [TinyCompiler.ovishekh.com](https://TinyCompiler.ovishekh.com/)
- **Main Entry Point:** `./TinyCompiler.js`

---

## 🔄 Compiler Architecture

The compiler follows the standard three-phase architecture:

### Phase 1: **Parsing** 
Converts raw input code into an Abstract Syntax Tree (AST)
- **Lexical Analysis (Tokenization):** Breaks code into tokens
- **Syntactic Analysis:** Builds AST from tokens

### Phase 2: **Transformation**
Converts the source AST to a target AST using the visitor pattern
- Traverses the AST depth-first
- Applies transformations via visitor methods
- Creates a new AST for target language

### Phase 3: **Code Generation**
Converts the transformed AST back into code strings
- Recursively prints each node type
- Generates final output code

---

## 📝 Example Transformation

### Input (LISP Syntax)
```lisp
(add 2 (subtract 4 2))
```

### Output (C Syntax)
```javascript
add(2, subtract(4, 2));
```

### Visual Flow
```
Input String
    ↓
[Tokenizer] → Tokens Array
    ↓
[Parser] → Abstract Syntax Tree (LISP AST)
    ↓
[Traverser + Visitor] → Transformed AST (C-like AST)
    ↓
[Code Generator] → Output String
```

---

## 🔍 Detailed Component Breakdown

### 1. **TOKENIZER** (`tokenizer(input)`)

**Purpose:** Lexical analysis - breaks raw code into tokens

**Input:** String of code
```javascript
"(add 2 (subtract 4 2))"
```

**Output:** Array of tokens
```javascript
[
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'add'      },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'subtract' },
  { type: 'number', value: '4'        },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: ')'        },
  { type: 'paren',  value: ')'        }
]
```

**Token Types Recognized:**
- `paren`: Parentheses `(` and `)`
- `number`: Numeric literals `[0-9]+`
- `string`: String literals enclosed in `""`
- `name`: Function names and identifiers `[a-zA-Z]+`

**Key Algorithm:**
- Uses cursor-based iteration (`current` pointer)
- Handles multi-character tokens (numbers, names, strings)
- Skips whitespace
- Throws error on unrecognized characters

---

### 2. **PARSER** (`parser(tokens)`)

**Purpose:** Syntactic analysis - builds AST from tokens

**Input:** Array of tokens

**Output:** Abstract Syntax Tree
```javascript
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [{
      type: 'NumberLiteral',
      value: '2'
    }, {
      type: 'CallExpression',
      name: 'subtract',
      params: [{
        type: 'NumberLiteral',
        value: '4'
      }, {
        type: 'NumberLiteral',
        value: '2'
      }]
    }]
  }]
}
```

**Node Types Generated:**
- `Program`: Root node containing body array
- `CallExpression`: Function invocation with name and params
- `NumberLiteral`: Numeric values
- `StringLiteral`: String values

**Key Algorithm:**
- Recursive descent parser using `walk()` function
- Maintains cursor (`current`) position
- Handles nested expressions recursively
- Program body supports multiple top-level expressions

---

### 3. **TRAVERSER** (`traverser(ast, visitor)`)

**Purpose:** Depth-first tree traversal with visitor pattern

**Key Features:**
- Visits every node in the AST
- Supports both `enter` and `exit` callbacks
- Maintains parent-child relationships
- Enables non-destructive AST analysis

**Traversal Order (Depth-First):**
```
→ Program (enter)
  → CallExpression (enter)
    → NumberLiteral (enter)
    ← NumberLiteral (exit)
    → CallExpression (enter)
      → NumberLiteral (enter)
      ← NumberLiteral (exit)
      → NumberLiteral (enter)
      ← NumberLiteral (exit)
    ← CallExpression (exit)
  ← CallExpression (exit)
← Program (exit)
```

**Visitor Pattern Structure:**
```javascript
{
  NodeType: {
    enter(node, parent) { /* ... */ },
    exit(node, parent) { /* ... */ }
  }
}
```

---

### 4. **TRANSFORMER** (`transformer(ast)`)

**Purpose:** Converts LISP AST to C-like AST

**Transformation Rules:**

| LISP AST | → | C-like AST |
|----------|---|-----------|
| `CallExpression` with name | → | `CallExpression` with `Identifier` callee |
| Top-level `CallExpression` | → | Wrapped in `ExpressionStatement` |
| Direct params array | → | Arguments array |
| `NumberLiteral` | → | `NumberLiteral` (unchanged) |
| `StringLiteral` | → | `StringLiteral` (unchanged) |

**Input AST (LISP-like):**
```javascript
{
  type: 'CallExpression',
  name: 'add',
  params: [...]
}
```

**Output AST (C-like):**
```javascript
{
  type: 'ExpressionStatement',
  expression: {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: 'add'
    },
    arguments: [...]
  }
}
```

**Key Features:**
- Uses `_context` hack for parent-to-child linking
- Wraps top-level expressions in `ExpressionStatement`
- Preserves nested structure
- Non-destructive (creates new AST)

---

### 5. **CODE GENERATOR** (`codeGenerator(node)`)

**Purpose:** Converts AST back into executable code strings

**Output Generation:**

| Node Type | Output Format |
|-----------|---------------|
| `Program` | Maps and joins body with newlines |
| `ExpressionStatement` | Expression + `;` |
| `CallExpression` | `callee(arg1, arg2, ...)` |
| `Identifier` | Function name string |
| `NumberLiteral` | Number value |
| `StringLiteral` | `"string value"` |

**Example:**
```javascript
// Input node:
{
  type: 'CallExpression',
  callee: { type: 'Identifier', name: 'add' },
  arguments: [
    { type: 'NumberLiteral', value: '2' },
    { type: 'NumberLiteral', value: '3' }
  ]
}

// Output string:
// "add(2, 3)"
```

---

### 6. **COMPILER** (`compiler(input)`)

**Purpose:** Main orchestration function linking all phases

**Pipeline:**
```javascript
function compiler(input) {
  let tokens = tokenizer(input);        // Phase 1a: Lexical Analysis
  let ast    = parser(tokens);          // Phase 1b: Syntactic Analysis
  let newAst = transformer(ast);        // Phase 2: Transformation
  let output = codeGenerator(newAst);   // Phase 3: Code Generation
  return output;
}
```

**Usage:**
```javascript
const result = compiler('(add 2 (subtract 4 2))');
console.log(result); // "add(2, subtract(4, 2));"
```

---

## 📋 Test Suite

**File:** `test.js`

**Test Coverage:**
1. ✅ Tokenizer test - Verifies token generation
2. ✅ Parser test - Verifies AST structure
3. ✅ Transformer test - Verifies AST transformation
4. ✅ Code Generator test - Verifies output generation
5. ✅ Compiler integration test - Verifies end-to-end compilation

**Running Tests:**
```bash
node test.js
```

**Expected Output:**
```
All Passed!
```

---

## 💡 Key Concepts Demonstrated

### 1. **Tokenization**
- Character-by-character scanning
- Multi-character token handling
- Whitespace handling
- Error detection

### 2. **Recursive Descent Parsing**
- Building AST from tokens
- Handling nested structures
- Recursive function calls

### 3. **Visitor Pattern**
- Tree traversal abstraction
- Enter/exit callbacks
- Separation of concerns

### 4. **AST Transformation**
- Pattern matching on node types
- Creating new AST structures
- Context propagation

### 5. **Code Generation**
- Recursive node processing
- String concatenation
- Output formatting

---

## 🎓 Learning Path

**For beginners:** Read through the code in this order:
1. **Tokenizer** - Start here to understand lexical analysis
2. **Parser** - Learn recursive descent parsing
3. **Traverser** - Understand tree traversal patterns
4. **Transformer** - See practical AST manipulation
5. **Code Generator** - Learn output generation
6. **Compiler** - See how it all ties together

**Recommended approach:**
- Read the extensive inline comments in `TinyCompiler.js`
- Trace through the example in `test.js`
- Try modifying the input to see how it transforms
- Add new token types or node types

---

## 🔧 Extensibility

The compiler can be extended to support:
- **More operators:** Add to tokenizer (e.g., `+`, `-`, `*`, `/`)
- **More token types:** Update tokenizer regex patterns
- **More node types:** Add cases to parser, traverser, and generator
- **Different target languages:** Modify transformer and generator
- **Type checking:** Add validation in transformer
- **Optimization:** Add optimization passes before code generation

---

## 📚 Real-World Applications

The concepts here are used in:
- **Language compilers** (JavaScript, Python, Rust, etc.)
- **Build tools** (Webpack, Babel, TypeScript)
- **Template engines** (Handlebars, EJS)
- **Query languages** (GraphQL, SQL parsers)
- **Domain-specific languages** (Configuration files, markup)

---

## 📄 License

**MIT License**

Copyright (c) 2025 Ovi Shekh

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project with or without attribution (though attribution is appreciated).

---

## 🙏 Credits

**Created by:** Ovi Shekh ([ovishekh.com](https://ovishekh.com))

**Special Thanks:**
- [Md. Rashedul Alam](https://github.com/rashedul) - For guidance and support
- [James Kyle](https://github.com/jamiebuilds) - For compiler design inspiration
- [Gates Smasher](https://github.com/gates-smasher) - For valuable contributions
- [Corrado Böhm](https://github.com/corrado-bohm) - For theoretical foundations

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ovishkh/TinyCompiler.git
cd TinyCompiler

# Install dependencies
npm install

# Run tests
npm test
# or
make test
```

### Basic Usage

#### Command Line

```javascript
const { compiler } = require('./TinyCompiler');

// Simple example
const input = '(add 2 2)';
const output = compiler(input);
console.log(output); // "add(2, 2);"

// Nested example
const complex = '(add 2 (subtract 4 2))';
console.log(compiler(complex)); // "add(2, subtract(4, 2));"
```

#### Web Playground

Visit [TinyCompiler.ovishekh.com](https://TinyCompiler.ovishekh.com/) for an interactive playground.

#### REST API

```bash
# Compile via HTTP API
curl "https://TinyCompiler.ovishekh.com/api/compiler?code=(add%201%202)"
```

### Makefile Commands

```bash
make install    # Install dependencies
make test       # Run tests
make run        # Run with example
make dev        # Development mode
make clean      # Clean dependencies
make help       # Show all commands
```

### Docker (Optional)

```bash
# Build Docker image
docker build -t tinycompiler .

# Run container
docker run -p 3000:3000 tinycompiler
```

---

## 🌐 Deployment

### Vercel Deployment

The project is configured for easy deployment to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` file is pre-configured with:
- API routes at `/api/compiler`
- Static file serving
- CORS headers enabled

### Environment Setup

The project includes:
- `vercel.json` - Vercel configuration
- `api/compiler.js` - Serverless API endpoint
- `index.html` - Web playground UI

---

## 🔧 Development

### Project Structure

```
TinyCompiler/
├── TinyCompiler.js       # Main compiler (all phases)
├── test.js               # Test suite
├── index.html            # Web playground UI
├── api/
│   └── compiler.js       # REST API endpoint
├── vercel.json           # Vercel config
├── Makefile              # Build automation
├── package.json          # Dependencies
├── LICENSE               # MIT License
├── README.md             # This file
└── CONTRIBUTING.md       # Contribution guide
```

### Running Tests

```bash
npm test          # Run all tests
make test         # Using Makefile
```

### Code Style

- 2-space indentation
- Use `'use strict';`
- Comprehensive inline comments
- Descriptive variable names

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

---

---

## 🐛 Common Issues and Solutions

**Q: Why doesn't it support operators like `+`?**
A: This compiler demonstrates core concepts with simple syntax. Operators would require additional tokenizer rules.

**Q: Can I use this for real compilation?**
A: This is an educational tool. Production compilers have significantly more complexity for optimization, error recovery, and language features.

**Q: How do I add new features?**
A: Follow this pattern: Update tokenizer → Update parser → Update transformer → Update generator → Add tests.

---

## 📖 Further Reading

To deepen your compiler knowledge, explore:
- **Lexical Analysis:** Finite automata, regular expressions
- **Parsing:** Context-free grammars, parse trees
- **Semantic Analysis:** Symbol tables, type checking
- **Optimization:** Dead code elimination, constant folding
- **Code Generation:** Register allocation, instruction selection

---

## 📚 Learning Resources

### Official Links
- 🌐 **Website:** [ovishekh.com](https://ovishekh.com)
- 💻 **GitHub:** [github.com/ovishkh/TinyCompiler](https://github.com/ovishkh/TinyCompiler)
- 🎮 **Live Demo:** [TinyCompiler.ovishekh.com](https://TinyCompiler.ovishekh.com/)
- 📖 **API Docs:** [GitHub Wiki](https://github.com/ovishkh/TinyCompiler/wiki)

### Related Resources
- [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler) - Original by James Kyle
- [Crafting Interpreters](https://craftinginterpreters.com/) - Interactive guide
- [Engineering a Compiler](https://www.elsevier.com/books/engineering-a-compiler/cooper/978-0-12-815412-0) - Advanced reading

### Compiler Concepts
- **Lexical Analysis:** Finite automata, regular expressions
- **Parsing:** Context-free grammars, parse trees, recursive descent
- **Semantic Analysis:** Symbol tables, type checking
- **Optimization:** Dead code elimination, constant folding
- **Code Generation:** Register allocation, instruction selection

---

## 📋 License

MIT License © 2025 Ovi Shekh

See [LICENSE](LICENSE) file for details.

---

## 🤝 Support & Contact

- **Issues & Bugs:** [GitHub Issues](https://github.com/ovishkh/TinyCompiler/issues)
- **Discussions:** [GitHub Discussions](https://github.com/ovishkh/TinyCompiler/discussions)
- **Email:** hi@ovishekh.com
- **Website:** [ovishekh.com](https://ovishekh.com)

---

**Last Updated:** November 21, 2025

**Made with ❤️ by Ovi Shekh**
