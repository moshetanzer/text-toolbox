import { describe, expect, it } from 'vitest'
import { metaphoneThree } from './metaphone-three'

describe('metaphoneThree', () => {
  it('should encode simple words correctly', () => {
    expect(metaphoneThree('smith')).toEqual(['SM0', 'XMT'])
    expect(metaphoneThree('johnson')).toEqual(['JNSN', 'ANSN'])
    expect(metaphoneThree('williams')).toEqual(['ALMS', 'FLMS'])
  })

  it('should be case insensitive', () => {
    expect(metaphoneThree('SMITH')).toEqual(metaphoneThree('smith'))
    expect(metaphoneThree('Smith')).toEqual(metaphoneThree('smith'))
    expect(metaphoneThree('SMiTh')).toEqual(metaphoneThree('smith'))
  })

  it('should handle empty strings and non-alphabetic characters', () => {
    expect(metaphoneThree('')).toEqual(['', undefined])
    expect(metaphoneThree('123')).toEqual(['', undefined])
    expect(metaphoneThree('!@#')).toEqual(['', undefined])
  })

  it('should return alternate encodings when applicable', () => {
    // These examples might need adjustment based on actual metaphoneThree behavior
    expect(metaphoneThree('xavier')).toEqual(['SFR', undefined])
    expect(metaphoneThree('chromosome')).toEqual(['KRMSM', undefined])
  })

  it('should encode vowels when encodeVowels is true', () => {
    const withoutVowels = metaphoneThree('anderson')
    const withVowels = metaphoneThree('anderson', { encodeVowels: true })
    expect(withoutVowels).toEqual(['ANTRSN', undefined])
    expect(withVowels[0].length).toBeGreaterThan(withoutVowels[0].length)
    expect(withVowels).not.toEqual(withoutVowels)
  })

  it('should use exact encoding when encodeExact is true', () => {
    const notExact = metaphoneThree('williams')
    const exact = metaphoneThree('williams', { encodeExact: true })
    expect(notExact).not.toEqual(exact)
  })

  it('should apply both options correctly', () => {
    const basic = metaphoneThree('anderson')
    const withBothOptions = metaphoneThree('anderson', {
      encodeVowels: true,
      encodeExact: true,
    })

    expect(withBothOptions).not.toEqual(basic)
  })

  // Words with special phonetic features
  it('should handle special phonetic cases', () => {
    // Words with 'ph' (f sound)
    expect(metaphoneThree('phonetic')).toEqual(['FNTK', undefined])

    // Words with silent letters
    expect(metaphoneThree('knight')).toEqual(['NT', undefined])

    // Words with 'ch' sounds
    expect(metaphoneThree('character')).toEqual(['KRKTR', 'XRKTR'])
  })

  // Foreign words or names
  it('should encode foreign names appropriately', () => {
    expect(metaphoneThree('josé')).toEqual(['JS', undefined])
    expect(metaphoneThree('schmidt')).toEqual(['XMT', undefined])
    expect(metaphoneThree('nguyen')).toEqual(['NN', undefined])
  })

  // Complex test cases combining multiple features
  it('should handle complex phonetic combinations', () => {
    expect(metaphoneThree('worcestershire')).toEqual(['ASTRXR', undefined])
    expect(metaphoneThree('psychologist')).toEqual(['SKLJST', 'SXLKST'])
    expect(metaphoneThree('encyclopedia')).toEqual(['ANSKLPT', undefined])
  })

  // Test full config combinations
  it('should handle all config combinations correctly', () => {
    const word = 'philadelphia'

    const noOptions = metaphoneThree(word)
    const vowelsOnly = metaphoneThree(word, { encodeVowels: true })
    const exactOnly = metaphoneThree(word, { encodeExact: true })
    const bothOptions = metaphoneThree(word, { encodeVowels: true, encodeExact: true })

    // Each configuration should produce different results
    const allResults = [noOptions, vowelsOnly, exactOnly, bothOptions]
    // @ts-expect-error since test
    const uniqueResults = new Set(allResults.map(JSON.stringify))
    expect(uniqueResults.size).toBe(4) // All results should be different
  })

  // Edge cases with punctuation and mixed content
  it('should handle edge cases with mixed content', () => {
    expect(metaphoneThree('O\'Malley')).toEqual(['AML', undefined])
    expect(metaphoneThree('Smith-Jones')).toEqual(['SM0JNS', 'XMTJNS'])
    expect(metaphoneThree('St. Patrick')).toEqual(['STPTRK', undefined])
  })
})
