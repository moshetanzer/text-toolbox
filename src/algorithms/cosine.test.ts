import { describe, expect, it } from 'vitest'
import {
  cosineDistance,
  cosineSimilarity,
} from './cosine'

describe('string Similarity', () => {
  it('calculates cosine similarity between identical strings', () => {
    expect(cosineSimilarity('hello world', 'hello world')).toBe(1)
    expect(cosineSimilarity('Hello World', 'hello world')).toBe(1)
  })

  it('calculates cosine similarity between different strings', () => {
    expect(cosineSimilarity('hello world', 'hello there')).toBeCloseTo(0.5, 1)
    expect(cosineSimilarity('completely different', 'not the same at all')).toBe(0)
  })

  it('handles empty strings', () => {
    expect(cosineSimilarity('', '')).toBe(1) // Two empty strings are identical
    expect(cosineSimilarity('hello', '')).toBe(0) // No similarity with empty string
    expect(cosineSimilarity('', 'world')).toBe(0) // No similarity with empty string
  })

  it('handles strings with just whitespace', () => {
    expect(cosineSimilarity('   ', '   ')).toBe(1)
    expect(cosineSimilarity('   ', 'hello')).toBe(0)
  })

  it('respects case sensitivity option', () => {
    // Case insensitive (default)
    expect(cosineSimilarity('Hello World', 'hello world')).toBe(1)

    // Case sensitive
    expect(cosineSimilarity('Hello World', 'hello world', { caseSensitive: true }))
      .toBeLessThan(1)
  })

  it('supports character tokenization', () => {
    // By default (word tokenization), these are completely different
    expect(cosineSimilarity('abc', 'abd')).toBe(0)

    // With character tokenization, they're very similar
    expect(cosineSimilarity('abc', 'abd', { tokenizeBy: 'char' }))
      .toBeCloseTo(0.67, 2)
  })
})

describe('string Distance', () => {
  it('calculates distance as 1 - similarity', () => {
    expect(cosineDistance('hello world', 'hello world')).toBe(0)
    expect(cosineDistance('completely different', 'not the same at all')).toBe(1)
    expect(cosineDistance('hello world', 'hello there')).toBeCloseTo(0.5, 1)
  })

  it('supports all options from cosine similarity', () => {
    expect(cosineDistance('Abc', 'abc', { caseSensitive: true })).toBe(1)
    expect(cosineDistance('Abc', 'abc', { caseSensitive: false })).toBe(0)

    expect(cosineDistance('abc', 'abd', { tokenizeBy: 'char' }))
      .toBeCloseTo(0.33, 2)
  })
})

// Real-world examples
describe('real-world String Similarity Examples', () => {
  it('detects similar sentences', () => {
    const sentence1 = 'The quick brown fox jumps over the lazy dog'
    const sentence2 = 'The fast brown fox leaps over the lazy canine'

    expect(cosineSimilarity(sentence1, sentence2)).toBeGreaterThan(0.7)
  })

  it('differentiates unrelated content', () => {
    const sentence1 = 'The quick brown fox jumps over the lazy dog'
    const sentence2 = 'Python is a programming language with clean syntax'

    expect(cosineSimilarity(sentence1, sentence2)).toBeLessThan(0.3)
  })

  it('works with repeated terms', () => {
    const sentence1 = 'apple apple apple banana'
    const sentence2 = 'apple banana banana banana'

    // These should be somewhat similar but not identical
    const similarity = cosineSimilarity(sentence1, sentence2)
    expect(similarity).toBeGreaterThan(0.5)
    expect(similarity).toBeLessThan(1)
  })

  it('handles punctuation appropriately', () => {
    const sentence1 = 'Hello, world! How are you today?'
    const sentence2 = 'Hello world. How are you today'

    // With default tokenization, punctuation affects similarity
    const similarity = cosineSimilarity(sentence1, sentence2)
    expect(similarity).toBeGreaterThan(0.4)
    expect(similarity).toBeLessThan(0.9)

    // To ignore punctuation, we should preprocess the strings
    const processed1 = sentence1.replace(/[^\w\s]/g, '')
    const processed2 = sentence2.replace(/[^\w\s]/g, '')
    const cleanSimilarity = cosineSimilarity(processed1, processed2)
    expect(cleanSimilarity).toBeGreaterThan(0.9)
  })
})
