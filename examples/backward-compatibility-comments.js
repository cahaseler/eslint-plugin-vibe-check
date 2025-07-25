// Example of backward compatibility comments that should be flagged

// Added for backward compatibility with React 16
function LegacyComponent() {
  return <div>Old implementation</div>;
}

// Keep this for backwards compatibility
const oldApiEndpoint = '/api/v1/data';

/* Legacy support for IE11 */
function polyfillFeature() {
  // Implementation
}

// Support older browsers that don't have fetch
if (!window.fetch) {
  // Polyfill code
}

// This maintains compatibility with older versions
function migrateData(data) {
  // Migration logic
}

/**
 * Legacy code - don't remove until v3.0
 * This function supports legacy compatibility
 */
function deprecatedMethod() {
  // Old implementation
}

// Deprecation support until next major version
const DEPRECATED_CONSTANT = 'old-value';

// Migration compatibility layer
function bridgeOldAndNew() {
  // Bridge implementation
}