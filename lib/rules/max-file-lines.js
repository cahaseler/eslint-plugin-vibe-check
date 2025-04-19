/**
 * @fileoverview Rule to flag files that exceed a maximum line count
 */

export default {
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
      tooManyLines: 'File has too many lines ({{count}}). Maximum allowed is {{max}} lines. Large files can be difficult to understand, maintain, and may exceed AI context windows.',
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const option = context.options[0] || {};
    const maxLines = typeof option.max !== 'undefined' ? option.max : 400;

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