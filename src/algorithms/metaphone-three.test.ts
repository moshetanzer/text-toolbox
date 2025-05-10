import { describe, expect, it } from 'vitest'
import { metaphone3 } from './metaphone-three'

describe('metaphone3', () => {
  it('should encode simple words correctly', () => {
    expect(metaphone3('smith')).toEqual(['SM0', 'XMT'])
    expect(metaphone3('johnson')).toEqual(['JNSN', 'ANSN'])
    expect(metaphone3('williams')).toEqual(['ALMS', 'FLMS'])
  })

  it('should be case insensitive', () => {
    expect(metaphone3('SMITH')).toEqual(metaphone3('smith'))
    expect(metaphone3('Smith')).toEqual(metaphone3('smith'))
    expect(metaphone3('SMiTh')).toEqual(metaphone3('smith'))
  })

  it('should handle empty strings and non-alphabetic characters', () => {
    expect(metaphone3('')).toEqual(['', undefined])
    expect(metaphone3('123')).toEqual(['', undefined])
    expect(metaphone3('!@#')).toEqual(['', undefined])
  })

  it('should return alternate encodings when applicable', () => {
    // These examples might need adjustment based on actual Metaphone3 behavior
    expect(metaphone3('xavier')).toEqual(['SFR', undefined])
    expect(metaphone3('chromosome')).toEqual(['KRMSM', undefined])
  })

  it('should encode vowels when encodeVowels is true', () => {
    const withoutVowels = metaphone3('anderson')
    const withVowels = metaphone3('anderson', { encodeVowels: true })
    expect(withoutVowels).toEqual(['ANTRSN', undefined])
    expect(withVowels[0].length).toBeGreaterThan(withoutVowels[0].length)
    expect(withVowels).not.toEqual(withoutVowels)
  })

  it('should use exact encoding when encodeExact is true', () => {
    const notExact = metaphone3('williams')
    const exact = metaphone3('williams', { encodeExact: true })
    expect(notExact).not.toEqual(exact)
  })

  it('should apply both options correctly', () => {
    const basic = metaphone3('anderson')
    const withBothOptions = metaphone3('anderson', {
      encodeVowels: true,
      encodeExact: true,
    })

    expect(withBothOptions).not.toEqual(basic)
  })

  // Words with special phonetic features
  it('should handle special phonetic cases', () => {
    // Words with 'ph' (f sound)
    expect(metaphone3('phonetic')).toEqual(['FNTK', undefined])

    // Words with silent letters
    expect(metaphone3('knight')).toEqual(['NT', undefined])

    // Words with 'ch' sounds
    expect(metaphone3('character')).toEqual(['KRKTR', 'XRKTR'])
  })

  // Foreign words or names
  it('should encode foreign names appropriately', () => {
    expect(metaphone3('josé')).toEqual(['JS', undefined])
    expect(metaphone3('schmidt')).toEqual(['XMT', undefined])
    expect(metaphone3('nguyen')).toEqual(['NN', undefined])
  })

  // Complex test cases combining multiple features
  it('should handle complex phonetic combinations', () => {
    expect(metaphone3('worcestershire')).toEqual(['ASTRXR', undefined])
    expect(metaphone3('psychologist')).toEqual(['SKLJST', 'SXLKST'])
    expect(metaphone3('encyclopedia')).toEqual(['ANSKLPT', undefined])
  })

  // Test full config combinations
  it('should handle all config combinations correctly', () => {
    const word = 'philadelphia'

    const noOptions = metaphone3(word)
    const vowelsOnly = metaphone3(word, { encodeVowels: true })
    const exactOnly = metaphone3(word, { encodeExact: true })
    const bothOptions = metaphone3(word, { encodeVowels: true, encodeExact: true })

    // Each configuration should produce different results
    const allResults = [noOptions, vowelsOnly, exactOnly, bothOptions]
    // @ts-expect-error since test
    const uniqueResults = new Set(allResults.map(JSON.stringify))
    expect(uniqueResults.size).toBe(4) // All results should be different
  })

  // Edge cases with punctuation and mixed content
  it('should handle edge cases with mixed content', () => {
    expect(metaphone3('O\'Malley')).toEqual(['AML', undefined])
    expect(metaphone3('Smith-Jones')).toEqual(['SM0JNS', 'XMTJNS'])
    expect(metaphone3('St. Patrick')).toEqual(['STPTRK', undefined])
  })
})
