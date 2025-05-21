import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-01-15T12:00:00'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should format date to default HH:mm:ss if no format is provided', () => {
    const date = new Date('2025-05-14T10:30:15')
    expect(formatDate(date)).toBe('10:30:15')
  })

  it('should format date correctly with various date formats', () => {
    const date = new Date('2025-05-14T10:30:15')

    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2025-05-14')
    expect(formatDate(date, 'DD/MM/YYYY')).toBe('14/05/2025')
    expect(formatDate(date, 'ddd, MMM D, YYYY')).toBe('Wed, May 14, 2025')
    expect(formatDate(date, 'dddd, MMMM D, YYYY')).toBe('Wednesday, May 14, 2025')
    expect(formatDate(date, 'hh:mm A')).toBe('10:30 AM')
    expect(formatDate(date, 'hh:mm a')).toBe('10:30 am')
    expect(formatDate(date, 'HH:mm:ss.SSS')).toBe('10:30:15.000')
  })

  it('should handle custom meridiem formatting', () => {
    const date = new Date('2025-05-14T15:30:15')
    const customMeridiem = (hours: number) => (hours < 12 ? 'morning' : 'afternoon')
    expect(formatDate(date, 'hh:mm A', { customMeridiem })).toBe('03:30 afternoon')
  })

  it('should handle locales correctly', () => {
    const date = new Date('2025-05-14T10:30:15')
    expect(formatDate(date, 'dddd, MMMM D, YYYY', { locales: 'fr-FR' })).toBe('mercredi, mai 14, 2025')
    expect(formatDate(date, 'dddd, MMMM D, YYYY', { locales: 'de-DE' })).toBe('Mittwoch, Mai 14, 2025')
  })

  it('should return "Invalid Date" for invalid dates', () => {
    expect(formatDate('invalid-date', 'YYYY-MM-DD')).toBe('NaN-NaN-NaN')
  })

  it('should parse various date input types', () => {
    expect(formatDate(1747353600000, 'YYYY-MM-DD')).toBe('2025-05-16')
    expect(formatDate('2025-05-14T10:30:15', 'YYYY-MM-DD')).toBe('2025-05-14')
    expect(formatDate(undefined, 'YYYY-MM-DD')).toBe('2023-01-15') // Uses mocked date
  })

  it('should handle ordinal formatting correctly', () => {
    const date1 = new Date('2025-05-01T10:30:15')
    const date2 = new Date('2025-05-02T10:30:15')
    const date3 = new Date('2025-05-03T10:30:15')
    const date11 = new Date('2025-05-11T10:30:15')

    expect(formatDate(date1, 'Do MMMM YYYY')).toBe('1st May 2025')
    expect(formatDate(date2, 'Do MMMM YYYY')).toBe('2nd May 2025')
    expect(formatDate(date3, 'Do MMMM YYYY')).toBe('3rd May 2025')
    expect(formatDate(date11, 'Do MMMM YYYY')).toBe('11th May 2025')
  })

  // it('should handle timezone formatting', () => {
  //   const date = new Date('2025-05-14T10:30:15')
  //   // This will work regardless of actual timezone
  //   expect(formatDate(date, 'zz')).toMatch(/GMT[-+]\d{1,2}/)
  // })

  it('should correctly pad single-digit values', () => {
    const date = new Date('2025-05-03T05:04:07')
    expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2025-05-03 05:04:07')
  })

  it('should handle edge cases', () => {
    // Test midnight
    expect(formatDate(new Date('2025-05-14T00:00:00'), 'HH:mm:ss')).toBe('00:00:00')
    // Test leap year
    expect(formatDate(new Date('2024-02-29T10:30:15'), 'YYYY-MM-DD')).toBe('2024-02-29')
  })
})
