/**
 * @fileoverview Rule to flag comments indicating backwards compatibility concerns
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow comments indicating backwards compatibility concerns',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
    messages: {
      backwardCompatibilityComment: 'Backward compatibility comments suggest incomplete migration or unnecessary legacy code. Consider removing the comment and the associated legacy code.',
    },
  },

  create(context) {
    const backwardCompatibilityTerms = [
      'backward compatibility',
      'backwards compatibility',
      'for backward compatibility',
      'for backwards compatibility',
      'maintain compatibility',
      'legacy support',
      'legacy compatibility',
      'legacy code',
      'old version',
      'older version',
      'compatibility with',
      'support old',
      'support older',
      'keep old',
      'keep for compatibility',
      'deprecation support',
      'migration compatibility',
    ];

    // Create a regex that matches any of the backward compatibility terms
    // Handle flexible word separators (spaces, hyphens, underscores)
    const flexibleTerms = backwardCompatibilityTerms.map(term => {
      // Escape special regex characters first
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Replace spaces with flexible word separator pattern
      return escaped.replace(/\s+/g, '[\\s\\-_]+');
    });
    
    const backwardCompatibilityRegex = new RegExp(
      `\\b(${flexibleTerms.join('|')})(?![a-zA-Z])`,
      'i'
    );

    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();
        
        comments.forEach(comment => {
          const commentText = comment.value.trim();
          
          // Check if comment contains any backward compatibility terms
          if (backwardCompatibilityRegex.test(commentText)) {
            context.report({
              node: comment,
              messageId: 'backwardCompatibilityComment',
            });
          }
        });
      }
    };
  }
};