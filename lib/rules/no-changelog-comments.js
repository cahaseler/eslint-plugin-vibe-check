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
    fixable: 'code',
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