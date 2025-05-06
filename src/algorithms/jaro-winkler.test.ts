import { describe, expect, it } from 'vitest'
import { jaroWinkler } from './jaro-winkler'

describe('jaroWinkler', () => {
  it('should return 1 for identical strings', () => {
    expect(jaroWinkler('hello', 'hello')).toBe(1)
    expect(jaroWinkler('test', 'test')).toBe(1)
    expect(jaroWinkler('', '')).toBe(1)
  })

  it('should return 0 for completely different strings', () => {
    expect(jaroWinkler('abc', 'xyz')).toBeCloseTo(0, 2)
    expect(jaroWinkler('hello', '12345')).toBeCloseTo(0, 2)
  })

  it('should handle empty strings correctly', () => {
    expect(jaroWinkler('', '')).toBe(1)
    expect(jaroWinkler('abc', '')).toBe(0)
    expect(jaroWinkler('', 'xyz')).toBe(0)
  })

  it('should handle case sensitivity correctly', () => {
    expect(jaroWinkler('hello', 'Hello')).toBeLessThan(1)
    expect(jaroWinkler('hello', 'Hello', { caseSensitive: true })).toBeLessThan(1)
    expect(jaroWinkler('hello', 'Hello', { caseSensitive: false })).toBe(1)
  })

  it('should give higher similarity for strings matching from the beginning', () => {
    // These should have the same Jaro distance but different Jaro-Winkler
    const s1 = 'MARTHA'
    const s2 = 'MARHTA'
    const s3 = 'ARHMAT'

    // s1 and s2 have common prefix
    const score1 = jaroWinkler(s1, s2)
    // s1 and s3 don't have common prefix
    const score2 = jaroWinkler(s1, s3)

    expect(score1).toBeGreaterThan(score2)
  })

  it('should calculate correct values for classic examples', () => {
    // Classic examples with known Jaro-Winkler values
    expect(jaroWinkler('MARTHA', 'MARHTA')).toBeCloseTo(0.961, 3)
    expect(jaroWinkler('DIXON', 'DICKSONX')).toBeCloseTo(0.813, 3)
    expect(jaroWinkler('JELLYFISH', 'SMELLYFISH')).toBeCloseTo(0.896, 3)
  })

  it('should handle transpositions correctly', () => {
    // Test with transpositions
    expect(jaroWinkler('abc', 'acb')).toBeGreaterThan(0.5)
    expect(jaroWinkler('information', 'infmoratnio')).toBeGreaterThan(0.7)
  })

  it('should handle longer strings', () => {
    const s1 = 'The quick brown fox jumps over the lazy dog'
    const s2 = 'The quick brown fox jumped over the lazy dog'
    expect(jaroWinkler(s1, s2)).toBeGreaterThan(0.94)
  })

  it('should handle special characters and numbers', () => {
    expect(jaroWinkler('user@example.com', 'user@sample.com')).toBeGreaterThan(0.8)
    expect(jaroWinkler('123-456-7890', '123-456-7891')).toBeGreaterThan(0.9)
  })
})
