const assert = require('assert');
const { compiler } = require('./TinyCompiler');

const tests = [
  // Basic Arithmetic
  {
    name: 'Add Two Numbers',
    input: '(add 2 2)',
    expected: '#include <stdio.h>\n\nint main() {\n  add(2, 2);\n  return 0;\n}'
  },
  {
    name: 'Subtract Two Numbers',
    input: '(subtract 4 2)',
    expected: '#include <stdio.h>\n\nint main() {\n  subtract(4, 2);\n  return 0;\n}'
  },

  // Nested Operations
  {
    name: 'Nested Add and Subtract',
    input: '(add 2 (subtract 4 2))',
    expected: '#include <stdio.h>\n\nint main() {\n  add(2, subtract(4, 2));\n  return 0;\n}'
  },
  {
    name: 'Double Nested',
    input: '(add 2 (subtract (add 2 2) 2))',
    expected: '#include <stdio.h>\n\nint main() {\n  add(2, subtract(add(2, 2), 2));\n  return 0;\n}'
  },

  // Multiple Parameters
  {
    name: 'Common Multi-args',
    input: '(add 1 2 3)',
    expected: '#include <stdio.h>\n\nint main() {\n  add(1, 2, 3);\n  return 0;\n}'
  },

  // String Operations
  {
    name: 'String Concatenation',
    input: '(concat "hello" "world")',
    expected: '#include <stdio.h>\n\nint main() {\n  concat("hello", "world");\n  return 0;\n}'
  },

  // Whitespace Handling
  {
    name: 'Excess Whitespace',
    input: '(  add    2      2  )',
    expected: '#include <stdio.h>\n\nint main() {\n  add(2, 2);\n  return 0;\n}'
  }
];

let passed = 0;
let failed = 0;

console.log('🚀 Running TinyCompiler Test Suite...\n');

tests.forEach((test, index) => {
  try {
    const start = process.hrtime();
    const output = compiler(test.input);
    const end = process.hrtime(start);
    const duration = (end[0] * 1000 + end[1] / 1e6).toFixed(2);

    assert.strictEqual(output, test.expected);

    console.log(`✅ Test #${index + 1}: ${test.name} (${duration}ms)`);
    passed++;
  } catch (error) {
    console.error(`❌ Test #${index + 1}: ${test.name} FAILED`);
    console.error(`   Input:    ${test.input}`);
    console.error(`   Expected: ${test.expected}`);
    console.error(`   Actual:   ${error.actual || error.message}\n`);
    failed++;
  }
});

console.log('\n===================================');
console.log(`Summary: ${passed} Passed, ${failed} Failed`);
console.log('===================================');

if (failed > 0) process.exit(1);
