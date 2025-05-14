import { describe, expect, it } from 'vitest'
import { fingerprint } from './fingerprint'

describe('fingerprinter', () => {
  describe('fingerprint', () => {
    it('should create fingerprint keys by normalizing, sorting and uniquifying words', () => {
      // Basic functionality
      expect(fingerprint('hello world')).toBe('hello world')
      expect(fingerprint('world hello')).toBe('hello world')
      expect(fingerprint('hello hello world')).toBe('hello world')
      expect(fingerprint('Hello World')).toBe('hello world')

      // With punctuation
      expect(fingerprint('hello, world!')).toBe('hello world')
      expect(fingerprint('hello-world')).toBe('helloworld')

      // With extra whitespace
      expect(fingerprint('  hello   world  ')).toBe('hello world')
      expect(fingerprint('\thello\nworld\r')).toBe('hello world')

      // With diacritics
      expect(fingerprint('héllö wørld')).toBe('hello woerld')

      // With special characters
      expect(fingerprint('cœur et âme')).toBe('ame coeur et')

      // Complex examples
      expect(fingerprint('The Quick, Brown Fox! Jumps over the lazy dog.')).toBe(
        'brown dog fox jumps lazy over quick the',
      )

      // With duplicates in different forms
      expect(fingerprint('Hello hello HELLO world World WORLD')).toBe('hello world')

      // Empty and edge cases
      expect(fingerprint('')).toBe('')
      expect(fingerprint('   ')).toBe('')
      expect(fingerprint('.,;:!?')).toBe('')
    })

    it('should throw an error when given null or additional parameters', () => {
      expect(() => fingerprint(null as any)).toThrow()
      expect(() => fingerprint('test', 'extra')).toThrow()
    })
  })

  describe('general test', () => {
    it('should handle strings with multiple special characters', () => {
      const input = 'Thé Quïçk, Brôwn Fox! Jumps över the lâzy dög.'
      expect(fingerprint(input)).toBe('brown dog fox jumps lazy over quick the')
    })

    it('should normalize whitespace correctly', () => {
      const input = 'The\tQuick\nBrown\rFox'
      expect(fingerprint(input)).toBe('brown fox quick the')
    })

    it('should handle control characters', () => {
      const input = 'Hello\x00World\x1FTest'
      expect(fingerprint(input)).toBe('hello test world')
    })
  })
})
