/**
 * @fileoverview Rule to flag changelog-like comments that explain code changes
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow changelog-like comments in code',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
    messages: {
      changelogComment: 'Changelog-like comments should not be left in code. Consider removing this comment.',
    },
  },

  create(context) {
    const changelogTerms = [
      'ensured',
      'ensure',
      'changed',
      'updated',
      'added',
      'removed',
      'fixed',
      'improved',
      'implemented',
      'refactored',
      'optimized',
      'replaced',
      'deleted',
      'modified',
      'enhanced',
      'introduced',
      'resolved',
      'addressed',
    ];

    // Regular expression to match any of the changelog terms
    const changelogRegex = new RegExp(`\\b(${changelogTerms.join('|')})\\b`, 'i');

    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();
        
        comments.forEach(comment => {
          const commentText = comment.value.trim().toLowerCase();
          
          // Check if comment contains any changelog terms
          if (changelogRegex.test(commentText)) {
            context.report({
              node: comment,
              messageId: 'changelogComment',
            });
          }
        });
      }
    };
  }
};