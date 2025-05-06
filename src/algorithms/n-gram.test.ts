import { describe, expect, it } from 'vitest'
import { bigram, nGram, trigram } from './n-gram'

describe('nGram', () => {
  describe('factory function', () => {
    it('should throw when given invalid arguments', () => {
      expect(() => nGram(Number.NaN)).toThrow('`NaN` is not a valid argument for `n-gram`')
      expect(() => nGram(0)).toThrow('`0` is not a valid argument for `n-gram`')
      expect(() => nGram(-1)).toThrow('`-1` is not a valid argument for `n-gram`')
      expect(() => nGram(Number.POSITIVE_INFINITY)).toThrow('`Infinity` is not a valid argument for `n-gram`')
      // @ts-expect-error: Intentionally passing wrong type
      expect(() => nGram('not a number')).toThrow('`NaN` is not a valid argument for `n-gram`')
    })

    it('should return a function', () => {
      expect(typeof nGram(1)).toBe('function')
      expect(typeof nGram(2)).toBe('function')
      expect(typeof nGram(3)).toBe('function')
    })
  })

  describe('generated n-gram function', () => {
    it('should handle empty values', () => {
      expect(nGram(1)(null)).toEqual([])
      expect(nGram(1)(undefined)).toEqual([])
      expect(nGram(1)('')).toEqual([])
      expect(nGram(2)('')).toEqual([])
      expect(nGram(3)('')).toEqual([])
    })

    it('should handle values shorter than n', () => {
      expect(nGram(2)('a')).toEqual([])
      expect(nGram(3)('ab')).toEqual([])
      expect(nGram(4)('abc')).toEqual([])
    })

    it('should handle string values', () => {
      expect(nGram(1)('a')).toEqual(['a'])
      expect(nGram(1)('ab')).toEqual(['a', 'b'])
      expect(nGram(2)('ab')).toEqual(['ab'])
      expect(nGram(2)('abc')).toEqual(['ab', 'bc'])
      expect(nGram(3)('abc')).toEqual(['abc'])
      expect(nGram(3)('abcd')).toEqual(['abc', 'bcd'])
    })

    it('should handle array values', () => {
      expect(nGram(1)([1, 2, 3])).toEqual([[1], [2], [3]])
      expect(nGram(2)([1, 2, 3])).toEqual([[1, 2], [2, 3]])
      expect(nGram(3)([1, 2, 3, 4])).toEqual([[1, 2, 3], [2, 3, 4]])
    })

    it('should handle any value by coercing to string', () => {
      expect(nGram(2)(123)).toEqual(['12', '23'])
      expect(nGram(2)(true)).toEqual(['tr', 'ru', 'ue'])
    })
  })

  describe('exported bigram and trigram', () => {
    it('should be functions that make bigrams and trigrams', () => {
      expect(bigram('hello')).toEqual(['he', 'el', 'll', 'lo'])
      expect(trigram('hello')).toEqual(['hel', 'ell', 'llo'])
    })
  })
})
