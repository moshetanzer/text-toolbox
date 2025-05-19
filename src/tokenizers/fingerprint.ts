import { removeDiacritics, replaceCompatibilityCharacters } from '../normalizers/special-characters'
import { CONTROL_CHARACTERS, PUNCTUATION, WHITESPACE } from '../regex'

function fingerprint(text: string, ...o: any[]): string {
  if (text === null || (o !== null && o.length > 0)) {
    throw new Error('Fingerprint keyer accepts a single string parameter')
  }
  text = removeDiacritics(text)
  text = text.replace(PUNCTUATION, '').replace(CONTROL_CHARACTERS, ' ')
  text = replaceCompatibilityCharacters(text)
  return text.split(WHITESPACE)
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0)
    .sort()
    .filter((word, index, array) => index === 0 || word !== array[index - 1])
    .join(' ')
}

export { fingerprint }
