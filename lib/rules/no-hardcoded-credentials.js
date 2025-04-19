"use strict";

/**
 * @fileoverview Rule to detect hardcoded credentials, API keys, and secrets
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
      description: "Detect hardcoded credentials, API keys, and secrets",
      category: "Security",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          additionalPatterns: {
            type: "array",
            items: {
              type: "string",
            },
          },
          excludePatterns: {
            type: "array",
            items: {
              type: "string",
            },
          }
        },
        additionalProperties: false,
      },
    ],
    messages: {
      hardcodedCredential: "Potential hardcoded credential detected: {{ name }}. Store sensitive information in environment variables or a secure vault."
    }
  },

  create(context) {
    const options = context.options[0] || {};
    
    // Default patterns for credential-like variable names
    const defaultKeyPatterns = [
      "[a-z]*[_-]?api[_-]?key",
      "[a-z]*[_-]?secret",
      "[a-z]*[_-]?password",
      "[a-z]*[_-]?token",
      "[a-z]*[_-]?auth",
      "[a-z]*[_-]?credential",
      "[a-z]*[_-]?access[_-]?key",
      "[a-z]*[_-]?client[_-]?secret",
      "[a-z]*[_-]?jwt",
      "private[_-]?key",
      "oauth[_-]?token",
      "session[_-]?secret",
      "ssn",
      "social[_-]?security",
      "passcode",
      "encryption[_-]?key",
      "aws[_-]?key",
      "firebase[_-]?key",
      "github[_-]?token",
      "slack[_-]?token",
      "stripe[_-]?key"
    ];
    
    // Patterns that may indicate an actual hardcoded API key or credential
    const valuePatterns = [
      // Hex-looking strings (typically 32+ chars)
      "^[a-f0-9]{32,}$",
      // Base64-looking strings (typically 24+ chars)
      "^[A-Za-z0-9+/=]{24,}$",
      // JWT-like pattern
      "^ey[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+$",
      // API key patterns
      "^key-[a-zA-Z0-9]{16,}$",
      "^[a-zA-Z0-9]{16,}-[a-zA-Z0-9]{16,}$",
      "^sk_[a-zA-Z0-9]{24,}$",
      "^pk_[a-zA-Z0-9]{24,}$",
      "^AIza[0-9A-Za-z-_]{35}$", // Google API keys
      "^ghp_[a-zA-Z0-9]{36}$", // GitHub personal access tokens
      "^[a-zA-Z0-9]{40}$", // GitHub, AWS
      "^AKIA[0-9A-Z]{16}$", // AWS access key
      "^xox[baprs]-[0-9A-Za-z-]{10,48}$" // Slack tokens
    ];
    
    // Common environment variable patterns (to exclude)
    const defaultExcludePatterns = [
      "^process\\.env\\.\\w+$",
      "^env\\.\\w+$",
      "^config\\.\\w+$",
      "^\\$\\{.+\\}$", // Template strings for env vars
      "^'\\${\\w+}'$",
      "^\"\\${\\w+}\"$",
      "^'?<%=\\s*\\w+\\s*%>'?$" // Template engine vars
    ];
    
    // Combine default patterns and additional patterns
    const keyPatterns = [
      ...defaultKeyPatterns,
      ...(options.additionalPatterns || [])
    ].map(pattern => new RegExp(pattern, "i"));
    
    const excludePatterns = [
      ...defaultExcludePatterns,
      ...(options.excludePatterns || [])
    ].map(pattern => new RegExp(pattern));
    
    const valueRegexPatterns = valuePatterns.map(pattern => new RegExp(pattern));
    
    /**
     * Check if a variable name looks like a credential
     * @param {string} name - The variable name
     * @returns {boolean} True if the name matches credential patterns
     */
    function isCredentialName(name) {
      return keyPatterns.some(pattern => pattern.test(name));
    }
    
    /**
     * Check if a value looks like it might be a credential
     * @param {string} value - The string value
     * @returns {boolean} True if the value matches credential patterns
     */
    function isCredentialValue(value) {
      // Exclude empty strings, very short strings, and numeric-only values
      if (!value || typeof value !== 'string' || value.length < 8 || /^[0-9]+$/.test(value)) {
        return false;
      }
      
      // Check if the value matches any of our exclude patterns
      if (excludePatterns.some(pattern => pattern.test(value))) {
        return false;
      }
      
      // Check if the value looks like an API key or credential by pattern
      return valueRegexPatterns.some(pattern => pattern.test(value));
    }
    
    /**
     * Process template literals to check if they're using environment variables
     * @param {Object} node - Template literal node
     * @returns {boolean} True if this is an env var template
     */
    function isEnvVarTemplate(node) {
      if (node.type !== 'TemplateLiteral') return false;
      
      // Check if it's a simple template with one expression
      if (node.expressions.length === 1 && node.quasis.length === 2) {
        const expr = node.expressions[0];
        
        // Check if it's accessing process.env or similar
        if (expr.type === 'MemberExpression') {
          let objName = '';
          
          if (expr.object.type === 'Identifier') {
            objName = expr.object.name;
          } else if (expr.object.type === 'MemberExpression' && 
                     expr.object.object.type === 'Identifier' &&
                     expr.object.property.type === 'Identifier') {
            objName = `${expr.object.object.name}.${expr.object.property.name}`;
          }
          
          return objName === 'process.env' || objName === 'env' || objName === 'config';
        }
      }
      
      return false;
    }
    
    /**
     * Check if a node has a sensitive name or value
     * @param {Object} node - The AST node
     * @param {string} name - The variable name
     * @param {*} value - The variable value
     */
    function checkNode(node, name, value) {
      // Check variable name against patterns
      const isSensitiveName = isCredentialName(name);
      
      // For string literals, check if the value looks like a credential
      const hasCredentialValue = typeof value === 'string' && isCredentialValue(value);
      
      // If either the name or value matches our patterns, report it
      if (isSensitiveName || hasCredentialValue) {
        context.report({
          node,
          messageId: "hardcodedCredential",
          data: {
            name: name
          }
        });
      }
    }
    
    return {
      // Variable declarations (var, let, const)
      VariableDeclarator(node) {
        if (!node.init) return;
        
        const varName = node.id.name;
        
        // Skip checking if it's a template literal with environment variables
        if (node.init.type === "TemplateLiteral" && isEnvVarTemplate(node.init)) {
          return;
        }
        
        if (node.init.type === "Literal" || node.init.type === "TemplateLiteral") {
          const value = node.init.type === "Literal" ? node.init.value : 
                        (node.init.quasis && node.init.quasis.length === 1) ? 
                          node.init.quasis[0].value.raw : null;
          
          checkNode(node, varName, value);
        }
      },
      
      // Object properties (for objects that might contain credentials)
      Property(node) {
        if (node.key && node.value && node.value.type === "Literal") {
          let propName = "";
          
          if (node.key.type === "Identifier") {
            propName = node.key.name;
          } else if (node.key.type === "Literal") {
            propName = String(node.key.value);
          }
          
          if (propName) {
            checkNode(node, propName, node.value.value);
          }
        }
      },
      
      // Assignment expressions (x = "abc")
      AssignmentExpression(node) {
        if (node.right && node.right.type === "Literal") {
          let varName = "";
          
          if (node.left.type === "Identifier") {
            varName = node.left.name;
          } else if (node.left.type === "MemberExpression" && node.left.property) {
            if (node.left.property.type === "Identifier") {
              varName = node.left.property.name;
            } else if (node.left.property.type === "Literal") {
              varName = String(node.left.property.value);
            }
          }
          
          if (varName) {
            checkNode(node, varName, node.right.value);
          }
        }
      }
    };
  }
};