# Enforce maximum file length (max-file-lines)

This rule is designed to warn when a file exceeds a configurable maximum number of lines. It's particularly useful for AI-assisted coding workflows, where files that become too large can be difficult to understand and maintain.

## Rule Details

This rule aims to keep code files at a reasonable size by enforcing a maximum line count.

Examples of **incorrect** code for this rule with a `{ "max": 300 }` option:

```js
// A file with more than 300 lines
```

Examples of **correct** code for this rule:

```js
// A file with 300 or fewer lines
```

## Options

This rule has an object option:

* `"max"`: (default 300) enforces a maximum number of lines per file

### max

Examples of **incorrect** code for this rule with the `{ "max": 200 }` option:

```js
// A file with more than 200 lines
```

Examples of **correct** code for this rule with the `{ "max": 200 }` option:

```js
// A file with 200 or fewer lines
```

## When Not To Use It

You can turn this rule off if you are not concerned with the length of your files.

## Compatibility

This rule is similar to ESLint's built-in `max-lines` rule, but reports at the file level rather than providing multiple warnings or errors throughout the file.