import { describe, expect, it } from 'vitest'
import {
  cosine,
  cosineStringSimilarity,
  distance,
  stringDistance,
  stringToVector,
} from './cosine'

describe('vector Cosine Similarity', () => {
  it('calculates cosine similarity between vectors correctly', () => {
    expect(cosine([1, 0, 0], [1, 0, 0])).toBe(1) // identical vectors
    expect(cosine([1, 1, 0], [1, 1, 0])).toBe(1) // identical vectors
    expect(cosine([0, 1, 0], [0, 0, 1])).toBe(0) // orthogonal vectors
    expect(cosine([1, 1, 1], [1, 2, 3])).toBeCloseTo(0.9258, 4) // similar vectors
    expect(cosine([1, 0, 0], [0, 1, 0])).toBe(0) // orthogonal vectors
  })

  it('handles zero vectors', () => {
    expect(cosine([0, 0, 0], [1, 2, 3])).toBe(0)
    expect(cosine([1, 2, 3], [0, 0, 0])).toBe(0)
    expect(cosine([0, 0, 0], [0, 0, 0])).toBe(0)
  })

  it('throws error for vectors of different dimensions', () => {
    expect(() => cosine([1, 2], [1, 2, 3])).toThrow('not of the same dimension')
  })
})

describe('vector Distance', () => {
  it('calculates distance as 1 - cosine similarity', () => {
    expect(distance([1, 0, 0], [1, 0, 0])).toBe(0) // identical vectors
    expect(distance([0, 1, 0], [0, 0, 1])).toBe(1) // orthogonal vectors
    expect(distance([1, 1, 1], [1, 2, 3])).toBeCloseTo(0.0742, 4) // similar vectors
  })
})

describe('string to Vector Conversion', () => {
  it('converts strings to term frequency vectors', () => {
    const vocabulary = new Set(['hello', 'world'])

    // Test with default options (word tokenization, case insensitive)
    expect(stringToVector('hello world', vocabulary)).toEqual([1, 1])
    expect(stringToVector('Hello World', vocabulary)).toEqual([1, 1])
    expect(stringToVector('hello hello world', vocabulary)).toEqual([2, 1])
    expect(stringToVector('', vocabulary)).toEqual([0, 0])
  })

  it('respects case sensitivity option', () => {
    const vocabulary = new Set(['hello', 'Hello', 'world'])

    // Case sensitive
    expect(stringToVector('hello world', vocabulary, { caseSensitive: true }))
      .toEqual([1, 0, 1])

    expect(stringToVector('Hello world', vocabulary, { caseSensitive: true }))
      .toEqual([0, 1, 1])
  })

  it('supports character tokenization', () => {
    const vocabulary = new Set(['h', 'e', 'l', 'o', 'w', 'r', 'd'])

    expect(stringToVector('hello world', vocabulary, { tokenizeBy: 'character' }))
      .toEqual([1, 1, 3, 2, 1, 1, 1])
  })
})

describe('string Similarity', () => {
  it('calculates cosine similarity between identical strings', () => {
    expect(cosineStringSimilarity('hello world', 'hello world')).toBe(1)
    expect(cosineStringSimilarity('Hello World', 'hello world')).toBe(1)
  })

  it('calculates cosine similarity between different strings', () => {
    expect(cosineStringSimilarity('hello world', 'hello there')).toBeCloseTo(0.5, 1)
    expect(cosineStringSimilarity('completely different', 'not the same at all')).toBe(0)
  })

  it('handles empty strings', () => {
    expect(cosineStringSimilarity('', '')).toBe(1) // Two empty strings are identical
    expect(cosineStringSimilarity('hello', '')).toBe(0) // No similarity with empty string
    expect(cosineStringSimilarity('', 'world')).toBe(0) // No similarity with empty string
  })

  it('handles strings with just whitespace', () => {
    expect(cosineStringSimilarity('   ', '   ')).toBe(1)
    expect(cosineStringSimilarity('   ', 'hello')).toBe(0)
  })

  it('respects case sensitivity option', () => {
    // Case insensitive (default)
    expect(cosineStringSimilarity('Hello World', 'hello world')).toBe(1)

    // Case sensitive
    expect(cosineStringSimilarity('Hello World', 'hello world', { caseSensitive: true }))
      .toBeLessThan(1)
  })

  it('supports character tokenization', () => {
    // By default (word tokenization), these are completely different
    expect(cosineStringSimilarity('abc', 'abd')).toBe(0)

    // With character tokenization, they're very similar
    expect(cosineStringSimilarity('abc', 'abd', { tokenizeBy: 'character' }))
      .toBeCloseTo(0.67, 2)
  })
})

describe('string Distance', () => {
  it('calculates distance as 1 - similarity', () => {
    expect(stringDistance('hello world', 'hello world')).toBe(0)
    expect(stringDistance('completely different', 'not the same at all')).toBe(1)
    expect(stringDistance('hello world', 'hello there')).toBeCloseTo(0.5, 1)
  })

  it('supports all options from cosine similarity', () => {
    expect(stringDistance('Abc', 'abc', { caseSensitive: true })).toBe(1)
    expect(stringDistance('Abc', 'abc', { caseSensitive: false })).toBe(0)

    expect(stringDistance('abc', 'abd', { tokenizeBy: 'character' }))
      .toBeCloseTo(0.33, 2)
  })
})

// Real-world examples
describe('real-world String Similarity Examples', () => {
  it('detects similar sentences', () => {
    const sentence1 = 'The quick brown fox jumps over the lazy dog'
    const sentence2 = 'The fast brown fox leaps over the lazy canine'

    expect(cosineStringSimilarity(sentence1, sentence2)).toBeGreaterThan(0.7)
  })

  it('differentiates unrelated content', () => {
    const sentence1 = 'The quick brown fox jumps over the lazy dog'
    const sentence2 = 'Python is a programming language with clean syntax'

    expect(cosineStringSimilarity(sentence1, sentence2)).toBeLessThan(0.3)
  })

  it('works with repeated terms', () => {
    const sentence1 = 'apple apple apple banana'
    const sentence2 = 'apple banana banana banana'

    // These should be somewhat similar but not identical
    const similarity = cosineStringSimilarity(sentence1, sentence2)
    expect(similarity).toBeGreaterThan(0.5)
    expect(similarity).toBeLessThan(1)
  })

  it('handles punctuation appropriately', () => {
    const sentence1 = 'Hello, world! How are you today?'
    const sentence2 = 'Hello world. How are you today'

    // With default tokenization, punctuation affects similarity
    const similarity = cosineStringSimilarity(sentence1, sentence2)
    expect(similarity).toBeGreaterThan(0.4)
    expect(similarity).toBeLessThan(0.9)

    // To ignore punctuation, we should preprocess the strings
    const processed1 = sentence1.replace(/[^\w\s]/g, '')
    const processed2 = sentence2.replace(/[^\w\s]/g, '')
    const cleanSimilarity = cosineStringSimilarity(processed1, processed2)
    expect(cleanSimilarity).toBeGreaterThan(0.9)
  })
})
