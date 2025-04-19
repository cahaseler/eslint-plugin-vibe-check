/**
 * @fileoverview Rule to flag files that exceed a maximum line count
 */

'use strict';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce a maximum file length',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooManyLines: 'File has too many lines ({{count}}). Maximum allowed is {{max}} lines.',
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const option = context.options[0] || {};
    const maxLines = typeof option.max !== 'undefined' ? option.max : 300;

    return {
      Program(node) {
        const lines = sourceCode.lines || sourceCode.getText().split('\n');
        const lineCount = lines.length;

        if (lineCount > maxLines) {
          context.report({
            node,
            messageId: 'tooManyLines',
            data: {
              count: lineCount,
              max: maxLines,
            },
          });
        }
      },
    };
  },
};