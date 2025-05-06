import { describe, expect, it } from 'vitest'
import { diceCoefficientDistance } from './dice-coeffecient'

describe('dice Coefficient Similarity', () => {
  it('calculates dice coefficient between identical strings', () => {
    expect(diceCoefficientDistance('hello', 'hello')).toBe(1)
    expect(diceCoefficientDistance('Hello', 'hello')).toBe(1) // case insensitive by default
    expect(diceCoefficientDistance('', '')).toBe(1) // Two empty strings are identical
  })

  it('calculates dice coefficient between different strings', () => {
    expect(diceCoefficientDistance('night', 'nacht')).toBeCloseTo(0.25, 2) // They share 'n' and 't' in bigrams
    expect(diceCoefficientDistance('completely different', 'not the same')).toBe(0) // No common bigrams
  })

  it('handles strings with one character', () => {
    expect(diceCoefficientDistance('a', 'a')).toBe(0) // No bigrams possible
    expect(diceCoefficientDistance('a', 'b')).toBe(0) // No bigrams possible
  })

  it('handles empty strings', () => {
    expect(diceCoefficientDistance('', '')).toBe(1) // Two empty strings are identical
    expect(diceCoefficientDistance('hello', '')).toBe(0) // No similarity with empty string
    expect(diceCoefficientDistance('', 'world')).toBe(0) // No similarity with empty string
  })

  it('respects case sensitivity option', () => {
    // Case insensitive (default)
    expect(diceCoefficientDistance('Hello', 'hello')).toBe(1)

    // Case sensitive
    expect(diceCoefficientDistance('Hello', 'hello', { caseSensitive: true }))
      .toBeLessThan(1)
  })
})

describe('dice Distance', () => {
  it('calculates distance as 1 - dice coefficient', () => {
    expect(diceCoefficientDistance('hello', 'hello')).toBe(0)
    expect(diceCoefficientDistance('night', 'nacht')).toBeCloseTo(0.75, 2)
    expect(diceCoefficientDistance('completely different', 'not the same')).toBe(1)
  })

  it('supports case sensitivity option', () => {
    expect(diceCoefficientDistance('Hello', 'hello', { caseSensitive: true }))
      .toBeGreaterThan(0)
    expect(diceCoefficientDistance('Hello', 'hello', { caseSensitive: false }))
      .toBe(0)
  })
})

describe('real-world Dice Coefficient Examples', () => {
  it('detects similar words', () => {
    expect(diceCoefficientDistance('color', 'colour')).toBeGreaterThan(0.6)
    expect(diceCoefficientDistance('neighbor', 'neighbour')).toBeGreaterThan(0.8)
  })

  it('identifies spelling errors', () => {
    expect(diceCoefficientDistance('receive', 'recieve')).toBeGreaterThan(0.8)
    expect(diceCoefficientDistance('separate', 'seperate')).toBeGreaterThan(0.8)
  })

  it('compares names with variations', () => {
    expect(diceCoefficientDistance('John Smith', 'Jon Smith')).toBeGreaterThan(0.7)
    expect(diceCoefficientDistance('New York', 'New Yorker')).toBeGreaterThan(0.6)
  })

  it('handles hyphenation and spaces', () => {
    expect(diceCoefficientDistance('e-mail', 'email')).toBeGreaterThan(0.5)
    expect(diceCoefficientDistance('data base', 'database')).toBeGreaterThan(0.7)
  })

  it('demonstrates language detection characteristics', () => {
    // Same words in different languages often have different bigram profiles
    const english = 'information'
    const german = 'information' // Same spelling but different pronunciation
    const french = 'information' // Same spelling but different pronunciation

    // The dice coefficient will be 1.0 since they are identical strings
    expect(diceCoefficientDistance(english, german)).toBe(1.0)
    expect(diceCoefficientDistance(english, french)).toBe(1.0)

    // A more realistic language detection would use different words
    expect(diceCoefficientDistance('water', 'wasser')).toBeLessThan(0.5) // English vs German
    expect(diceCoefficientDistance('water', 'eau')).toBe(0) // English vs French
  })

  it('compares longer text samples', () => {
    const text1 = 'The quick brown fox jumps over the lazy dog'
    const text2 = 'The quick brown fox jumps over the lazy dogs'
    const text3 = 'A fast brown fox leaps over a tired canine'

    // Adding one character should maintain high similarity
    expect(diceCoefficientDistance(text1, text2)).toBeGreaterThan(0.9)

    // More substantial rewording should have lower but still positive similarity
    expect(diceCoefficientDistance(text1, text3)).toBeGreaterThan(0.3)
    expect(diceCoefficientDistance(text1, text3)).toBeLessThan(0.7)
  })
})
