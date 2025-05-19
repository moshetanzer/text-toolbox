import { describe, expect, it } from 'vitest'

import {
  removeCombiningMarks,
  removeControlCharacters,
  removeDiacritics,
  removeHtmlTags,
  removeIllegalCharacters,
  removeModifiers,
  removeNewLineCharacters,
  removeNonASCII,
  removePunctuation,
  replaceSmartTypography,
  stripEmoji,
} from './special-characters'

describe('text manipulation functions', () => {
  describe('replaceSmartTypography', () => {
    it('should replace smart single quotes and apostrophes with normal single quotes', () => {
      const input = '‘Hello’ world!'
      const expected = '\'Hello\' world!'
      expect(replaceSmartTypography(input)).toBe(expected)
    })

    it('should replace smart double quotes with normal double quotes', () => {
      const input = '“Hello” world!'
      const expected = '"Hello" world!'
      expect(replaceSmartTypography(input)).toBe(expected)
    })

    it('should replace ellipsis with "..."', () => {
      const input = 'Hello… world!'
      const expected = 'Hello... world!'
      expect(replaceSmartTypography(input)).toBe(expected)
    })

    it('should replace em dashes with a hyphen', () => {
      const input = 'Hello — world!'
      const expected = 'Hello - world!'
      expect(replaceSmartTypography(input)).toBe(expected)
    })

    it('should trim spaces after replacements', () => {
      const input = '  ‘Hello’ world!  '
      const expected = '\'Hello\' world!'
      expect(replaceSmartTypography(input)).toBe(expected)
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

  describe('removeIllegalCharacters', () => {
    it('should remove control characters and non-printable characters', () => {
      const input = 'Hello\u0000 world\u007F!'
      const expected = 'Hello world!'
      expect(removeIllegalCharacters(input)).toBe(expected)
    })

    it('should remove special Unicode characters like U+FFFD (Replacement Character)', () => {
      const input = 'Hello\uFFFD world!'
      const expected = 'Hello world!'
      expect(removeIllegalCharacters(input)).toBe(expected)
    })

    it('should remove characters from the range U+FFFE and U+FFFF', () => {
      const input = 'Hello\uFFFE world\uFFFF!'
      const expected = 'Hello world!'
      expect(removeIllegalCharacters(input)).toBe(expected)
    })

    it('should not affect normal text', () => {
      const input = 'Hello world!'
      const expected = 'Hello world!'
      expect(removeIllegalCharacters(input)).toBe(expected)
    })
  })

  describe('removeControlCharacters', () => {
    it('should remove ASCII control characters from the text', () => {
      const input = 'Hello\u0001\u0002\u0003 world!'
      const expected = 'Hello world!'
      expect(removeControlCharacters(input)).toBe(expected)
    })

    it('should handle text with only control characters', () => {
      const input = '\u0001\u0002\u0003'
      const expected = ''
      expect(removeControlCharacters(input)).toBe(expected)
    })

    it('should not alter normal text', () => {
      const input = 'Hello world!'
      const expected = 'Hello world!'
      expect(removeControlCharacters(input)).toBe(expected)
    })

    it('should remove newline and tab characters as well', () => {
      const input = 'Hello\nworld\t!'
      const expected = 'Helloworld!'
      expect(removeControlCharacters(input)).toBe(expected)
    })
  })
  describe('removeModifiers', () => {
    it('should remove modifier letters and symbols', () => {
      const input = 'aʰbʱc˩dˆe' // ʰ, ʱ, ˩ are Lm; ˆ is Sk
      const expected = 'abcde'
      expect(removeModifiers(input)).toBe(expected)
    })

    it('should handle text without modifiers', () => {
      const input = 'Hello world!'
      expect(removeModifiers(input)).toBe('Hello world!')
    })

    it('should trim surrounding whitespace after removal', () => {
      const input = '  ʰHello˩  '
      const expected = 'Hello'
      expect(removeModifiers(input)).toBe(expected)
    })
  })

  describe('removeNonSpacingCombiningMarks', () => {
    it('should remove non-spacing combining marks like accents and enclosing symbols', () => {
      const base = 'a'
      const combining = '\u0301\u0300\u20DD\u20E3' // acute, grave, enclosing circle, keycap
      const input = `${base}${combining}b`
      const expected = 'ab'
      expect(removeCombiningMarks(input)).toBe(expected)
    })

    it('should not remove visible letters or spacing characters', () => {
      const input = 'Hello world!'
      expect(removeCombiningMarks(input)).toBe('Hello world!')
    })

    it('should trim the result', () => {
      const input = ' \u0301Hello\u0301 '
      const expected = 'Hello'
      expect(removeCombiningMarks(input)).toBe(expected)
    })
  })
})
