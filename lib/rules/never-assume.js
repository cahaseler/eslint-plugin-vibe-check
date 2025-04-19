/**
 * @fileoverview Rule to flag comments that contain forms of the word "assume"
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow comments containing assumptions',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
    messages: {
      assumption: 'Never make assumptions about the codebase. Check and validate before making decisions.',
    },
  },

  create(context) {
    const assumptionTerms = [
      'assume',
      'assumes',
      'assumed',
      'assuming',
      'assumption',
      'assumptions',
    ];

    // Regular expression to match any of the assumption terms
    const assumptionRegex = new RegExp(`\\b(${assumptionTerms.join('|')})\\b`, 'i');

    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();
        
        comments.forEach(comment => {
          const commentText = comment.value.trim().toLowerCase();
          
          // Check if comment contains any assumption terms
          if (assumptionRegex.test(commentText)) {
            context.report({
              node: comment,
              messageId: 'assumption',
            });
          }
        });
      }
    };
  }
};