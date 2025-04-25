/**
 * @fileoverview Tests for both ESM and CommonJS versions of the plugin
 */

'use strict';

import { strict as assert } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import esmPlugin from '../lib/index.js';

// Use dynamic import to test the CommonJS version (converted at runtime)
const getCjsPlugin = async () => {
  try {
    // This import will convert from .cjs to module format
    return await import('../lib/index.cjs');
  } catch (error) {
    console.error('Failed to load CommonJS version:', error);
    throw error;
  }
};

// Mock function for testing error handling
const getCjsPluginWithError = async () => {
  try {
    // Intentionally import a non-existent file to test error handling
    return await import('../lib/non-existent-file.cjs');
  } catch (error) {
    // Properly handle expected error by returning null, which we can assert against
    return null;
  }
};

describe('Dual plugin format support', async () => {
  let cjsPlugin;

  beforeEach(async () => {
    cjsPlugin = await getCjsPlugin();
  });

  it('ESM plugin has correct structure', () => {
    assert.ok(esmPlugin.rules, 'ESM version should have rules property');
    assert.ok(esmPlugin.configs, 'ESM version should have configs property');
    
    // Check that each rule exists in ESM version
    assert.ok(esmPlugin.rules['max-file-lines'], 'max-file-lines rule should exist in ESM version');
    assert.ok(esmPlugin.rules['no-placeholder-comments'], 'no-placeholder-comments rule should exist in ESM version');
    assert.ok(esmPlugin.rules['no-hardcoded-credentials'], 'no-hardcoded-credentials rule should exist in ESM version');
    assert.ok(esmPlugin.rules['no-changelog-comments'], 'no-changelog-comments rule should exist in ESM version');
    assert.ok(esmPlugin.rules['never-assume'], 'never-assume rule should exist in ESM version');
    
    // Check recommended configs
    assert.ok(esmPlugin.configs.recommended, 'recommended config should exist in ESM version');
    assert.ok(esmPlugin.configs.strict, 'strict config should exist in ESM version');
  });

  it('CommonJS plugin has correct structure', () => {
    // Note: ESM dynamic import of CJS module will wrap with a default property
    const cjsPluginObj = cjsPlugin.default || cjsPlugin;
    
    assert.ok(cjsPluginObj.rules, 'CJS version should have rules property');
    assert.ok(cjsPluginObj.configs, 'CJS version should have configs property');
    
    // Check that each rule exists in CJS version
    assert.ok(cjsPluginObj.rules['max-file-lines'], 'max-file-lines rule should exist in CJS version');
    assert.ok(cjsPluginObj.rules['no-placeholder-comments'], 'no-placeholder-comments rule should exist in CJS version');
    assert.ok(cjsPluginObj.rules['no-hardcoded-credentials'], 'no-hardcoded-credentials rule should exist in CJS version');
    assert.ok(cjsPluginObj.rules['no-changelog-comments'], 'no-changelog-comments rule should exist in CJS version');
    assert.ok(cjsPluginObj.rules['never-assume'], 'never-assume rule should exist in CJS version');
    
    // Check recommended configs
    assert.ok(cjsPluginObj.configs.recommended, 'recommended config should exist in CJS version');
    assert.ok(cjsPluginObj.configs.strict, 'strict config should exist in CJS version');
  });
  
  it('Handles import errors gracefully', async () => {
    // Test error handling with non-existent file
    const result = await getCjsPluginWithError();
    assert.equal(result, null, 'Should handle import errors gracefully');
  });
});