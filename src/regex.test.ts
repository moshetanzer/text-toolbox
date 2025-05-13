import { describe, expect, it } from 'vitest'
import { DIACRITICS, PUNCTUATION, WHITESPACE } from './regex'

describe('regular Expression Tests', () => {
  it('wHITESPACE should match all types of whitespace characters', () => {
    expect('Hello World'.match(WHITESPACE)).toEqual([' '])
    expect('Line1\nLine2'.match(WHITESPACE)).toEqual(['\n'])
    expect('Tab\tSpace'.match(WHITESPACE)).toEqual(['\t'])
    expect('Multiple    spaces'.match(WHITESPACE)).toEqual(['    '])
  })

  it('pUNCTUATION should match all punctuation characters', () => {
    expect('Hello, world!'.match(PUNCTUATION)).toEqual([',', '!'])
    expect('End. Start?'.match(PUNCTUATION)).toEqual(['.', '?'])
    expect('Mixed...and...more!!!'.match(PUNCTUATION)).toEqual(['...', '...', '!!!'])
  })

  it('dIACRITICS should match combining diacritic marks', () => {
    expect('café'.normalize('NFD').match(DIACRITICS)).toEqual(['́']) // é → e + ´
    expect('mañana'.normalize('NFD').match(DIACRITICS)).toEqual(['̃']) // ñ → n + ~
    expect('voilà'.normalize('NFD').match(DIACRITICS)).toEqual(['̀']) // à → a + `
    expect('hôpital'.normalize('NFD').match(DIACRITICS)).toEqual(['̂']) // ô → o + ^
  })

  it('wHITESPACE should not match non-whitespace characters', () => {
    expect('HelloWorld'.match(WHITESPACE)).toBeNull()
  })

  it('pUNCTUATION should not match letters or numbers', () => {
    expect('Hello123'.match(PUNCTUATION)).toBeNull()
  })

  it('dIACRITICS should not match regular characters without accents', () => {
    expect('Hello World'.match(DIACRITICS)).toBeNull()
  })
})
