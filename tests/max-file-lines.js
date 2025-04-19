import rule from '../lib/rules/max-file-lines.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('max-file-lines', rule, {
  valid: [
    {
      code: 'var a = 1;\nvar b = 2;',
      options: [{ max: 5 }],
    },
    {
      code: Array(400).fill('var a = 1;').join('\n'),
      options: [{ max: 400 }],
    },
    {
      code: Array(399).fill('var a = 1;').join('\n'),
    },
  ],
  invalid: [
    {
      code: Array(401).fill('var a = 1;').join('\n'),
      options: [{ max: 400 }],
      errors: [
        {
          messageId: 'tooManyLines',
          data: {
            count: 401,
            max: 400,
          },
        },
      ],
    },
    {
      code: Array(401).fill('var a = 1;').join('\n'),
      errors: [
        {
          messageId: 'tooManyLines',
          data: {
            count: 401,
            max: 400,
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