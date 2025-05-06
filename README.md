# String Similarity Metrics

A TypeScript library that provides a consistent API for string similarity algorithms, including both similarity scores and distance calculations.

## Features

- **Consistent API** across all similarity algorithms
- Both **similarity scores** (0-1) and **distance metrics**
- **High Performance** implementations, especially for Levenshtein distance
- TypeScript support with full type definitions
- Multiple string comparison algorithms:
  - Levenshtein distance
  - Damerau-Levenshtein distance
  - Cosine similarity
  - Dice coefficient
  - Jaro-Winkler

## Installation

```bash
pnpm add cuddle-cluster
```

## Usage

### Basic Usage

```typescript
import { cosine, levenshtein } from 'cuddle-cluster'

// Calculate similarity (0-1, higher means more similar)
const similarity = levenshtein.similarity('hello', 'hallo')
console.log(`Similarity: ${similarity}`) // Output: Similarity: 0.8

// Calculate distance (higher means more different)
const distance = levenshtein.distance('hello', 'hallo')
console.log(`Distance: ${distance}`) // Output: Distance: 1

// Get both metrics at once
const result = levenshtein.compare('hello', 'hallo')
console.log(`Distance: ${result.distance}, Similarity: ${result.similarity}`)
```

### Available Algorithms

```typescript
import similarityMetrics from 'cuddle-cluster'

// Available algorithms:
const { levenshtein, damerauLevenshtein, cosine, diceCoefficient, jaroWinkler } = similarityMetrics

// Compare strings with different algorithms
const leven = levenshtein.compare('book', 'back')
const cosine = cosine.compare('book', 'back')

console.log(`Levenshtein: ${leven.similarity}`)
console.log(`Cosine: ${cosine.similarity}`)
```

### Options

```typescript
import { levenshtein } from 'cuddle-cluster'

// With options
const result = levenshtein.compare('Hello', 'hello', {
  caseSensitive: true, // Default: false
  normalize: true // Default: true
})
```

## Algorithm Descriptions

### Levenshtein Distance

The Levenshtein distance is the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into another. Our implementation uses a highly-optimized bit-vector algorithm based on [fastest-levenshtein](https://github.com/ka-weihe/fastest-levenshtein) for maximum performance.

### Damerau-Levenshtein Distance

An extension of Levenshtein that also considers transpositions of adjacent characters as a single edit operation.

### Cosine Similarity

Measures the cosine of the angle between two vectors representing the strings. The vectors are typically created by counting character n-grams.

### Dice Coefficient

Also known as Sørensen–Dice coefficient, it's defined as twice the number of common terms divided by the sum of the number of terms in each string.

### Jaro-Winkler

A string metric designed for short strings such as person names. It gives more favorable ratings to strings that match from the beginning.

## License

MIT
