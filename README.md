# Text Toolbox [Heavy WIP]

[![codecov](https://codecov.io/gh/moshetanzer/text-toolbox/graph/badge.svg?token=UBY45FC2VS)](https://codecov.io/gh/moshetanzer/text-toolbox)

A TypeScript library delivering high-performance string similarity and distance algorithms, along with a comprehensive set of utilities for string cleaning, normalization, and format transformation.

## Installation

```bash
pnpm add text-toolbox
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

* `removeAllSpaces()` – Removes **all spaces** from the string.
* `removeExtraSpaces()` – Replaces multiple consecutive spaces with a **single space**.
* `removeLeadingSpaces()` – Removes **spaces at the beginning** of the string.
* `removeTrailingSpaces()` – Removes **spaces at the end** of the string.
* `normalizePunctuationSpacing()` – Removes extra spaces **around punctuation** (e.g., ` , . : ; ! ?`).

### Special Character Cleaners (Docs Done - API Stable)

Remove or replace problematic characters and formatting:

* `removeCombiningMarks()` - Removes all types of combining marks from a string.
* `removeModifiers()` - Removes modifier letters and symbols from a string
* `removeDiacritics()` - Removes diacritic marks (accents) from characters in a string.
* `removeHtmlTags()` - Strips HTML tags from the input string.
* `removeIllegalCharacters()` - Removes illegal or non-printable characters from the string.
* `removeNewLineCharacters()` - Removes newline (`\n`) and carriage return (`\r`) characters from the string.
* `removeNonASCII()` - Removes all non-ASCII characters from the string.
* `replaceCompatibilityCharacters()` -* This function normalizes text by converting non-ASCII characters (like æ, ø, ß) to their closest ASCII representation (ae, oe, ss).
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
* `normalizeEmail()` -
* `formatDate()` -

## License

MIT
