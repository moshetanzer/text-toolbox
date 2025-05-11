import { isValidString } from '../utils'

const WHITE_SPACE_REGEX = /\p{White_Space}+/gu
interface NormalizePunctuationOptions {
  removeExtraSpacesAfterPunctuation?: boolean
}

function removeAllWhitespace(text: string): string {
  // dont use isValidString here since we want to remove all whitespace
  if (typeof text !== 'string') {
    return text
  }
  return text.replace(WHITE_SPACE_REGEX, '')
}
function removeLeadingWhitespace(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.split('\n').map(line => line.replace(/^\s+/, '')).join('\n')
}
function removeTrailingWhitespace(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.split('\n').map(line => line.replace(/\s+$/, '')).join('\n')
}
function normalizeWhitespace(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(WHITE_SPACE_REGEX, ' ').trim()
}
function removeExtraSpaces(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/\s{2,}/g, ' ').trim()
}
function removeWhitespaceBeforePunctuation(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/\s+(\p{P})/gu, '$1')
}
function ensureSpaceAfterPunctuation(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/(\p{P})(?=\S)/gu, '$1 ')
}
function removeExtraSpacesAfterPunctuation(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/(\p{P})\s{2,}/gu, '$1 ')
}
function normalizePunctuationSpacing(text: string, options?: NormalizePunctuationOptions): string {
  if (!isValidString(text)) {
    return text
  }
  const removeExtra = options?.removeExtraSpacesAfterPunctuation !== false
  let result = ensureSpaceAfterPunctuation(text)
  result = removeWhitespaceBeforePunctuation(result)
  if (removeExtra) {
    result = removeExtraSpacesAfterPunctuation(result)
  }
  return result
}
function saneWhitespaceNormalization(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return normalizeWhitespace(removeExtraSpaces(normalizePunctuationSpacing((text))))
}

export {
  ensureSpaceAfterPunctuation,
  normalizePunctuationSpacing,
  normalizeWhitespace,
  removeAllWhitespace,
  removeExtraSpaces,
  removeLeadingWhitespace,
  removeTrailingWhitespace,
  removeWhitespaceBeforePunctuation,
  saneWhitespaceNormalization,
}
