import { TITLE_PREFIXES, TITLE_SUFFIXES } from '../constants'

/**
 * Removes consecutive duplicate words from a string (case-insensitive).
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string with duplicate consecutive words removed.
 */
function removeDuplicateWords(text: string): string {
  if (!text) {
    return ''
  }

  const words = text.split(/\s+/)
  const result = []

  for (let i = 0; i < words.length; i++) {
    if (i > 0 && words[i]!.toLowerCase() === words[i - 1]!.toLowerCase()) {
      continue
    }
    result.push(words[i])
  }
  return result.join(' ')
}

/**
 * Removes a known title prefix (e.g., "Dr.", "Mr.", "Ms.") from the beginning of a string.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string with the title prefix removed, preserving leading spaces.
 */
function removeTitlePrefix(text: string): string {
  if (!text)
    return ''

  const escapedTitles = TITLE_PREFIXES.map(title => title.replace('.', '\\.'))
  // Match only if the title starts at the beginning, ignoring leading spaces but not removing them
  const regex = new RegExp(`^(\\s*)(${escapedTitles.join('|')})\\.?\\s+`, 'i')

  return text.replace(regex, '$1') // keep leading spaces, remove title
}

/**
 * Removes a known title suffix (e.g., "Jr.", "Sr.", "PhD") from the end of a string.
 *
 * @param {string} text - The input string to process.
 * @returns {string} The string with the title suffix removed.
 */
function removeTitleSuffix(text: string): string {
  if (!text)
    return ''
  const regex = new RegExp(
    `\\s+(${TITLE_SUFFIXES.join('|')})\\.?\\s*$`,
    'i',
  )
  return text.replace(regex, '')
}

export { removeDuplicateWords, removeTitlePrefix, removeTitleSuffix }
