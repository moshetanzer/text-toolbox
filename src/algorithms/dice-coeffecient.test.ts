import { describe, expect, it } from 'vitest'
import { diceCoefficient } from './dice-coeffecient'

describe('diceCoefficient', () => {
  it('should return 1 for identical strings', () => {
    expect(diceCoefficient.similarity('hello', 'hello')).toBe(1)
    expect(diceCoefficient.distance('hello', 'hello')).toBe(0)
  })

  it('should return 0 for completely different strings', () => {
    expect(diceCoefficient.similarity('abc', 'xyz')).toBe(0)
    expect(diceCoefficient.distance('abc', 'xyz')).toBe(1)
  })

  it('should be case insensitive by default', () => {
    expect(diceCoefficient.similarity('Hello', 'hello')).toBe(1)
  })

  it('should respect caseSensitive option', () => {
    const options = { caseSensitive: true }
    expect(diceCoefficient.similarity('Hello', 'hello', options)).toBeLessThan(1)
  })

  it('should handle short strings (length < 2)', () => {
    expect(diceCoefficient.similarity('a', 'a')).toBe(0)
    expect(diceCoefficient.similarity('a', 'b')).toBe(0)
    expect(diceCoefficient.similarity('', '')).toBe(0)
  })

  it('should return values between 0 and 1', () => {
    const sim = diceCoefficient.similarity('night', 'nacht')
    expect(sim).toBeGreaterThanOrEqual(0)
    expect(sim).toBeLessThanOrEqual(1)
  })

  it('should compute expected known similarity value', () => {
    // Example from literature: "night" and "nacht" have 2 common bigrams (ni, ig, gh, ht vs na, ac, ch, ht)
    // Only "ht" is common -> 1 match -> Dice = 2*1 / (4 + 4) = 0.25
    const result = diceCoefficient.compare('night', 'nacht')
    expect(result.distance).toBeCloseTo(0.75, 2)
    expect(result.similarity).toBeCloseTo(0.25, 2)
  })
})
