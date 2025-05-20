import { describe, expect, it } from 'vitest'
import { removeDuplicateWords, removeTitlePrefix, removeTitleSuffix } from './words'

describe('removeDuplicateWords', () => {
  it('removes consecutive duplicate words regardless of case', () => {
    expect(removeDuplicateWords('Hello hello world')).toBe('Hello world')
  })

  it('does not remove non-consecutive duplicates', () => {
    expect(removeDuplicateWords('hello world hello')).toBe('hello world hello')
  })

  it('handles multiple spaces correctly', () => {
    expect(removeDuplicateWords('hello     hello world')).toBe('hello world')
  })

  it('returns empty string when input is empty', () => {
    expect(removeDuplicateWords('')).toBe('')
  })

  it('preserves single-word input', () => {
    expect(removeDuplicateWords('Hello')).toBe('Hello')
  })
})

describe('removeTitlePrefix', () => {
  it('removes known title prefixes with optional periods', () => {
    expect(removeTitlePrefix('Dr. John Smith')).toBe('John Smith')
    expect(removeTitlePrefix('Prof John Smith')).toBe('John Smith')
  })

  it('is case-insensitive', () => {
    expect(removeTitlePrefix('mr. John')).toBe('John')
  })

  it('preserves leading spaces', () => {
    expect(removeTitlePrefix('   Dr. John')).toBe('   John')
  })

  it('returns original text if no title prefix matches', () => {
    expect(removeTitlePrefix('Engineer John')).toBe('Engineer John')
  })

  it('returns empty string if input is empty', () => {
    expect(removeTitlePrefix('')).toBe('')
  })
})

describe('removeTitleSuffix', () => {
  it('removes known title suffixes with optional periods', () => {
    expect(removeTitleSuffix('John Smith Jr.')).toBe('John Smith')
    expect(removeTitleSuffix('John Smith PhD')).toBe('John Smith')
  })

  it('is case-insensitive', () => {
    expect(removeTitleSuffix('John Smith md')).toBe('John Smith')
  })

  it('returns original text if no title suffix matches', () => {
    expect(removeTitleSuffix('John Smith CEO')).toBe('John Smith CEO')
  })

  it('handles trailing whitespace properly', () => {
    expect(removeTitleSuffix('John Smith Jr.   ')).toBe('John Smith')
  })

  it('returns empty string if input is empty', () => {
    expect(removeTitleSuffix('')).toBe('')
  })
})
