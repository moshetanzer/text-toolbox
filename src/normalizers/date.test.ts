import { describe, expect, it } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
  it('should format date to default HH:mm:ss if no format is provided', () => {
    const date = new Date('2025-05-13T10:30:15')
    expect(formatDate(date)).toBe('10:30:15')
  })

  it('should format date correctly with various date formats', () => {
    const date = new Date('2025-05-13T10:30:15')

    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2025-05-13')
    expect(formatDate(date, 'DD/MM/YYYY')).toBe('13/05/2025')
    expect(formatDate(date, 'ddd, MMM D, YYYY')).toBe('Tue, May 13, 2025')
    expect(formatDate(date, 'dddd, MMMM D, YYYY')).toBe('Tuesday, May 13, 2025')
    expect(formatDate(date, 'hh:mm A')).toBe('10:30 AM')
    expect(formatDate(date, 'hh:mm a')).toBe('10:30 am')
    expect(formatDate(date, 'HH:mm:ss.SSS')).toBe('10:30:15.000')
  })

  it('should handle custom meridiem formatting', () => {
    const date = new Date('2025-05-13T15:30:15')
    const customMeridiem = (hours: number) => (hours < 12 ? 'morning' : 'afternoon')
    expect(formatDate(date, 'hh:mm A', { customMeridiem })).toBe('03:30 afternoon')
  })

  it('should handle locales correctly', () => {
    const date = new Date('2025-05-13T10:30:15')
    expect(formatDate(date, 'dddd, MMMM D, YYYY', { locales: 'fr-FR' })).toBe('mardi, mai 13, 2025')
    expect(formatDate(date, 'dddd, MMMM D, YYYY', { locales: 'de-DE' })).toBe('Dienstag, Mai 13, 2025')
  })

  it('should return "Invalid Date" for invalid dates', () => {
    expect(formatDate('invalid-date', 'YYYY-MM-DD')).toBe('NaN-NaN-NaN')
  })

  it('should parse various date input types', () => {
    expect(formatDate(1672531200000, 'YYYY-MM-DD')).toBe('2023-01-01')
    expect(formatDate('2025-05-13T10:30:15', 'YYYY-MM-DD')).toBe('2025-05-13')
    expect(formatDate(undefined, 'YYYY-MM-DD')).toBe(new Date().toISOString().split('T')[0])
  })

  it('should handle ordinal formatting correctly', () => {
    const date = new Date('2025-05-01T10:30:15')
    expect(formatDate(date, 'Do MMMM YYYY')).toBe('1st May 2025')
  })

  it('should handle timezone formatting', () => {
    const date = new Date('2025-05-13T10:30:15')
    expect(formatDate(date, 'zz')).toMatch(/GMT[-+]\d{1,2}/)
  })

  it('should correctly pad single-digit values', () => {
    const date = new Date('2025-05-03T05:04:07')
    expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2025-05-03 05:04:07')
  })
})
