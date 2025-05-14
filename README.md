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

### Similarity

* `cosineStringSimilarity()`
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

### Special Character Cleaners

Remove or replace problematic characters and formatting:

* `removeHtmlTags()` – Strips **HTML tags** (e.g., `<p>`, `<div>`) from the string.
* `removeIllegalChars()` – Removes **non-printable or disallowed characters** (e.g., control codes).
* `removeNewLineCharacters()` – Removes **newline (`\n`) and carriage return (`\r`) characters**.
* `removeNonASCII()` – Removes all characters **outside the standard ASCII range**.
* `removePunctuation()` – Removes **common punctuation marks** from the string.
* `replaceSmartChars()` – Replaces **smart quotes, long dashes, and other typographic symbols** with plain equivalents.
* `stripEmoji()` – Removes all **emoji characters** and symbols.
* `removePunctuation()` – Removes all **punctuation** and symbols.

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

## Algorithm Descriptions

### Levenshtein Distance

The Levenshtein distance is the minimum number of single-character edits (insertions, deletions, or substitutions) required to transform one string into another. This implementation uses a highly-optimized bit-vector algorithm based on [fastest-levenshtein](https://github.com/ka-weihe/fastest-levenshtein) for maximum performance.

### Damerau-Levenshtein Distance

An extension of the Levenshtein algorithm that also considers transpositions (swapping of adjacent characters) as a single edit operation.

### Cosine Similarity

Measures the cosine of the angle between two n-gram vectors of the strings. Often used for full-text similarity.

### Dice Coefficient

Also known as the Sørensen–Dice coefficient. It is calculated as twice the number of shared bigrams divided by the total number of bigrams in both strings.

### Jaro-Winkler

A string similarity metric designed for short strings such as names. It favors strings that match from the beginning and penalizes transpositions.

## License

MIT
