import { describe, expect, it } from 'vitest'
import { jaroWinkler } from './jaro-winkler'

describe('jaroWinkler.distance', () => {
  it('should return 1 for identical strings', () => {
    expect(jaroWinkler.distance('hello', 'hello')).toBe(1)
    expect(jaroWinkler.distance('test', 'test')).toBe(1)
    expect(jaroWinkler.distance('', '')).toBe(1)
  })

  it('should return 0 for completely different strings', () => {
    expect(jaroWinkler.distance('abc', 'xyz')).toBeCloseTo(0, 2)
    expect(jaroWinkler.distance('hello', '12345')).toBeCloseTo(0, 2)
  })

  it('should handle empty strings correctly', () => {
    expect(jaroWinkler.distance('', '')).toBe(1)
    expect(jaroWinkler.distance('abc', '')).toBe(0)
    expect(jaroWinkler.distance('', 'xyz')).toBe(0)
  })

  it('should handle case sensitivity correctly', () => {
    expect(jaroWinkler.distance('hello', 'Hello')).toBeLessThan(1)
    expect(jaroWinkler.distance('hello', 'Hello', { caseSensitive: true })).toBeLessThan(1)
    expect(jaroWinkler.distance('hello', 'Hello', { caseSensitive: false })).toBe(1)
  })

  it('should give higher similarity for strings matching from the beginning', () => {
    // These should have the same Jaro distance but different Jaro-Winkler
    const s1 = 'MARTHA'
    const s2 = 'MARHTA'
    const s3 = 'ARHMAT'

    // s1 and s2 have common prefix
    const score1 = jaroWinkler.distance(s1, s2)
    // s1 and s3 don't have common prefix
    const score2 = jaroWinkler.distance(s1, s3)

    expect(score1).toBeGreaterThan(score2)
  })

  it('should calculate correct values for classic examples', () => {
    // Classic examples with known Jaro-Winkler values
    expect(jaroWinkler.distance('MARTHA', 'MARHTA')).toBeCloseTo(0.961, 3)
    expect(jaroWinkler.distance('DIXON', 'DICKSONX')).toBeCloseTo(0.813, 3)
    expect(jaroWinkler.distance('JELLYFISH', 'SMELLYFISH')).toBeCloseTo(0.896, 3)
  })

  it('should handle transpositions correctly', () => {
    // Test with transpositions
    expect(jaroWinkler.distance('abc', 'acb')).toBeGreaterThan(0.5)
    expect(jaroWinkler.distance('information', 'infmoratnio')).toBeGreaterThan(0.7)
  })

  it('should handle longer strings', () => {
    const s1 = 'The quick brown fox jumps over the lazy dog'
    const s2 = 'The quick brown fox jumped over the lazy dog'
    expect(jaroWinkler.distance(s1, s2)).toBeGreaterThan(0.94)
  })

  it('should handle special characters and numbers', () => {
    expect(jaroWinkler.distance('user@example.com', 'user@sample.com')).toBeGreaterThan(0.8)
    expect(jaroWinkler.distance('123-456-7890', '123-456-7891')).toBeGreaterThan(0.9)
  })
})
