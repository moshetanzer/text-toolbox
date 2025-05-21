import type { NormalizePunctuationOptions } from '../types'
import { TABS, WHITESPACE } from '../regex'
import { isValidString } from '../utils'

/**
 * Removes all whitespace characters (spaces, tabs, newlines, etc.) from a string.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string without any whitespace characters.
 */
function removeAllWhitespace(text: string): string {
  // dont use isValidString here since we want to remove all whitespace
  if (typeof text !== 'string') {
    return text
  }
  return text.replace(WHITESPACE, '')
}

/**
 * Removes leading whitespace from each line in a multiline string.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string with leading whitespace removed from each line.
 */
function removeLeadingWhitespace(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.split('\n').map(line => line.replace(/^\s+/, '')).join('\n')
}

/**
 * Removes trailing whitespace from each line in a multiline string.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string with trailing whitespace removed from each line.
 */
function removeTrailingWhitespace(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.split('\n').map(line => line.replace(/\s+$/, '')).join('\n')
}

/**
 * Normalizes all whitespace characters in a string:
 * - Converts all whitespace and tabs to single spaces.
 * - Trims leading and trailing whitespace.
 *
 * @param {string} text - The input string to normalize.
 * @returns {string} The string with normalized whitespace.
 */
function normalizeWhitespace(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  text = text.replace(WHITESPACE, ' ')
  text = text.replace(TABS, ' ')
  return text.trim()
}

/**
 * Replaces multiple consecutive spaces with a single space and trims the result.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The cleaned string with extra spaces removed.
 */
function removeExtraSpaces(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/\s{2,}/g, ' ').trim()
}

/**
 * Removes whitespace that appears immediately before any punctuation character.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string with whitespace removed before punctuation.
 */
function removeWhitespaceBeforePunctuation(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/\s+(\p{P})/gu, '$1')
}

/**
 * Ensures there is exactly one space after punctuation characters, if not followed by whitespace.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The updated string with a space after punctuation where needed.
 */
function ensureSpaceAfterPunctuation(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/(\p{P})(?=\S)/gu, '$1 ')
}

/**
 * Replaces multiple spaces following punctuation with a single space.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The cleaned string with extra spaces after punctuation removed.
 */
function removeExtraSpacesAfterPunctuation(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.replace(/(\p{P})\s{2,}/gu, '$1 ')
}

/**
 * Removes all spaces around specified punctuation characters.
 *
 * @param {string} text - The input string to process.
 * @param {string[]} chars - Array of punctuation characters to tighten.
 * @returns {string} The string with tight spacing around the specified punctuation.
 */
function tightenPunctuation(text: string, chars: string[]): string {
  const escaped = chars.map(c => `\\${c}`).join('')
  const regex = new RegExp(`\\s*([${escaped}])\\s*`, 'g')
  return text.replace(regex, '$1')
}

/**
 * Normalizes punctuation spacing according to given options:
 * - Ensures space after punctuation.
 * - Removes whitespace before punctuation.
 * - Optionally removes extra spaces after punctuation.
 * - Optionally tightens spacing around specified punctuation characters.
 *
 * @param {string} text - The input string to process.
 * @param {NormalizePunctuationOptions} [options] - Options for punctuation normalization.
 * @param {boolean} [options.removeExtraSpacesAfterPunctuation] - Whether to remove multiple spaces after punctuation.
 * @param {string[]} [options.tightPunctuation] - Characters for which to tighten surrounding spaces.
 * @returns {string} The processed string with normalized punctuation spacing.
 */
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
