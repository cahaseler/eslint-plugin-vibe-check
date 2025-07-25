/**
 * @fileoverview Rule to flag comments indicating backwards compatibility concerns
 */

module.exports = {
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
    fixable: 'code',
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
    const backwardCompatibilityRegex = new RegExp(
      `\\b(${backwardCompatibilityTerms.join('|').replace(/\s+/g, '\\s+')})\\b`,
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
              fix(fixer) {
                const sourceCode = context.getSourceCode();
                
                // Check if this is a JSX comment (wrapped in curly braces)
                const parentToken = sourceCode.getTokenBefore(comment);
                const nextToken = sourceCode.getTokenAfter(comment);
                
                // If comment is preceded by '{' and followed by '}', it's a JSX comment
                if (parentToken && nextToken && 
                    parentToken.value === '{' && nextToken.value === '}') {
                  
                  // Verify that the tokens are adjacent to the comment
                  // to ensure we're not capturing unrelated braces
                  const commentStart = comment.range[0];
                  const commentEnd = comment.range[1];
                  const parentTokenEnd = parentToken.range[1];
                  const nextTokenStart = nextToken.range[0];
                  
                  // Check if the tokens are directly adjacent to the comment
                  const isJsxComment = (parentTokenEnd === commentStart || 
                                      parentTokenEnd + 1 === commentStart) && 
                                      (nextTokenStart === commentEnd || 
                                      nextTokenStart - 1 === commentEnd);
                  
                  if (isJsxComment) {
                    // Get the range of the entire expression including braces
                    const range = [parentToken.range[0], nextToken.range[1]];
                    return fixer.removeRange(range);
                  }
                }
                
                // Regular comment handling
                return fixer.remove(comment);
              }
            });
          }
        });
      }
    };
  }
};