import { describe, expect, it } from 'vitest'
import { damerauLevenshtein } from './damerau-levenshtein'

describe('damerauLevenshtein', () => {
  it('should return 0 steps for identical strings', () => {
    expect(damerauLevenshtein('hello', 'hello')).toBe(0)
  })

  it('should return the correct distance for simple cases', () => {
    expect(damerauLevenshtein('kitten', 'sitting')).toBe(3)
    expect(damerauLevenshtein('sunday', 'saturday')).toBe(3)
  })

  it('should handle empty strings', () => {
    expect(damerauLevenshtein('', '')).toBe(0)
    expect(damerauLevenshtein('abc', '')).toBe(3)
    expect(damerauLevenshtein('', 'xyz')).toBe(3)
  })

  it('should handle case sensitivity correctly', () => {
    expect(damerauLevenshtein('hello', 'Hello')).toBe(1)
    expect(damerauLevenshtein('WORLD', 'world')).toBe(5)
  })

  it('should handle special characters and numbers', () => {
    expect(damerauLevenshtein('123', '1234')).toBe(1)
    expect(damerauLevenshtein('hello!', 'hello?')).toBe(1)
    expect(damerauLevenshtein('user@example.com', 'user@sample.com')).toBe(2)
  })

  it('should handle longer strings', () => {
    const str1 = 'the quick brown fox jumps over the lazy dog'
    const str2 = 'a quick brown fox jumped over a lazy dog'
    expect(damerauLevenshtein(str1, str2)).toBe(8)
  })

  it('should treat transposition as 1 step in Damerau-Levenshtein', () => {
    const result = damerauLevenshtein('ab', 'ba')
    expect(result).toBe(1)
  })
})
