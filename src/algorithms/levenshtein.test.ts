import { describe, expect, it } from 'vitest'
import { levenshtein } from './levenshtein'

describe('levenshtein', () => {
  it('should return 0 for identical strings', () => {
    expect(levenshtein.distance('hello', 'hello')).toBe(0)
  })

  it('should return the correct distance for simple cases', () => {
    expect(levenshtein.distance('kitten', 'sitting')).toBe(3)
    expect(levenshtein.distance('sunday', 'saturday')).toBe(3)
  })

  it('should handle empty strings', () => {
    expect(levenshtein.distance('', '')).toBe(0)
    expect(levenshtein.distance('abc', '')).toBe(3)
    expect(levenshtein.distance('', 'xyz')).toBe(3)
  })

  it('should handle case sensitivity correctly', () => {
    expect(levenshtein.distance('hello', 'Hello')).toBe(1)
    expect(levenshtein.distance('WORLD', 'world')).toBe(5)
  })

  it('should handle special characters and numbers', () => {
    expect(levenshtein.distance('123', '1234')).toBe(1)
    expect(levenshtein.distance('hello!', 'hello?')).toBe(1)
    expect(levenshtein.distance('user@example.com', 'user@sample.com')).toBe(2)
  })

  it('should handle longer strings', () => {
    const str1 = 'the quick brown fox jumps over the lazy dog'
    const str2 = 'a quick brown fox jumped over a lazy dog'
    expect(levenshtein.distance(str1, str2)).toBe(8)
  })
})
