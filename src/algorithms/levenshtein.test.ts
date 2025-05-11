import { describe, expect, it } from 'vitest'
import { levenshtein } from './levenshtein'

describe('levenshtein', () => {
  it('should return 0 for identical strings', () => {
    expect(levenshtein('hello', 'hello')).toBe(0)
  })

  it('should return the correct distance for simple cases', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3)
    expect(levenshtein('sunday', 'saturday')).toBe(3)
  })

  it('should handle empty strings', () => {
    expect(levenshtein('', '')).toBe(0)
    expect(levenshtein('abc', '')).toBe(3)
    expect(levenshtein('', 'xyz')).toBe(3)
  })

  it('should handle case sensitivity correctly', () => {
    expect(levenshtein('hello', 'Hello')).toBe(1)
    expect(levenshtein('WORLD', 'world')).toBe(5)
  })

  it('should handle special characters and numbers', () => {
    expect(levenshtein('123', '1234')).toBe(1)
    expect(levenshtein('hello!', 'hello?')).toBe(1)
    expect(levenshtein('user@example.com', 'user@sample.com')).toBe(2)
  })

  it('should handle longer strings', () => {
    const str1 = 'the quick brown fox jumps over the lazy dog'
    const str2 = 'a quick brown fox jumped over a lazy dog'
    expect(levenshtein(str1, str2)).toBe(8)
  })
})
