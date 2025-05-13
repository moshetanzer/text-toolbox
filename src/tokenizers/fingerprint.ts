import { removeDiacritics, removeNonDiacritics } from '../normalizers/special-characters'
import { CONTROL_CHARACTERS, PUNCTUATION, WHITESPACE } from '../regex'

export function fingerprintKey(text: string, ...o: any[]): string {
  if (text === null || (o !== null && o.length > 0)) {
    throw new Error('Fingerprint keyer accepts a single string parameter')
  }
  text = removeDiacritics(text)
  text = removeNonDiacritics(text)
  text = text.replace(PUNCTUATION, '').replace(CONTROL_CHARACTERS, ' ')
  return text.split(WHITESPACE)
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0)
    .sort()
    .filter((word, index, array) => index === 0 || word !== array[index - 1])
    .join(' ')
}
