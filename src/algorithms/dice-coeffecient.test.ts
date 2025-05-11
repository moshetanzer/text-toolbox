import { describe, expect, it } from 'vitest'
import { diceCoefficient } from './dice-coeffecient'

describe('diceCoefficient', () => {
  it('should return 1 for identical strings', () => {
    expect(diceCoefficient('hello', 'hello')).toBe(1)
  })

  it('should return 0 for completely different strings', () => {
    expect(diceCoefficient('abc', 'xyz')).toBe(0)
  })

  it('should be case insensitive by default', () => {
    expect(diceCoefficient('Hello', 'hello')).toBe(1)
  })

  it('should handle short strings (length < 2)', () => {
    expect(diceCoefficient('a', 'a')).toBe(0)
    expect(diceCoefficient('a', 'b')).toBe(0)
    expect(diceCoefficient('', '')).toBe(0)
    expect(diceCoefficient('', 'a')).toBe(0)
  })

  it('should return values between 0 and 1', () => {
    const sim = diceCoefficient('night', 'nacht')
    expect(sim).toBeGreaterThanOrEqual(0)
    expect(sim).toBeLessThanOrEqual(1)
  })

  it('should compute expected similarity for known examples', () => {
    const result = diceCoefficient('night', 'nacht')
    // Only "ht" is common: 1 match -> Dice = 2 * 1 / (4 + 4) = 0.25
    expect(result).toBeCloseTo(0.25, 2)
  })

  it('should handle whitespace differences correctly', () => {
    expect(diceCoefficient('hello world', 'helloworld')).toBeCloseTo(0.842, 2)
    expect(diceCoefficient('hello world', 'world hello')).toBeCloseTo(0.8, 2)
  })

  it('should handle special characters correctly', () => {
    expect(diceCoefficient('hello!', 'hello')).toBeCloseTo(0.888, 2)
    expect(diceCoefficient('test123', 'test')).toBeCloseTo(0.67, 2)
  })

  it('should handle large inputs efficiently', () => {
    const longStr1 = 'a'.repeat(1000)
    const longStr2 = 'a'.repeat(1000)
    expect(diceCoefficient(longStr1, longStr2)).toBe(1)
  })

  it('should handle null and undefined gracefully', () => {
    // @ts-expect-error testing
    expect(diceCoefficient(null, null)).toBe(0)
    // @ts-expect-error testing
    expect(diceCoefficient(undefined, undefined)).toBe(0)
    // @ts-expect-error testing
    expect(diceCoefficient(null, 'hello')).toBe(0)
    // @ts-expect-error testing
    expect(diceCoefficient('hello', undefined)).toBe(0)
  })
})
