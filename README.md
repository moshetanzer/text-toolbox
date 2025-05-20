# Text Toolbox [Heavy WIP]

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]

A high-performance TypeScript library for string similarity and distance algorithms—complete with robust utilities for string cleaning, normalization, and format transformation.

* Fully tree-shakeable
* Zero dependencies

## Installation

```bash
# pnpm
pnpm add text-toolbox

# npm
npm install text-toolbox

# yarn
yarn add text-toolbox

```

## Algorithims

### Distance

* `levenshtein()`
* `damerauLevenshtein()`
* `diceCoefficient()`
* `cosineDistance()`

### Similarity

* `cosineSimilarity()`
* `jaroWinkler()`

### Metaphonics

* `metaphone3()`
* `doubleMetaphone()`

## String Cleaning Utilities

A set of helper functions to normalize and sanitize strings before comparison.

### Whitespace Normalizers

Clean up inconsistent or unwanted whitespace:

* `ensureSpaceAfterPunctuation()` - Ensures there is **exactly one space** after punctuation marks like `. , : ; ! ?` (if followed by a word character).
* `normalizePunctuationSpacing()` – Normalizes spaces around punctuation by removing spaces before, ensuring one space after, optionally removing extra spaces, and allowing custom tight spacing for specific characters (e.g., `-`, `'`).
* `normalizeWhitespace()` - Trims leading/trailing whitespace and collapses **all internal whitespace** (spaces, tabs, newlines) to a **single space**.
* `removeAllWhitespace()` - Removes **all whitespace characters** (spaces, tabs, newlines) from the string.
* `removeExtraSpaces()` - Replaces multiple **consecutive spaces** with a **single space** (ignores tabs/newlines).
* `removeLeadingWhitespace()` - Removes **whitespace at the beginning** of the string.
* `removeTrailingWhitespace()` - Removes **whitespace at the end** of the string.
* `removeWhitespaceBeforePunctuation()` - Removes **any whitespace directly before punctuation** like `. , : ; ! ?`.

### Special Character Cleaners

Remove or replace problematic characters and formatting:

* `removeCombiningMarks()` - Removes all types of combining marks from a string.
* `removeModifiers()` - Removes modifier letters and symbols from a string
* `removeDiacritics()` - Removes diacritic marks (accents) from characters in a string.
* `removeHtmlTags()` - Strips HTML tags from the input string.
* `removeIllegalCharacters()` - Removes illegal or non-printable characters from the string.
* `removeNewLineCharacters()` - Removes newline (`\n`) and carriage return (`\r`) characters from the string.
* `removeNonASCII()` - Removes all non-ASCII characters from the string.
* `replaceCompatibilityCharacters()` - This function normalizes text by converting non-ASCII characters (like æ, ø, ß) to their closest ASCII representation (ae, oe, ss).
* `removeControlCharacters()` - Strips control characters from the string.
* `removePunctuation()` - Removes punctuation characters from the string.
* `replaceSmartTypography()` - Converts smart typography characters (like curly quotes and em-dashes) to their standard ASCII equivalents.
* `stripEmoji()` - Removes all emoji characters from the string.

### String Case Formatters

* `camelCase()` - Converts a string to camel case, where the first word is lowercase and each subsequent word starts with an uppercase letter, with no spaces or punctuation.
* `constantCase()` - Converts a string to constant case, where each word is capitalized and separated by underscores.
* `dotCase()` - Converts a string to dot case, where each word is lowercase and separated by periods.
* `camelCase()`
* `kebabCase()` - Converts a string to kebab case, where each word is lowercase and separated by hyphens.
* `pascalCase()` - Converts a string to Pascal case, where each word starts with an uppercase letter and there are no spaces or punctuation.
* `pathCase()` - Converts a string to path case, where each word is lowercase and separated by slashes.
* `sentanceCase()` - Converts a string to sentence case, where only the first letter of the first word is capitalized.
* `snakeCase()` - Converts a string to snake case, where each word is lowercase and separated by underscores.
* `titleCase()` - Converts a string to title case, where  the first letter of each  word is capitalized.

## String Tokenizers

* `fingerprint()` - It normalizes text by removing special characters, creating sorted unique word lists.

## Presets

* `normalizeName()` -

## Security

This package is safe :)

## License

MIT

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/text-toolbox?style=flat
[npm-version-href]: https://npmjs.com/package/text-toolbox
[npm-downloads-src]: https://img.shields.io/npm/dm/text-toolbox?style=flat
[npm-downloads-href]: https://npmjs.com/package/text-toolbox
[codecov-src]: https://img.shields.io/codecov/c/gh/moshetanzer/text-toolbox/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/moshetanzer/text-toolbox
