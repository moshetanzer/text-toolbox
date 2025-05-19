import { describe, expect, it, vi } from 'vitest'
import { titleCase } from '../normalizers/string-case'
import { normalizePunctuationSpacing } from '../normalizers/whitespace'
import {
  normalizeDate,
  normalizeEmail,
  normalizeName,
  normalizeUrl,
} from './presets'

describe('normalizeDate', () => {
  it('trims whitespace from date strings', () => {
    expect(normalizeDate('  2023-05-19  ')).toBe('2023-05-19')
    // eslint-disable-next-line style/no-tabs
    expect(normalizeDate('	2023-05-19')).toBe('2023-05-19')
    expect(normalizeDate('2023-05-19')).toBe('2023-05-19')
  })

  it('should format dates consistently', () => {
    expect(normalizeDate('05/19/2023')).toBe('2023-05-19')
  })

  it('should handle different date formats', () => {
    expect(normalizeDate('19 May 2023')).toBe('2023-05-19')
  })

  it('should validate date strings', () => {
    expect(() => normalizeDate('invalid-date')).toThrow('Invalid date format')
  })
})

describe('normalizeEmail', () => {
  it('converts email to lowercase', () => {
    expect(normalizeEmail('User@Example.COM')).toBe('user@example.com')
    expect(normalizeEmail('EMAIL@TEST.org')).toBe('email@test.org')
  })

  it('trims whitespace from email strings', () => {
    expect(normalizeEmail('  user@example.com  ')).toBe('user@example.com')
    // eslint-disable-next-line style/no-tabs
    expect(normalizeEmail('	user@example.com')).toBe('user@example.com')
  })

  it('should validate email format', () => {
    expect(() => normalizeEmail('invalid-email')).toThrow('Invalid email format')
  })

  it('should handle international email domains', () => {
    expect(normalizeEmail('user@exámple.es')).toBe('user@exámple.es')
  })
})

describe('normalizeName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(normalizePunctuationSpacing).mockImplementation(text => text)
    vi.mocked(titleCase).mockImplementation(text =>
      text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    )
  })

  it('converts name to lowercase, trims, and applies title case', () => {
    const result = normalizeName('  JOHN DOE  ')
    expect(result).toBe('John Doe')
    expect(normalizePunctuationSpacing).toHaveBeenCalled()
    expect(titleCase).toHaveBeenCalled()
  })

  it('processes name through correct normalization pipeline', () => {
    normalizeName('  MARY   SMITH  ')
    expect(normalizePunctuationSpacing).toHaveBeenCalledWith('mary   smith')
    expect(titleCase).toHaveBeenCalled()
  })
})

describe('normalizeUrl', () => {
  it('trims whitespace from URLs', () => {
    expect(normalizeUrl('  https://example.com  ')).toBe('https://example.com')
    // eslint-disable-next-line style/no-tabs
    expect(normalizeUrl('	https://example.com/path')).toBe('https://example.com/path')
  })

  it('should normalize URL protocol (http vs https)', () => {
    expect(normalizeUrl('http://example.com')).toBe('https://example.com')
  })

  it('should handle trailing slashes consistently', () => {
    expect(normalizeUrl('https://example.com/')).toBe('https://example.com')
  })

  it('should normalize URL casing', () => {
    expect(normalizeUrl('https://Example.com')).toBe('https://example.com')
  })

  it('should handle query parameters', () => {
    expect(normalizeUrl('https://example.com/?param=1')).toBe('https://example.com/?param=1')
  })
})

// Integration tests to ensure normalizers work together correctly
describe('normalizer integration', () => {
  it('should properly chain normalization steps', () => {
    const rawInput = '  JOHN DOE@example.COM  '
    const normalized = normalizeEmail(normalizeName(rawInput))
    expect(normalized).toBe('john.doe@example.com')
  })

  it('should handle complex input that requires multiple normalizations', () => {
    const rawInput = '  MARY-smith@Example.com  '
    const normalized = normalizeEmail(normalizeName(rawInput))
    expect(normalized).toBe('mary.smith@example.com')
  })
})
