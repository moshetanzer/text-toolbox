import { describe, expect, it } from 'vitest'

// Function imports
import {
  removeHtmlTags,
  removeNewLineCharacters,
  removeNonASCII,
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
})
