# Contributing to TinyCompiler

Thank you for your interest in contributing to TinyCompiler! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

**Repository:** https://github.com/ovishkh/TinyCompiler  
**Live Demo:** https://TinyCompiler.ovishekh.com/  
**Author:** Ovi Shekh (ovishekh.com)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. **Check existing issues** - Search to see if the bug has already been reported
2. **Create a detailed report** including:
   - Clear description of the bug
   - Steps to reproduce
   - Expected behavior vs. actual behavior
   - Environment details (Node.js version, OS)
   - Code examples if applicable

### Suggesting Features

1. **Check existing issues** - Verify the feature hasn't been suggested
2. **Describe the feature** including:
   - Clear use case
   - Expected behavior
   - How it benefits users
   - Any alternative approaches you've considered

### Submitting Changes

#### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/ovishkh/TinyCompiler.git
cd TinyCompiler

# Install dependencies
npm install
```

#### Making Changes

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/bug-description
   ```

2. **Follow the code style**:
   - Use `'use strict';` at the top of files
   - Use consistent indentation (2 spaces)
   - Add comments explaining complex logic
   - Keep functions focused and readable

3. **Make incremental commits**:
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

4. **Run tests** before submitting:
   ```bash
   npm test
   # or
   make test
   ```

#### Submitting a Pull Request

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Reference to any related issues (e.g., "Fixes #123")
   - Test results showing all tests pass

3. **Respond to review feedback** promptly and professionally

## Project Structure

```
TinyCompiler/
├── TinyCompiler.js        # Main compiler implementation
├── test.js                # Test suite
├── package.json           # Project metadata
├── LICENSE                # MIT License
├── README.md              # Documentation
├── CONTRIBUTING.md        # This file
└── Makefile              # Build automation
```

## Key Files to Know

- **TinyCompiler.js** - Contains all compiler phases:
  - `tokenizer()` - Lexical analysis
  - `parser()` - Syntactic analysis
  - `traverser()` - AST traversal
  - `transformer()` - AST transformation
  - `codeGenerator()` - Code generation
  - `compiler()` - Main orchestration

- **test.js** - Test cases for each compiler phase

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test
make test

# Run specific test
node test.js
```

### Example Usage

```bash
# Run with example using make
make run

# Or manually
node -e "const { compiler } = require('./TinyCompiler'); console.log(compiler('(add 2 (subtract 4 2))');"
```

## Adding Features

When adding new features:

1. **Add support in tokenizer** - If introducing new syntax
2. **Update parser** - To recognize new tokens
3. **Update traverser** - If new node types needed
4. **Update transformer** - To handle transformations
5. **Update code generator** - To output target code
6. **Add tests** - Ensure your changes are tested

Example: Adding operator support

```javascript
// 1. Tokenizer - recognize +, -, *, /
let OPERATORS = /[+\-*/]/;
if (OPERATORS.test(char)) {
  tokens.push({ type: 'operator', value: char });
  current++;
  continue;
}

// 2. Parser - handle operators in expressions
// 3. Transformer - convert operator expressions
// 4. Code Generator - output operator syntax
// 5. test.js - add test cases
```

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
# Good
git commit -m "Add support for string literals in tokenizer"
git commit -m "Fix parser handling of nested expressions"
git commit -m "Improve error messages for unknown tokens"

# Avoid
git commit -m "fix stuff"
git commit -m "update"
git commit -m "wip"
```

## Documentation

When contributing code:

1. **Add inline comments** explaining complex logic
2. **Update README.md** if adding user-facing features
3. **Document breaking changes** clearly
4. **Add code examples** for new features

## Testing Guidelines

- Write tests for new features
- Ensure all existing tests pass
- Aim for clear, maintainable test code
- Test edge cases and error conditions

Example test structure:

```javascript
assert.deepStrictEqual(
  compiler('(add 1 2)'),
  'add(1, 2);',
  'Should compile add expression'
);
```

## Performance Considerations

- Keep the compiler lightweight
- Avoid unnecessary iterations
- Consider memory usage for large inputs
- Profile before optimizing

## Getting Help

- **Questions?** Open an issue with the `question` label
- **Need guidance?** Comment on relevant issues
- **Want to discuss?** Start a discussion or conversation

## Recognition

Contributors will be recognized in:
- GitHub repository contributors section
- Project documentation updates
- Commit history

## License

By contributing to TinyCompiler, you agree that your contributions will be licensed under the MIT License.

---

## Review Checklist

Before submitting a PR, ensure:

- [ ] Tests pass (`npm test`)
- [ ] Code follows project style
- [ ] Comments added for complex logic
- [ ] Commit messages are clear
- [ ] Documentation updated if needed
- [ ] No breaking changes without discussion
- [ ] Related issues referenced

---

**Happy Contributing! 🎉**

If you have questions, feel free to open an issue or reach out to the maintainers.
