/**
 * @fileoverview Rule to detect import followed by re-export pattern
 * @author eslint-plugin-vibe-check
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow importing a module only to immediately re-export it",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
    messages: {
      importExport: "Avoid importing '{{name}}' just to re-export it. Consider updating references to import directly from '{{source}}'."
    }
  },

  create(context) {
    const imports = new Map(); // Maps local name to { source, importedName }
    const exportedNames = new Set(); // Track what's been exported 
    const usedIdentifiers = new Set(); // Track identifiers used outside import/export

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        
        node.specifiers.forEach(specifier => {
          const localName = specifier.local.name;
          
          if (specifier.type === 'ImportSpecifier') {
            // import { foo } from 'module' or import { foo as bar } from 'module'
            imports.set(localName, {
              source: source,
              importedName: specifier.imported.name,
              type: 'named'
            });
          } else if (specifier.type === 'ImportDefaultSpecifier') {
            // import foo from 'module'
            imports.set(localName, {
              source: source,
              importedName: 'default',
              type: 'default'
            });
          } else if (specifier.type === 'ImportNamespaceSpecifier') {
            // import * as foo from 'module'
            imports.set(localName, {
              source: source,
              importedName: '*',
              type: 'namespace'
            });
          }
        });
      },

      // Track usage of identifiers in the code (not in import/export statements)
      Identifier(node) {
        const parent = node.parent;
        
        // Skip if this identifier is part of an import or export declaration
        if (parent && (
          parent.type === 'ImportSpecifier' ||
          parent.type === 'ImportDefaultSpecifier' ||
          parent.type === 'ImportNamespaceSpecifier' ||
          parent.type === 'ExportSpecifier' ||
          parent.type === 'ExportDefaultDeclaration' ||
          parent.type === 'ExportNamedDeclaration' ||
          parent.type === 'ExportAllDeclaration'
        )) {
          return;
        }

        // Also skip if the parent is an import/export declaration
        const grandParent = parent ? parent.parent : null;
        if (grandParent && (
          grandParent.type === 'ImportDeclaration' ||
          grandParent.type === 'ExportNamedDeclaration' ||
          grandParent.type === 'ExportDefaultDeclaration'
        )) {
          return;
        }

        usedIdentifiers.add(node.name);
      },

      ExportNamedDeclaration(node) {
        if (!node.source) {
          // export { foo } - local export
          node.specifiers.forEach(specifier => {
            const localName = specifier.local.name;
            const exportedName = specifier.exported.name;
            
            exportedNames.add(exportedName);
            
            // Check if this local name was imported and is unused
            if (imports.has(localName) && !usedIdentifiers.has(localName)) {
              const importInfo = imports.get(localName);
              context.report({
                node: specifier,
                messageId: "importExport",
                data: {
                  name: exportedName,
                  source: importInfo.source
                }
              });
            }
          });
        } else {
          // export { foo } from 'module' - this is actually legitimate re-export syntax
          // We only flag this if there's a redundant import from the same source
          const source = node.source.value;
          node.specifiers.forEach(specifier => {
            const localName = specifier.local ? specifier.local.name : specifier.exported.name;
            const exportedName = specifier.exported.name;
            
            exportedNames.add(exportedName);
            
            // Check if we have a redundant import from the same source
            for (const [importedLocal, importInfo] of imports.entries()) {
              if (importInfo.source === source && 
                  (importedLocal === localName || importInfo.importedName === localName)) {
                context.report({
                  node: specifier,
                  messageId: "importExport",
                  data: {
                    name: exportedName,
                    source: source
                  }
                });
                break;
              }
            }
          });
        }
      },

      ExportDefaultDeclaration(node) {
        if (node.declaration && node.declaration.type === 'Identifier') {
          const localName = node.declaration.name;
          
          // Check if this identifier was imported
          if (imports.has(localName)) {
            const importInfo = imports.get(localName);
            context.report({
              node,
              messageId: "importExport",
              data: {
                name: localName,
                source: importInfo.source
              }
            });
          }
        }
      },

      ExportAllDeclaration(node) {
        const source = node.source.value;
        
        // Check if we have any imports from the same source
        for (const [localName, importInfo] of imports.entries()) {
          if (importInfo.source === source) {
            context.report({
              node,
              messageId: "importExport",
              data: {
                name: "*",
                source: source
              }
            });
            break; // Only report once per export *
          }
        }
      }
    };
  }
};