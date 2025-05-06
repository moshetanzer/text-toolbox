import { describe, expect, it } from 'vitest'
import {
  removeAllSpaces,
  removeDoubleSpaces,
  removeLeadingSpaces,
  removeTrailingSpaces,
  removeWhitespaceAroundPunctuation,
} from './whitespace'

describe('text normalizer functions', () => {
  describe('removeDoubleSpaces', () => {
    it('removes consecutive spaces and trims', () => {
      expect(removeDoubleSpaces('hello   world')).toBe('hello world')
      expect(removeDoubleSpaces('  hello    world  ')).toBe('hello world')
    })

    it('preserves single spaces between words', () => {
      expect(removeDoubleSpaces('a b c')).toBe('a b c')
    })

    it('works with tabs and newlines', () => {
      expect(removeDoubleSpaces('hello\t\t\tworld')).toBe('hello world')
      expect(removeDoubleSpaces('hello\n\nworld')).toBe('hello world')
    })

    it('returns empty string if input is only spaces', () => {
      expect(removeDoubleSpaces('     ')).toBe('')
    })
  })

  describe('removeAllSpaces', () => {
    it('removes all whitespace characters', () => {
      expect(removeAllSpaces('a b\tc\nd')).toBe('abcd')
    })

    it('returns empty string if input is only whitespace', () => {
      expect(removeAllSpaces('   \t\n')).toBe('')
    })

    it('preserves non-whitespace characters exactly', () => {
      expect(removeAllSpaces(' abc-def ')).toBe('abc-def')
    })
  })

  describe('removeLeadingSpaces', () => {
    it('removes spaces at the beginning of each line', () => {
      const input = '   line1\n\t  line2\nline3'
      const expected = 'line1\nline2\nline3'
      expect(removeLeadingSpaces(input)).toBe(expected)
    })

    it('does not affect trailing spaces', () => {
      expect(removeLeadingSpaces('   hello   ')).toBe('hello   ')
    })

    it('handles multiple empty lines', () => {
      expect(removeLeadingSpaces('\n\n   \n  abc')).toBe('\n\n\nabc')
    })
  })

  describe('removeTrailingSpaces', () => {
    it('removes spaces at the end of each line', () => {
      const input = 'line1   \nline2 \t\nline3'
      const expected = 'line1\nline2\nline3'
      expect(removeTrailingSpaces(input)).toBe(expected)
    })

    it('does not affect leading spaces', () => {
      expect(removeTrailingSpaces('   hello   ')).toBe('   hello')
    })

    it('handles multiple lines and blank lines', () => {
      const input = '  abc  \n   \nxyz \n'
      const expected = '  abc\n\nxyz\n'
      expect(removeTrailingSpaces(input)).toBe(expected)
    })
  })

  describe('removeWhitespaceAroundPunctuation', () => {
    it('removes spaces before punctuation and normalizes after', () => {
      const input = 'Hello ,  world ! This is a test .'
      const expected = 'Hello, world! This is a test.'
      expect(removeWhitespaceAroundPunctuation(input)).toBe(expected)
    })

    it('preserves correct spacing after punctuation', () => {
      const input = 'Wait!  Are you sure ?Yes , absolutely.'
      const expected = 'Wait! Are you sure? Yes, absolutely.'
      expect(removeWhitespaceAroundPunctuation(input)).toBe(expected)
    })

    it('works with multiple punctuation marks in sequence', () => {
      const input = 'Wow! ! ! That was awesome, wasn\'t it?'
      const expected = 'Wow!!! That was awesome, wasn\'t it?'
      expect(removeWhitespaceAroundPunctuation(input)).toBe(expected)
    })

    it('does not affect punctuation with no extra spacing', () => {
      const input = 'Hello, world! This is fine.'
      expect(removeWhitespaceAroundPunctuation(input)).toBe(input)
    })
  })
})
