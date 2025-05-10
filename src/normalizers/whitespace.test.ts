import { describe, expect, it } from 'vitest'
import {
  ensureSpaceAfterPunctuation,
  normalizePunctuationSpacing,
  normalizeWhitespace,
  removeAllWhitespace,
  removeExtraSpaces,
  removeLeadingWhitespace,
  removeTrailingWhitespace,
  removeWhitespaceBeforePunctuation,
} from './whitespace'

describe('whitespace Utils', () => {
  describe('removeAllWhitespace', () => {
    it('should remove all whitespace characters', () => {
      expect(removeAllWhitespace(' Hello   World ')).toBe('HelloWorld')
      expect(removeAllWhitespace('\tHello \n World')).toBe('HelloWorld')
      expect(removeAllWhitespace('')).toBe('')
      expect(removeAllWhitespace(' ')).toBe('')
    })
  })

  describe('removeLeadingWhitespace', () => {
    it('should remove leading whitespace from each line', () => {
      const input = '   Hello\n  World\n   '
      const expected = 'Hello\nWorld\n'
      expect(removeLeadingWhitespace(input)).toBe(expected)
    })
  })

  describe('removeTrailingWhitespace', () => {
    it('should remove trailing whitespace from each line', () => {
      const input = 'Hello   \nWorld   \n'
      const expected = 'Hello\nWorld\n'
      expect(removeTrailingWhitespace(input)).toBe(expected)
    })
  })

  describe('normalizeWhitespace', () => {
    it('should replace multiple whitespaces with a single space', () => {
      expect(normalizeWhitespace(' Hello   World ')).toBe('Hello World')
      expect(normalizeWhitespace('  Multiple   spaces here ')).toBe('Multiple spaces here')
    })
  })

  describe('removeExtraSpaces', () => {
    it('should remove extra spaces and trim the text', () => {
      expect(removeExtraSpaces('  Hello   World  ')).toBe('Hello World')
      expect(removeExtraSpaces('Multiple    spaces   here')).toBe('Multiple spaces here')
    })
  })

  describe('removeWhitespaceBeforePunctuation', () => {
    it('should remove whitespace before punctuation', () => {
      expect(removeWhitespaceBeforePunctuation('Hello , World !')).toBe('Hello, World!')
      expect(removeWhitespaceBeforePunctuation('Test .')).toBe('Test.')
    })
  })

  describe('ensureSpaceAfterPunctuation', () => {
    it('should ensure there is a space after punctuation', () => {
      expect(ensureSpaceAfterPunctuation('Hello,World!')).toBe('Hello, World!')
      expect(ensureSpaceAfterPunctuation('Test.This')).toBe('Test. This')
    })
  })

  describe('normalizePunctuationSpacing', () => {
    it('should normalize spaces before and after punctuation', () => {
      expect(normalizePunctuationSpacing('Hello ,World!', { removeExtraSpacesAfterPunctuation: true })).toBe('Hello, World!')
      expect(normalizePunctuationSpacing('Test .This', { removeExtraSpacesAfterPunctuation: true })).toBe('Test. This')
      expect(normalizePunctuationSpacing('Hi ,  how are you ?', { removeExtraSpacesAfterPunctuation: true })).toBe('Hi, how are you?')
    })

    it('should work with default options when no config is passed', () => {
      expect(normalizePunctuationSpacing('Hello ,World!')).toBe('Hello, World!')
    })
  })
})
