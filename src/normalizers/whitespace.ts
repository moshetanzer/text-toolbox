import type { NormalizePunctuationOptions } from '../types'
import { TABS, WHITESPACE } from '../regex'
import { isValidString } from '../utils'

function removeAllWhitespace(text: string): string {
  // dont use isValidString here since we want to remove all whitespace
  if (typeof text !== 'string') {
    return text
  }
  return text.replace(WHITESPACE, '')
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
  text = text.replace(WHITESPACE, ' ')
  text = text.replace(TABS, ' ')
  return text.trim()
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

function tightenPunctuation(text: string, chars: string[]): string {
  const escaped = chars.map(c => `\\${c}`).join('')
  const regex = new RegExp(`\\s*([${escaped}])\\s*`, 'g')
  return text.replace(regex, '$1')
}

function normalizePunctuationSpacing(
  text: string,
  options?: NormalizePunctuationOptions,
): string {
  if (!isValidString(text))
    return text

  const removeExtra = options?.removeExtraSpacesAfterPunctuation !== false
  const tightPuncts = options?.tightPunctuation ?? []

  let result = ensureSpaceAfterPunctuation(text)
  result = removeWhitespaceBeforePunctuation(result)

  if (removeExtra) {
    result = removeExtraSpacesAfterPunctuation(result)
  }

  if (tightPuncts.length > 0) {
    result = tightenPunctuation(result, tightPuncts)
  }

  return result
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
}
