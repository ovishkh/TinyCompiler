'use strict';

/**
 * TinyCompiler - A Super Tiny Educational Compiler
 * 
 * Repository: https://github.com/ovishkh/TinyCompiler
 * Live Demo: https://TinyCompiler.ovishekh.com/
 * 
 * Author: Ovi Shekh
 * 
 * Special Thanks:
 * - Md. Rashedul Alam
 * - James Kyle
 * - Gates Smasher
 * - Corrado Böhm
 * 
 * License: MIT
 *  
 * TTTTTTTTTTTTTTTTTTTTTTTIIIIIIIIIINNNNNNNN        NNNNNNNNYYYYYYY       YYYYYYY
 * T:::::::::::::::::::::TI::::::::IN:::::::N       N::::::NY:::::Y       Y:::::Y
 * T:::::::::::::::::::::TI::::::::IN::::::::N      N::::::NY:::::Y       Y:::::Y
 * T:::::TT:::::::TT:::::TII::::::IIN:::::::::N     N::::::NY::::::Y     Y::::::Y
 * TTTTTT  T:::::T  TTTTTT  I::::I  N::::::::::N    N::::::NYYY:::::Y   Y:::::YYY
 *         T:::::T          I::::I  N:::::::::::N   N::::::N   Y:::::Y Y:::::Y
 *         T:::::T          I::::I  N:::::::N::::N  N::::::N    Y:::::Y:::::Y
 *         T:::::T          I::::I  N::::::N N::::N N::::::N     Y:::::::::Y
 *         T:::::T          I::::I  N::::::N  N::::N:::::::N      Y:::::::Y
 *         T:::::T          I::::I  N::::::N   N:::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N    N::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N     N:::::::::N       Y:::::Y
 *       TT:::::::TT      II::::::IIN::::::N      N::::::::N       Y:::::Y
 *       T:::::::::T      I::::::::IN::::::N       N:::::::N    YYYY:::::YYYY
 *       T:::::::::T      I::::::::IN::::::N        N::::::N    Y:::::::::::Y
 *       TTTTTTTTTTT      IIIIIIIIIINNNNNNNN         NNNNNNN    YYYYYYYYYYYYY
 *
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPPPPPPPPP   IIIIIIIIIILLLLLLLLLLL             EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *      CCC::::::::::::C   OO:::::::::OO   M:::::::M             M:::::::MP::::::::::::::::P  I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::::::::::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::::M           M::::::::MP::::::PPPPPP:::::P I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::RRRRRR:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM:::::::::M         M:::::::::MPP:::::P     P:::::PII::::::IILL:::::::LL             EE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::::::M       M::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E       EEEEEE  R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::::::M     M:::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::M::::M   M::::M:::::::M  P::::PPPPPP:::::P   I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M M::::M M::::M M::::::M  P:::::::::::::PP    I::::I    L:::::L                 E:::::::::::::::E     R:::::::::::::RR
 * C:::::C              O:::::O     O:::::OM::::::M  M::::M::::M  M::::::M  P::::PPPPPPPPP      I::::I    L:::::L                 E:::::::::::::::E     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M   M:::::::M   M::::::M  P::::P              I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM::::::M    M:::::M    M::::::M  P::::P              I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::M     MMMMM     M::::::M  P::::P              I::::I    L:::::L         LLLLLL  E:::::E       EEEEEE  R::::R     R:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM::::::M               M::::::MPP::::::PP          II::::::IILL:::::::LLLLLLLLL:::::LEE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *      CCC::::::::::::C   OO:::::::::OO   M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPP          IIIIIIIIIILLLLLLLLLLLLLLLLLLLLLLLLEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 */

/**
 * Today we're going to write a compiler together. But not just any compiler... A
 * super duper teeny tiny compiler! A compiler that is so small that if you
 * remove all the comments this file would only be ~200 lines of actual code.
 *
 * We're going to compile some lisp-like function calls into some C-like
 * function calls.
 *
 * If you are not familiar with one or the other. I'll just give you a quick intro.
 *
 * If we had two functions `add` and `subtract` they would be written like this:
 *
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 * Easy peezy right?
 *
 * Well good, because this is exactly what we are going to compile. While this
 * is neither a complete LISP or C syntax, it will be enough of the syntax to
 * demonstrate many of the major pieces of a modern compiler.
 */

/**
 * Most compilers break down into three primary stages: Parsing, Transformation,
 * and Code Generation
 *
 * PHASE 1: PARSING (Lexical + Syntactic Analysis)
 * ================================================
 * Takes raw source code and converts it into an Abstract Syntax Tree (AST).
 * 
 * Sub-phases:
 * a) Lexical Analysis (Tokenization):
 *    - Input: String of source code
 *    - Process: Scan character-by-character, recognize patterns
 *    - Output: Array of tokens (lexemes with types)
 *    - Example: "(add 2 2)" → [{paren,(}, {name,add}, {number,2}, {number,2}, {paren,}]
 *
 * b) Syntactic Analysis (Parsing):
 *    - Input: Token stream
 *    - Process: Apply grammar rules, build hierarchical structure
 *    - Output: Abstract Syntax Tree (AST)
 *    - Uses: Recursive Descent Parsing (top-down parsing technique)
 *    - Example: Tokens → AST with CallExpression and NumberLiteral nodes
 *
 * PHASE 2: TRANSFORMATION (Semantic Analysis + AST Transformation)
 * =================================================================
 * Manipulates the AST to transform it from source language to target language.
 *
 * Operations:
 * - Semantic analysis (type checking, scope resolution)
 * - Pattern matching on node types
 * - Creating new AST structure for target language
 * - Example: LISP-style AST → JavaScript-style AST
 *
 * PHASE 3: CODE GENERATION
 * ========================
 * Converts the transformed AST into target code.
 *
 * Process:
 * - Recursive traversal of AST
 * - Generate code for each node type
 * - Concatenate generated code
 * - Example: JavaScript AST → JavaScript source code string
 *
 * COMPLETE PIPELINE:
 * Source Code → [Tokenizer] → Tokens → [Parser] → AST → 
 * [Transformer] → New AST → [Code Generator] → Target Code
 */

/**
 * Parsing
 * -------
 *
 * Parsing typically gets broken down into two phases: Lexical Analysis and
 * Syntactic Analysis.
 *
 * 1. *Lexical Analysis* takes the raw code and splits it apart into these things
 *    called tokens by a thing called a tokenizer (or lexer).
 *
 *    Tokens are an array of tiny little objects that describe an isolated piece
 *    of the syntax. They could be numbers, labels, punctuation, operators,
 *    whatever.
 *
 * 2. *Syntactic Analysis* takes the tokens and reformats them into a
 *    representation that describes each part of the syntax and their relation
 *    to one another. This is known as an intermediate representation or
 *    Abstract Syntax Tree.
 *
 *    An Abstract Syntax Tree, or AST for short, is a deeply nested object that
 *    represents code in a way that is both easy to work with and tells us a lot
 *    of information.
 *
 * For the following syntax:
 *
 *   (add 2 (subtract 4 2))
 *
 * Tokens might look something like this:
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 *
 * And an Abstract Syntax Tree (AST) might look like this:
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */

/**
 * Transformation
 * --------------
 *
 * The next type of stage for a compiler is transformation. Again, this just
 * takes the AST from the last step and makes changes to it. It can manipulate
 * the AST in the same language or it can translate it into an entirely new
 * language.
 *
 * Let’s look at how we would transform an AST.
 *
 * You might notice that our AST has elements within it that look very similar.
 * There are these objects with a type property. Each of these are known as an
 * AST Node. These nodes have defined properties on them that describe one
 * isolated part of the tree.
 *
 * We can have a node for a "NumberLiteral":
 *
 *   {
 *     type: 'NumberLiteral',
 *     value: '2',
 *   }
 *
 * Or maybe a node for a "CallExpression":
 *
 *   {
 *     type: 'CallExpression',
 *     name: 'subtract',
 *     params: [...nested nodes go here...],
 *   }
 *
 * When transforming the AST we can manipulate nodes by
 * adding/removing/replacing properties, we can add new nodes, remove nodes, or
 * we could leave the existing AST alone and create an entirely new one based
 * on it.
 *
 * Since we’re targeting a new language, we’re going to focus on creating an
 * entirely new AST that is specific to the target language.
 *
 * Traversal
 * ---------
 *
 * In order to navigate through all of these nodes, we need to be able to
 * traverse through them. This traversal process goes to each node in the AST
 * depth-first.
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2'
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4'
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2'
 *         }]
 *       }]
 *     }]
 *   }
 *
 * So for the above AST we would go:
 *
 *   1. Program - Starting at the top level of the AST
 *   2. CallExpression (add) - Moving to the first element of the Program's body
 *   3. NumberLiteral (2) - Moving to the first element of CallExpression's params
 *   4. CallExpression (subtract) - Moving to the second element of CallExpression's params
 *   5. NumberLiteral (4) - Moving to the first element of CallExpression's params
 *   6. NumberLiteral (2) - Moving to the second element of CallExpression's params
 *
 * If we were manipulating this AST directly, instead of creating a separate AST,
 * we would likely introduce all sorts of abstractions here. But just visiting
 * each node in the tree is enough for what we're trying to do.
 *
 * The reason I use the word "visiting" is because there is this pattern of how
 * to represent operations on elements of an object structure.
 *
 * Visitors
 * --------
 *
 * The basic idea here is that we are going to create a “visitor” object that
 * has methods that will accept different node types.
 *
 *   var visitor = {
 *     NumberLiteral() {},
 *     CallExpression() {},
 *   };
 *
 * When we traverse our AST, we will call the methods on this visitor whenever we
 * "enter" a node of a matching type.
 *
 * In order to make this useful we will also pass the node and a reference to
 * the parent node.
 *
 *   var visitor = {
 *     NumberLiteral(node, parent) {},
 *     CallExpression(node, parent) {},
 *   };
 *
 * However, there also exists the possibility of calling things on "exit". Imagine
 * our tree structure from before in list form:
 *
 *   - Program
 *     - CallExpression
 *       - NumberLiteral
 *       - CallExpression
 *         - NumberLiteral
 *         - NumberLiteral
 *
 * As we traverse down, we're going to reach branches with dead ends. As we
 * finish each branch of the tree we "exit" it. So going down the tree we
 * "enter" each node, and going back up we "exit".
 *
 *   -> Program (enter)
 *     -> CallExpression (enter)
 *       -> Number Literal (enter)
 *       <- Number Literal (exit)
 *       -> Call Expression (enter)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *       <- CallExpression (exit)
 *     <- CallExpression (exit)
 *   <- Program (exit)
 *
 * In order to support that, the final form of our visitor will look like this:
 *
 *   var visitor = {
 *     NumberLiteral: {
 *       enter(node, parent) {},
 *       exit(node, parent) {},
 *     }
 *   };
 */

/**
 * Code Generation
 * ---------------
 *
 * The final phase of a compiler is code generation. Sometimes compilers will do
 * things that overlap with transformation, but for the most part code
 * generation just means take our AST and string-ify code back out.
 *
 * Code generators work several different ways, some compilers will reuse the
 * tokens from earlier, others will have created a separate representation of
 * the code so that they can print nodes linearly, but from what I can tell most
 * will use the same AST we just created, which is what we’re going to focus on.
 *
 * Effectively our code generator will know how to “print” all of the different
 * node types of the AST, and it will recursively call itself to print nested
 * nodes until everything is printed into one long string of code.
 */

/**
 * And that's it! That's all the different pieces of a compiler.
 *
 * Now that isn’t to say every compiler looks exactly like I described here.
 * Compilers serve many different purposes, and they might need more steps than
 * I have detailed.
 *
 * But now you should have a general high-level idea of what most compilers look
 * like.
 *
 * Now that I’ve explained all of this, you’re all good to go write your own
 * compilers right?
 *
 * Just kidding, that's what I'm here to help with :P
 *
 * So let's begin...
 */

/**
 * ============================================================================
 *                                   (/^▽^)/
 *                          PHASE 1A: THE TOKENIZER!
 *                        (LEXICAL ANALYSIS)
 * ============================================================================
 */

/**
 * LEXICAL ANALYSIS CONCEPTS:
 * ==========================
 * 
 * Tokenization is the first step of parsing. It converts a sequence of
 * characters into a sequence of tokens.
 *
 * Key Concepts:
 * - LEXEME: The actual sequence of characters (e.g., "add", "123", "(")
 * - TOKEN: Abstract representation (type + value pair)
 * - PATTERN: Regular expression or rule for matching lexemes
 * - FINITE AUTOMATA: State machine for recognizing patterns
 *
 * Token Types Recognized:
 * - Punctuation: parentheses (paren)
 * - Numbers: integer literals (number)
 * - Strings: quoted text (string)
 * - Identifiers: function/variable names (name)
 *
 * Algorithm:
 * 1. Maintain position cursor in input string
 * 2. Read character at cursor
 * 3. Match against token patterns in order
 * 4. Create token object with type and value
 * 5. Advance cursor
 * 6. Repeat until end of input
 *
 * Example Input:  "(add 2 (subtract 4 2))"
 * Example Output: [
 *   { type: 'paren', value: '(' },
 *   { type: 'name', value: 'add' },
 *   { type: 'number', value: '2' },
 *   { type: 'paren', value: '(' },
 *   { type: 'name', value: 'subtract' },
 *   { type: 'number', value: '4' },
 *   { type: 'number', value: '2' },
 *   { type: 'paren', value: ')' },
 *   { type: 'paren', value: ')' }
 * ]
 */

// We start by accepting an input string of code, and we're gonna set up two
// things...
function tokenizer(input) {

  // A `current` variable for tracking our position in the code like a cursor.
  let current = 0;

  // And a `tokens` array for pushing our tokens to.
  let tokens = [];

  // We start by creating a `while` loop where we are setting up our `current`
  // variable to be incremented as much as we want `inside` the loop.
  //
  // We do this because we may want to increment `current` many times within a
  // single loop because our tokens can be any length.
  while (current < input.length) {

    // We're also going to store the `current` character in the `input`.
    let char = input[current];

    // The first thing we want to check for is an open parenthesis. This will
    // later be used for `CallExpression` but for now we only care about the
    // character.
    //
    // We check to see if we have an open parenthesis:
    if (char === '(') {

      // If we do, we push a new token with the type `paren` and set the value
      // to an open parenthesis.
      tokens.push({
        type: 'paren',
        value: '(',
      });

      // Then we increment `current`
      current++;

      // And we `continue` onto the next cycle of the loop.
      continue;
    }

    // Next we're going to check for a closing parenthesis. We do the same exact
    // thing as before: Check for a closing parenthesis, add a new token,
    // increment `current`, and `continue`.
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    // Moving on, we're now going to check for whitespace. This is interesting
    // because we care that whitespace exists to separate characters, but it
    // isn't actually important for us to store as a token. We would only throw
    // it out later.
    //
    // So here we're just going to test for existence and if it does exist we're
    // going to just `continue` on.
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // The next type of token is a number. This is different than what we have
    // seen before because a number could be any number of characters and we
    // want to capture the entire sequence of characters as one token.
    //
    //   (add 123 456)
    //        ^^^ ^^^
    //        Only two separate tokens
    //
    // So we start this off when we encounter the first number in a sequence.
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {

      // We're going to create a `value` string that we are going to push
      // characters to.
      let value = '';

      // Then we're going to loop through each character in the sequence until
      // we encounter a character that is not a number, pushing each character
      // that is a number to our `value` and incrementing `current` as we go.
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // After that we push our `number` token to the `tokens` array.
      tokens.push({ type: 'number', value });

      // And we continue on.
      continue;
    }

    // We'll also add support for strings in our language which will be any
    // text surrounded by double quotes (").
    //
    //   (concat "foo" "bar")
    //            ^^^   ^^^ string tokens
    //
    // We'll start by checking for the opening quote:
    if (char === '"') {
      // Keep a `value` variable for building up our string token.
      let value = '';

      // We'll skip the opening double quote in our token.
      char = input[++current];

      // Then we'll iterate through each character until we reach another
      // double quote.
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      // Skip the closing double quote.
      char = input[++current];

      // And add our `string` token to the `tokens` array.
      tokens.push({ type: 'string', value });

      continue;
    }

    // The last type of token will be a `name` token. This is a sequence of
    // letters instead of numbers, that are the names of functions in our lisp
    // syntax.
    //
    //   (add 2 4)
    //    ^^^
    //    Name token
    //
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      // Again we're just going to loop through all the letters pushing them to
      // a value.
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // And pushing that value as a token with the type `name` and continuing.
      tokens.push({ type: 'name', value });

      continue;
    }

    // Finally if we have not matched a character by now, we're going to throw
    // an error and completely exit.
    throw new TypeError('I dont know what this character is: ' + char);
  }

  // Then at the end of our `tokenizer` we simply return the tokens array.
  return tokens;
}

/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                      PHASE 1B: THE PARSER!!!
 *                    (SYNTACTIC ANALYSIS)
 * ============================================================================
 */

/**
 * SYNTACTIC ANALYSIS CONCEPTS:
 * ============================
 * 
 * Parsing converts a token stream into an Abstract Syntax Tree (AST).
 * It enforces the syntactic rules of the language.
 *
 * Key Concepts:
 * - CONTEXT-FREE GRAMMAR: Rules defining valid syntax
 * - PARSE TREE: Derivation tree showing how input derives from grammar
 * - ABSTRACT SYNTAX TREE (AST): Simplified parse tree for later processing
 * - RECURSIVE DESCENT: Top-down parsing by recursively calling functions
 *
 * Parsing Strategy Used: RECURSIVE DESCENT
 * - Each grammar rule becomes a function
 * - Functions call each other recursively
 * - Naturally handles nested structures
 * - Easy to understand and implement
 *
 * Grammar Rules (simplified):
 * Program        → Expression*
 * Expression     → CallExpression | NumberLiteral | StringLiteral
 * CallExpression → '(' name Expression* ')'
 * NumberLiteral  → number
 * StringLiteral  → string
 *
 * Example:
 * Input Tokens:  [{paren,(}, {name,add}, {number,2}, {number,3}, {paren,)}]
 * Output AST:    {
 *                  type: 'Program',
 *                  body: [{
 *                    type: 'CallExpression',
 *                    name: 'add',
 *                    params: [
 *                      { type: 'NumberLiteral', value: '2' },
 *                      { type: 'NumberLiteral', value: '3' }
 *                    ]
 *                  }]
 *                }
 */

// Okay, so we define a `parser` function that accepts our array of `tokens`.
function parser(tokens) {

  // Again we keep a `current` variable that we will use as a cursor.
  let current = 0;

  // But this time we're going to use recursion instead of a `while` loop. So we
  // define a `walk` function.
  function walk() {

    // Inside the walk function we start by grabbing the `current` token.
    let token = tokens[current];

    // We're going to split each type of token off into a different code path,
    // starting off with `number` tokens.
    //
    // We test to see if we have a `number` token.
    if (token.type === 'number') {

      // If we have one, we'll increment `current`.
      current++;

      // And we'll return a new AST node called `NumberLiteral` and setting its
      // value to the value of our token.
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    // If we have a string we will do the same as number and create a
    // `StringLiteral` node.
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    // Next we're going to look for CallExpressions. We start this off when we
    // encounter an open parenthesis.
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {

      // We'll increment `current` to skip the parenthesis since we don't care
      // about it in our AST.
      token = tokens[++current];

      // We create a base node with the type `CallExpression`, and we're going
      // to set the name as the current token's value since the next token after
      // the open parenthesis is the name of the function.
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      // We increment `current` *again* to skip the name token.
      token = tokens[++current];

      // And now we want to loop through each token that will be the `params` of
      // our `CallExpression` until we encounter a closing parenthesis.
      //
      // Now this is where recursion comes in. Instead of trying to parse a
      // potentially infinitely nested set of nodes we're going to rely on
      // recursion to resolve things.
      //
      // To explain this, let's take our Lisp code. You can see that the
      // parameters of the `add` are a number and a nested `CallExpression` that
      // includes its own numbers.
      //
      //   (add 2 (subtract 4 2))
      //
      // You'll also notice that in our tokens array we have multiple closing
      // parenthesis.
      //
      //   [
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'add'      },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'subtract' },
      //     { type: 'number', value: '4'        },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
      //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
      //   ]
      //
      // We're going to rely on the nested `walk` function to increment our
      // `current` variable past any nested `CallExpression`.

      // So we create a `while` loop that will continue until it encounters a
      // token with a `type` of `'paren'` and a `value` of a closing
      // parenthesis.
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        // we'll call the `walk` function which will return a `node` and we'll
        // push it into our `node.params`.
        node.params.push(walk());
        token = tokens[current];
      }

      // Finally we will increment `current` one last time to skip the closing
      // parenthesis.
      current++;

      // And return the node.
      return node;
    }

    // Again, if we haven't recognized the token type by now we're going to
    // throw an error.
    throw new TypeError(token.type);
  }

  // Now, we're going to create our AST which will have a root which is a
  // `Program` node.
  let ast = {
    type: 'Program',
    body: [],
  };

  // And we're going to kickstart our `walk` function, pushing nodes to our
  // `ast.body` array.
  //
  // The reason we are doing this inside a loop is because our program can have
  // `CallExpression` after one another instead of being nested.
  //
  //   (add 2 2)
  //   (subtract 4 2)
  //
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  // At the end of our parser we'll return the AST.
  return ast;
}

/**
 * ============================================================================
 *                                 ⌒(❀>◞౪◟<❀)⌒
 *                    PHASE 2A: THE TRAVERSER!!!
 *                  (AST TRAVERSAL WITH VISITOR PATTERN)
 * ============================================================================
 */

/**
 * TREE TRAVERSAL CONCEPTS:
 * =======================
 * 
 * The traverser walks through the AST in a depth-first manner, visiting
 * each node and allowing operations to be performed.
 *
 * Key Concepts:
 * - DEPTH-FIRST TRAVERSAL: Visit parent, then recursively visit children
 * - VISITOR PATTERN: Separate operations from data structure
 * - ENTER/EXIT CALLBACKS: Execute code entering and exiting nodes
 * - PARENT TRACKING: Pass parent reference for context
 *
 * Traversal Order (Depth-First, Pre-order):
 * For tree: Program → CallExpression → [NumberLiteral, CallExpression] → [NumberLiteral, NumberLiteral]
 * Order: Program(enter) → CallExpr1(enter) → NumLit1(enter) → NumLit1(exit) → 
 *        CallExpr2(enter) → NumLit2(enter) → NumLit2(exit) → NumLit3(enter) → 
 *        NumLit3(exit) → CallExpr2(exit) → CallExpr1(exit) → Program(exit)
 *
 * Visitor Pattern:
 * - Decouples tree structure from operations
 * - Allows multiple different operations on same tree
 * - Operations defined as visitor object with node-type methods
 * - Each method receives node and parent reference
 *
 * Example Visitor:
 * const visitor = {
 *   NumberLiteral: {
 *     enter(node, parent) { console.log('Entering:', node.value); },
 *     exit(node, parent) { console.log('Exiting:', node.value); }
 *   },
 *   CallExpression: {
 *     enter(node, parent) { console.log('Calling:', node.name); },
 *     exit(node, parent) { }
 *   }
 * };
 */

// So we define a traverser function which accepts an AST and a
// visitor. Inside we're going to define two functions...
function traverser(ast, visitor) {

  // A `traverseArray` function that will allow us to iterate over an array and
  // call the next function that we will define: `traverseNode`.
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  // `traverseNode` will accept a `node` and its `parent` node. So that it can
  // pass both to our visitor methods.
  function traverseNode(node, parent) {

    // We start by testing for the existence of a method on the visitor with a
    // matching `type`.
    let methods = visitor[node.type];

    // If there is an `enter` method for this node type we'll call it with the
    // `node` and its `parent`.
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // Next we are going to split things up by the current node type.
    switch (node.type) {

      // We'll start with our top level `Program`. Since Program nodes have a
      // property named body that has an array of nodes, we will call
      // `traverseArray` to traverse down into them.
      //
      // (Remember that `traverseArray` will in turn call `traverseNode` so  we
      // are causing the tree to be traversed recursively)
      case 'Program':
        traverseArray(node.body, node);
        break;

      // Next we do the same with `CallExpression` and traverse their `params`.
      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      // In the cases of `NumberLiteral` and `StringLiteral` we don't have any
      // child nodes to visit, so we'll just break.
      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      // And again, if we haven't recognized the node type then we'll throw an
      // error.
      default:
        throw new TypeError(node.type);
    }

    // If there is an `exit` method for this node type we'll call it with the
    // `node` and its `parent`.
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // Finally we kickstart the traverser by calling `traverseNode` with our ast
  // with no `parent` because the top level of the AST doesn't have a parent.
  traverseNode(ast, null);
}

/**
 * ============================================================================
 *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
 *                    PHASE 2B: THE TRANSFORMER!!!
 *                     (SEMANTIC ANALYSIS & TRANSFORMATION)
 * ============================================================================
 */

/**
 * SEMANTIC ANALYSIS & TRANSFORMATION CONCEPTS:
 * ============================================
 * 
 * The transformer performs semantic analysis and AST transformation,
 * converting from source language representation to target language.
 *
 * Key Concepts:
 * - SEMANTIC ANALYSIS: Check meaning and validity
 * - TYPE CHECKING: Verify operations have valid operand types
 * - SCOPE ANALYSIS: Verify variables defined before use
 * - AST TRANSFORMATION: Convert structure for target language
 * - SYMBOL TABLE: Track identifiers and their properties
 *
 * Transformation Strategy:
 * 1. Traverse source AST using visitor pattern
 * 2. For each node, create corresponding target node
 * 3. Transform properties and structure as needed
 * 4. Build new AST incrementally using _context references
 * 5. Return completely new AST for target language
 *
 * Transformation Rules (LISP to JavaScript):
 * - CallExpression with 'name' → CallExpression with 'Identifier' callee
 * - Top-level calls wrapped in ExpressionStatement
 * - params array renamed to arguments array
 * - Direct children transformation handled via context propagation
 *
 * Example Transformation:
 * Input:  { type: 'CallExpression', name: 'add', params: [...] }
 * Output: {
 *           type: 'ExpressionStatement',
 *           expression: {
 *             type: 'CallExpression',
 *             callee: { type: 'Identifier', name: 'add' },
 *             arguments: [...]
 *           }
 *         }
 *
 * Context Pattern:
 * - _context: Reference to array where nodes should be pushed
 * - Allows parent nodes to specify where children go
 * - Enables non-destructive transformation (original AST unchanged)
 */

// So we have our transformer function which will accept the lisp ast.
function transformer(ast) {

  // We'll create a `newAst` which like our previous AST will have a program
  // node.
  let newAst = {
    type: 'Program',
    body: [],
  };

  // Next I'm going to cheat a little and create a bit of a hack. We're going to
  // use a property named `context` on our parent nodes that we're going to push
  // nodes to their parent's `context`. Normally you would have a better
  // abstraction than this, but for our purposes this keeps things simple.
  //
  // Just take note that the context is a reference *from* the old ast *to* the
  // new ast.
  ast._context = newAst.body;

  // We'll start by calling the traverser function with our ast and a visitor.
  traverser(ast, {

    // The first visitor method accepts any `NumberLiteral`
    NumberLiteral: {
      // We'll visit them on enter.
      enter(node, parent) {
        // We'll create a new node also named `NumberLiteral` that we will push to
        // the parent context.
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    // Next we have `StringLiteral`
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    // Next up, `CallExpression`.
    CallExpression: {
      enter(node, parent) {

        // We start creating a new node `CallExpression` with a nested
        // `Identifier`.
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        // Next we're going to define a new context on the original
        // `CallExpression` node that will reference the `expression`'s arguments
        // so that we can push arguments.
        node._context = expression.arguments;

        // Then we're going to check if the parent node is a `CallExpression`.
        // If it is not...
        if (parent.type !== 'CallExpression') {

          // We're going to wrap our `CallExpression` node with an
          // `ExpressionStatement`. We do this because the top level
          // `CallExpression` in JavaScript are actually statements.
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }

        // Last, we push our (possibly wrapped) `CallExpression` to the `parent`'s
        // `context`.
        parent._context.push(expression);
      },
    }
  });

  // At the end of our transformer function we'll return the new ast that we
  // just created.
  return newAst;
}

/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                      PHASE 3: THE CODE GENERATOR!!!!
 *                         (CODE GENERATION)
 * ============================================================================
 */

/**
 * CODE GENERATION CONCEPTS:
 * =========================
 * 
 * Code generation converts the transformed AST into target code.
 * This is the final phase of compilation.
 *
 * Key Concepts:
 * - RECURSIVE DESCENT CODE GENERATION: Recursively process AST nodes
 * - PATTERN MATCHING: Use switch/case for node type dispatch
 * - TEMPLATE-BASED: Each node type has generation template
 * - STRING BUILDING: Concatenate generated code strings
 * - BOTTOM-UP GENERATION: Leaf nodes first, then composite nodes
 *
 * Generation Strategy:
 * 1. Process AST nodes recursively
 * 2. For each node type, generate corresponding target code
 * 3. Recursively generate code for child nodes
 * 4. Combine child code according to template
 * 5. Return string of target code
 *
 * Node Type Handlers:
 * - Program: Join body statements with newlines
 * - ExpressionStatement: Generate expression + semicolon
 * - CallExpression: Generate callee(args) format
 * - Identifier: Return identifier name
 * - NumberLiteral: Return number value
 * - StringLiteral: Return quoted string value
 *
 * Example:
 * Input AST:  { type: 'CallExpression', callee: { type: 'Identifier', name: 'add' },
 *              arguments: [{ type: 'NumberLiteral', value: '2' }, ...] }
 * Process:    1. Generate callee: 'add'
 *             2. Generate arguments: ['2', '3']
 *             3. Combine: 'add' + '(' + '2, 3' + ')'
 * Output:     'add(2, 3)'
 *
 * Optimization Opportunities:
 * - Constant folding: Compile-time expression evaluation
 * - Dead code elimination: Remove unreachable code
 * - Code compression: Minify output (if needed)
 */

function codeGenerator(node) {

  // We'll break things down by the `type` of the `node`.
  switch (node.type) {

    // If we have a `Program` node. We will map through each node in the `body`
    // and run them through the code generator and join them with a newline.
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    // For `ExpressionStatement` we'll call the code generator on the nested
    // expression and we'll add a semicolon...
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) +
        ';' // << (...because we like to code the *correct* way)
      );

    // For `CallExpression` we will print the `callee`, add an open
    // parenthesis, we'll map through each node in the `arguments` array and run
    // them through the code generator, joining them with a comma, and then
    // we'll add a closing parenthesis.
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    // For `Identifier` we'll just return the `node`'s name.
    case 'Identifier':
      return node.name;

    // For `NumberLiteral` we'll just return the `node`'s value.
    case 'NumberLiteral':
      return node.value;

    // For `StringLiteral` we'll add quotations around the `node`'s value.
    case 'StringLiteral':
      return '"' + node.value + '"';

    // And if we haven't recognized the node, we'll throw an error.
    default:
      throw new TypeError(node.type);
  }
}

/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */

/**
 * FINALLY! We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 * COMPILER ORCHESTRATION - COMPLETE COMPILATION PIPELINE
 * ======================================================
 * 
 * This is the main entry point that orchestrates all compilation phases.
 * The compiler follows a classic four-stage compilation model:
 *
 * STAGE 1: ANALYSIS (Lexical & Syntactic)
 *   1.1. Tokenization  (Input: source string) 
 *        • Scans character-by-character using finite automata
 *        • Recognizes patterns: identifiers, numbers, operators, keywords
 *        • Output: Token stream (linear sequence of token objects)
 *        • Complexity: O(n) where n = input length
 *   
 *   1.2. Parsing  (Input: token stream)
 *        • Converts token stream to Abstract Syntax Tree (AST)
 *        • Uses recursive descent parsing algorithm
 *        • Validates syntax against context-free grammar
 *        • Builds hierarchical tree structure representing program
 *        • Output: AST node with program body containing expressions
 *        • Complexity: O(n) with single-pass left-to-right scan
 *
 * STAGE 2: TRANSFORMATION (Semantic Analysis)
 *   2.1. AST Traversal  (Input: AST)
 *        • Uses visitor pattern to walk entire tree depth-first
 *        • Applies transformations to specific node types
 *        • Maintains parent node references for context
 *        • Collects transformation results in new tree structure
 *
 *   2.2. Transformation  (Input: traversed AST)
 *        • Performs semantic analysis and source-to-source transformation
 *        • Converts domain-specific language (LISP-like) to target (JavaScript-like)
 *        • Handles type conversions: NumberLiteral, StringLiteral, CallExpression
 *        • Maps source operators to target implementations
 *        • Output: Semantically equivalent AST in target representation
 *
 * STAGE 3: CODE GENERATION
 *   3.1. Code Generation  (Input: transformed AST)
 *        • Recursively traverses transformed AST
 *        • Emits executable code for each node type
 *        • Uses string interpolation to build code strings
 *        • Concatenates identifier, function call, and expression code
 *        • Output: Target language source code (executable JavaScript string)
 *
 * DATA FLOW VISUALIZATION:
 *   Input String
 *       ↓
 *   [TOKENIZER] → Token Stream
 *       ↓
 *   [PARSER] → AST (domain-specific structure)
 *       ↓
 *   [TRAVERSER] → Traversal with Visitor
 *       ↓
 *   [TRANSFORMER] → New AST (target structure)
 *       ↓
 *   [CODE GENERATOR] → Output String
 *       ↓
 *   Executable Code
 *
 * EXAMPLE TRANSFORMATION:
 *   Input:  "(add 2 (subtract 4 2))"
 *   
 *   Tokens:   [PAREN, ADD, NUM(2), PAREN, SUBTRACT, NUM(4), NUM(2), PAREN, PAREN]
 *   AST:      Program { body: [CallExpression { callee: "add", args: [...] }] }
 *   Transform: Convert LISP-like to JavaScript function calls
 *   NewAST:   Program { body: [CallExpression { callee: Identifier, arguments: [...] }] }
 *   Output:   "add(2, subtract(4, 2))"
 *
 * KEY COMPILATION PRINCIPLES:
 * • Single Responsibility: Each phase has well-defined input and output
 * • Separation of Concerns: Analysis, transformation, and generation are independent
 * • Composability: Each stage feeds into the next without side effects
 * • Extensibility: Adding new node types requires changes in specific phases only
 * • Error Detection: Syntax errors caught in parser, semantic issues in transformer
 *
 * PERFORMANCE CHARACTERISTICS:
 * • Overall Time Complexity: O(n) - linear with respect to input length
 * • Space Complexity: O(d) where d = AST depth (call stack during recursion)
 * • Each phase processes the entire input/AST once
 * • Optimization: Early error detection prevents unnecessary later phases
 *
 * ARCHITECTURAL BENEFITS:
 * • Modularity: Can swap phases independently
 * • Testability: Each function can be tested in isolation
 * • Maintainability: Adding language features localized to specific phases
 * • Debuggability: Can inspect intermediate representations (tokens, AST, code)
 * • Educational Value: Clear separation of compilation concerns
 */

function compiler(input) {
  let tokens = tokenizer(input);
  let ast    = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  // and simply return the output!
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!YOU MADE IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

// Now I'm just exporting everything...
module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler,
};
