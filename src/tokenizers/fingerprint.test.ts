import { describe, expect, it } from 'vitest'
import { fingerprintKey } from './fingerprint'

describe('fingerprintKeyer', () => {
  describe('fingerprintKey', () => {
    it('should create fingerprint keys by normalizing, sorting and uniquifying words', () => {
      // Basic functionality
      expect(fingerprintKey('hello world')).toBe('hello world')
      expect(fingerprintKey('world hello')).toBe('hello world')
      expect(fingerprintKey('hello hello world')).toBe('hello world')
      expect(fingerprintKey('Hello World')).toBe('hello world')

      // With punctuation
      expect(fingerprintKey('hello, world!')).toBe('hello world')
      expect(fingerprintKey('hello-world')).toBe('helloworld')

      // With extra whitespace
      expect(fingerprintKey('  hello   world  ')).toBe('hello world')
      expect(fingerprintKey('\thello\nworld\r')).toBe('hello world')

      // With diacritics
      expect(fingerprintKey('héllö wørld')).toBe('hello woerld')

      // With special characters
      expect(fingerprintKey('cœur et âme')).toBe('ame coeur et')

      // Complex examples
      expect(fingerprintKey('The Quick, Brown Fox! Jumps over the lazy dog.')).toBe(
        'brown dog fox jumps lazy over quick the',
      )

      // With duplicates in different forms
      expect(fingerprintKey('Hello hello HELLO world World WORLD')).toBe('hello world')

      // Empty and edge cases
      expect(fingerprintKey('')).toBe('')
      expect(fingerprintKey('   ')).toBe('')
      expect(fingerprintKey('.,;:!?')).toBe('')
    })

    it('should throw an error when given null or additional parameters', () => {
      expect(() => fingerprintKey(null as any)).toThrow()
      expect(() => fingerprintKey('test', 'extra')).toThrow()
    })
  })

  // Test specific edge cases from the Java implementation
  describe('compatibility with Java implementation', () => {
    it('should handle strings with multiple special characters', () => {
      const input = 'Thé Quïçk, Brôwn Fox! Jumps över the lâzy dög.'
      expect(fingerprintKey(input)).toBe('brown dog fox jumps lazy over quick the')
    })

    it('should normalize whitespace correctly', () => {
      const input = 'The\tQuick\nBrown\rFox'
      expect(fingerprintKey(input)).toBe('brown fox quick the')
    })

    it('should handle control characters', () => {
      const input = 'Hello\x00World\x1FTest'
      expect(fingerprintKey(input)).toBe('hello test world')
    })
  })
})
