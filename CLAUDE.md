# Claude Guidelines for vibe-check

## Project Context

`vibe-check` is an ESLint plugin that provides warnings and guardrails specifically designed for AI coding assistance. It aims to help maintain high code quality and enforce best practices when using AI tools to generate or modify code.

## Repository Structure

- `/lib`: Core plugin code
  - `index.js`: Plugin entry point
  - `/rules`: Individual ESLint rules implementation
- `/docs/rules`: Documentation for each rule
- `/examples`: Example usage of the plugin
- `/tests`: Unit tests for rules

## Development Guidelines

- Follow ESLint plugin conventions
- Each rule should have:
  - Implementation in `/lib/rules`
  - Documentation in `/docs/rules`
  - Tests in `/tests`
  - Example in `/examples` (optional)
- Run tests with `npm test`
- Verify changes with `npm run lint`
- Test rule examples with `npm run example`

## Existing Rules

1. `max-file-lines`: Warns when a file exceeds a configurable maximum number of lines (default: 300)
2. `no-placeholder-comments`: Catches placeholder comments indicating shortcuts or unimplemented features (e.g., "in a real app", "TODO: make secure")
3. `no-hardcoded-credentials`: Detects hardcoded API keys, tokens, passwords, and other sensitive credentials
4. `no-changelog-comments`: Flags comments containing words like "ensure", "changed", "updated", "added", "removed", "fixed", etc., to prevent AI-generated changelog comments

## Planned Rules

Add planned rules here as the project develops.

## Project Goals

- Provide practical guardrails for AI code generation
- Focus on common pitfalls in AI-generated code
- Create rules that promote maintainable, high-quality code
- Support modern JavaScript/TypeScript development practices