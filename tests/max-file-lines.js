'use strict';

const rule = require('../lib/rules/max-file-lines');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('max-file-lines', rule, {
  valid: [
    {
      code: 'var a = 1;\nvar b = 2;',
      options: [{ max: 5 }],
    },
    {
      code: Array(300).fill('var a = 1;').join('\n'),
      options: [{ max: 300 }],
    },
    {
      code: Array(299).fill('var a = 1;').join('\n'),
    },
  ],
  invalid: [
    {
      code: Array(301).fill('var a = 1;').join('\n'),
      options: [{ max: 300 }],
      errors: [
        {
          messageId: 'tooManyLines',
          data: {
            count: 301,
            max: 300,
          },
        },
      ],
    },
    {
      code: Array(301).fill('var a = 1;').join('\n'),
      errors: [
        {
          messageId: 'tooManyLines',
          data: {
            count: 301,
            max: 300,
          },
        },
      ],
    },
    {
      code: Array(10).fill('var a = 1;').join('\n'),
      options: [{ max: 5 }],
      errors: [
        {
          messageId: 'tooManyLines',
          data: {
            count: 10,
            max: 5,
          },
        },
      ],
    },
  ],
});