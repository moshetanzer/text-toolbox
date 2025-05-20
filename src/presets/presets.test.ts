import { describe, expect, it } from 'vitest'

import {
  normalizeName,
} from './presets'

describe('normalizeName', () => {
  it('converts name to lowercase, trims, and applies title case', () => {
    const result = normalizeName('  JOHN DOE  ')
    expect(result).toBe('John Doe')
  })

  it('handles multiple spaces between names correctly', () => {
    expect(normalizeName('  MARY   SMITH  ')).toBe('Mary Smith')
  })
})
