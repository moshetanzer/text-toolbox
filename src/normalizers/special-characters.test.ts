import { describe, expect, it } from 'vitest'

// Function imports
import {
  removeDiacritics,
  removeHtmlTags,
  removeNewLineCharacters,
  removeNonASCII,
  removeNonDiacritics,
  removePunctuation,
  replaceSmartChars,
  stripEmoji,
} from './special-characters'

describe('text manipulation functions', () => {
  describe('replaceSmartChars', () => {
    it('should replace smart single quotes and apostrophes with normal single quotes', () => {
      const input = '‘Hello’ world!'
      const expected = '\'Hello\' world!'
      expect(replaceSmartChars(input)).toBe(expected)
    })

    it('should replace smart double quotes with normal double quotes', () => {
      const input = '“Hello” world!'
      const expected = '"Hello" world!'
      expect(replaceSmartChars(input)).toBe(expected)
    })

    it('should replace ellipsis with "..."', () => {
      const input = 'Hello… world!'
      const expected = 'Hello... world!'
      expect(replaceSmartChars(input)).toBe(expected)
    })

    it('should replace em dashes with a hyphen', () => {
      const input = 'Hello — world!'
      const expected = 'Hello - world!'
      expect(replaceSmartChars(input)).toBe(expected)
    })

    it('should trim spaces after replacements', () => {
      const input = '  ‘Hello’ world!  '
      const expected = '\'Hello\' world!'
      expect(replaceSmartChars(input)).toBe(expected)
    })
  })

  describe('removeHtmlTags', () => {
    it('should remove HTML tags from the string', () => {
      const input = '<div>Hello</div> world!'
      const expected = 'Hello world!'
      expect(removeHtmlTags(input)).toBe(expected)
    })

    it('should handle empty string correctly', () => {
      const input = ''
      const expected = ''
      expect(removeHtmlTags(input)).toBe(expected)
    })
  })

  describe('removeNewLineCharacters', () => {
    it('should remove new line characters', () => {
      const input = 'Hello\nworld\r!'
      const expected = 'Helloworld!'
      expect(removeNewLineCharacters(input)).toBe(expected)
    })

    it('should handle input with no new line characters', () => {
      const input = 'Hello world!'
      const expected = 'Hello world!'
      expect(removeNewLineCharacters(input)).toBe(expected)
    })
  })

  describe('removePunctuation', () => {
    it('should remove punctuation from the string', () => {
      const input = 'Hello, world! How are you?'
      const expected = 'Hello world How are you'
      expect(removePunctuation(input)).toBe(expected)
    })

    it('should handle input with no punctuation', () => {
      const input = 'Hello world'
      const expected = 'Hello world'
      expect(removePunctuation(input)).toBe(expected)
    })
  })

  describe('removeNonASCII', () => {
    it('should remove non-ASCII characters', () => {
      const input = 'Hello ñ world!'
      const expected = 'Hello  world!'
      expect(removeNonASCII(input)).toBe(expected)
    })

    it('should handle input with no non-ASCII characters', () => {
      const input = 'Hello world'
      const expected = 'Hello world'
      expect(removeNonASCII(input)).toBe(expected)
    })
  })

  describe('stripEmoji', () => {
    it('should remove emojis from the string', () => {
      const input = 'Hello 👋 world!'
      const expected = 'Hello  world!'
      expect(stripEmoji(input)).toBe(expected)
    })

    it('should handle input with no emojis', () => {
      const input = 'Hello world'
      const expected = 'Hello world'
      expect(stripEmoji(input)).toBe(expected)
    })
  })

  describe('removeDiacritics', () => {
    it('should remove diacritical marks', () => {
      expect(removeDiacritics('áéíóú')).toBe('aeiou')
      expect(removeDiacritics('çñ')).toBe('cn')
      expect(removeDiacritics('Crème Brûlée')).toBe('Creme Brulee')
      expect(removeDiacritics('Mötley Crüe')).toBe('Motley Crue')
      expect(removeDiacritics('Māori')).toBe('Maori')
    })
  })

  describe('removeNonDiacritics', () => {
    it('should replace non-diacritical characters with ASCII equivalents', () => {
      expect(removeNonDiacritics('ß')).toBe('ss')
      expect(removeNonDiacritics('æ')).toBe('ae')
      expect(removeNonDiacritics('ø')).toBe('oe')
      expect(removeNonDiacritics('å')).toBe('aa')
      expect(removeNonDiacritics('©')).toBe('c')
      expect(removeNonDiacritics('œ')).toBe('oe')
      expect(removeNonDiacritics('\u00F0')).toBe('d') // Small letter Icelandic eth
      expect(removeNonDiacritics('\u00FE')).toBe('th') // Lower case Icelandic thorn
    })

    it('should leave other characters unchanged', () => {
      expect(removeNonDiacritics('abcABC123')).toBe('abcABC123')
      expect(removeNonDiacritics('hello world')).toBe('hello world')
    })
  })
})
