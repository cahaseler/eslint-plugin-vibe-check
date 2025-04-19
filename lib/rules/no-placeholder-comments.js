"use strict";

/**
 * @fileoverview Rule to detect placeholder comments that indicate code shortcuts
 * @author Claude
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect placeholder comments that indicate code shortcuts",
      category: "Best Practices",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          patterns: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      placeholderComment: "Avoid placeholder comments: '{{ comment }}'. Replace with actual implementation."
    }
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const options = context.options[0] || {};
    
    // Default patterns to look for
    const defaultPatterns = [
      "if this was a real app",
      "if this were a real app", 
      "in a real app",
      "in production",
      "todo: make secure",
      "in a production environment",
      "add proper error handling",
      "implement security",
      "fix later",
      "should be implemented",
      "needs implementation",
      "in a real world scenario",
      "this is just for demo",
      "this is just a demo",
      "in real code",
      "placeholder",
      "dummy implementation"
    ];
    
    const patterns = options.patterns || defaultPatterns;
    
    // Create case-insensitive regex patterns
    const regexPatterns = patterns.map(pattern => 
      new RegExp(`\\b${pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "i")
    );

    return {
      Program() {
        const comments = sourceCode.getAllComments();
        
        comments.forEach(comment => {
          const commentText = comment.value.toLowerCase().trim();
          
          for (const pattern of regexPatterns) {
            if (pattern.test(commentText)) {
              context.report({
                loc: comment.loc,
                messageId: "placeholderComment",
                data: {
                  comment: comment.value.trim()
                }
              });
              break;
            }
          }
        });
      }
    };
  }
};