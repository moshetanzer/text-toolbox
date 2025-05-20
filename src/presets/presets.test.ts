import { describe, expect, it } from 'vitest'
import { normalizeName } from './presets'

describe('normalizeName', () => {
  it('converts name to lowercase, trims, and applies title case', () => {
    expect(normalizeName('  JOHN DOE  ')).toBe('John Doe')
  })

  it('handles multiple spaces between names correctly', () => {
    expect(normalizeName('  MARY   SMITH  ')).toBe('Mary Smith')
  })

  it('works with lowercase names', () => {
    expect(normalizeName('jane doe')).toBe('Jane Doe')
  })

  it('works with mixed-case names', () => {
    expect(normalizeName('jOhN dOe')).toBe('John Doe')
  })

  it('handles names with more than two words', () => {
    expect(normalizeName('  anna maria johnson  ')).toBe('Anna Maria Johnson')
  })

  it('preserves hyphenated names', () => {
    expect(normalizeName('  jean-luc picard ')).toBe('Jean-Luc Picard')
  })

  it('preserves apostrophes in names', () => {
    expect(normalizeName("o'neill")).toBe("O'Neill")
  })

  it('handles names with accents and diacritics', () => {
    expect(normalizeName('jósé álvarez')).toBe('Jose Alvarez')
    expect(normalizeName('ÉLODIE DUPONT')).toBe('Elodie Dupont')
  })

  it('handles single-word names', () => {
    expect(normalizeName('  PRINCE  ')).toBe('Prince')
  })

  it('trims leading and trailing whitespace only', () => {
    expect(normalizeName('   alice   ')).toBe('Alice')
  })

  it('removes extra inner whitespace and collapses to single spaces', () => {
    expect(normalizeName('  bob    dylan  ')).toBe('Bob Dylan')
  })

  it('returns an empty string for input that is only spaces', () => {
    expect(normalizeName('     ')).toBe('')
  })

  it('returns an empty string for empty input', () => {
    expect(normalizeName('')).toBe('')
  })

  it('returns an empty string for null input', () => {
    expect(normalizeName(null as unknown as string)).toBe('')
  })

  it('returns an empty string for undefined input', () => {
    expect(normalizeName(undefined as unknown as string)).toBe('')
  })

  it('ignores numeric and special characters if present', () => {
    expect(normalizeName('1234')).toBe('1234') // depends on how normalizeName handles this
    expect(normalizeName('john123 doe!')).toBe('John123 Doe!')
  })
})
