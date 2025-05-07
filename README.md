# Text Toolbox

A TypeScript library providing a consistent API for string similarity algorithms, including both similarity scores and distance calculations. Also includes performent utilities for cleaning and normalizing strings.

## Features

* **Consistent API** across all algorithms
* Support for both **similarity scores** (0–1) and **distance metrics**
* **High-performance** implementations
* TypeScript support with **full type definitions**
* Multiple string comparison algorithms:

  * Levenshtein distance
  * Damerau-Levenshtein distance
  * Cosine similarity
  * Dice coefficient
  * Jaro-Winkler
* Built-in **string normalization utilities** for whitespace and special characters

## Installation

```bash
pnpm add text-toolbox
```

## Usage

### Basic Example

```ts
import { levenshtein } from 'text-toolbox'

// Calculate similarity (0–1, higher means more similar)
const similarity = levenshtein.similarity('hello', 'hallo')
console.log(`Similarity: ${similarity}`) // Output: Similarity: 0.8

// Calculate distance (higher means more different)
const distance = levenshtein.distance('hello', 'hallo')
console.log(`Distance: ${distance}`) // Output: Distance: 1

// Get both metrics at once
const result = levenshtein.compare('hello', 'hallo')
console.log(`Distance: ${result.distance}, Similarity: ${result.similarity}`)
```

### Using Options

```ts
import { levenshtein } from 'text-toolbox'

const result = levenshtein.compare('Hello', 'hello', {
  caseSensitive: true,
  normalize: true
})
```

## String Cleaning Utilities

A set of helper functions to normalize and sanitize strings before comparison.

### Whitespace Normalizers

Clean up inconsistent or unwanted whitespace:

* `removeAllSpaces` – Removes **all spaces** from the string.
* `removeDoubleSpaces` – Replaces multiple consecutive spaces with a **single space**.
* `removeLeadingSpaces` – Removes **spaces at the beginning** of the string.
* `removeTrailingSpaces` – Removes **spaces at the end** of the string.
* `removeWhitespaceAroundPunctuation` – Removes extra spaces **around punctuation** (e.g., ` , . : ; ! ?`).

### Special Character Cleaners

Remove or replace problematic characters and formatting:

* `removeHtmlTags` – Strips **HTML tags** (e.g., `<p>`, `<div>`) from the string.
* `removeIllegalChars` – Removes **non-printable or disallowed characters** (e.g., control codes).
* `removeNewLineCharacters` – Removes **newline (`\n`) and carriage return (`\r`) characters**.
* `removeNonASCII` – Removes all characters **outside the standard ASCII range**.
* `removePunctuation` – Removes **common punctuation marks** from the string.
* `replaceSmartChars` – Replaces **smart quotes, long dashes, and other typographic symbols** with plain equivalents.
* `stripEmoji` – Removes all **emoji characters** and symbols.

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
