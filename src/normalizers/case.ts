import type { CapitalizeOptions } from '../types'
import { isValidString } from '../utils'

/**
 * Converts a string to title case based on specified separators.
 *
 * @param {string} text - The input string to convert.
 * @param {CapitalizeOptions} [options] - Optional configuration.
 * @param {string[]} [options.separators] - Characters to treat as word separators.
 * @returns {string} The title-cased version of the input string.
 */
function titleCase(text: string, options: CapitalizeOptions = {}): string {
  if (!isValidString(text)) {
    return text
  }
  const separators = options.separators ?? [' ']
  const pattern = `([^${separators.map(s => `\\${s}`).join('')}]+|[${separators.map(s => `\\${s}`).join('')}])`
  const regex = new RegExp(pattern, 'g')

  return (text.match(regex) || [])
    .map((part) => {
      if (separators.includes(part)) {
        return part // keep separator as-is
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })
    .join('')
}

/**
 * Converts a string to sentence case (only the first character is capitalized).
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The sentence-cased version of the input string.
 */
function sentanceCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  text = text.toLowerCase()
  return text && text.length > 0 && text[0] ? text[0].toUpperCase() + text.slice(1) : ''
}

// TODO: remove this to case function since for kebab and snake case we need to use the same function
function toCase(text: string, separator: string, capitalize: boolean = false): string {
  return text
    .split(' ')
    .map((word, index) =>
      capitalize || index > 0 ? sentanceCase(word) : word.toLowerCase(),
    )
    .join(separator)
}

/**
 * Converts a string to camelCase.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The camelCased version of the input string.
 */
function camelCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '', false)
}

/**
 * Converts a string to PascalCase.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The PascalCased version of the input string.
 */
function pascalCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '', true)
}

/**
 * Converts a string to snake_case.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The snake_cased version of the input string.
 */
function snakeCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '_').toLowerCase()
}

/**
 * Converts a string to kebab-case.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The kebab-cased version of the input string.
 */
function kebabCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '-').toLowerCase()
}

/**
 * Converts a string to CONSTANT_CASE.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The CONSTANT_CASE version of the input string.
 */
function constantCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.toUpperCase().replace(/\s+/g, '_')
}

/**
 * Converts a string to dot.case.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The dot.cased version of the input string.
 */
function dotCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.toLowerCase().replace(/\s+/g, '.')
}

/**
 * Converts a string to path/case.
 *
 * @param {string} text - The input string to convert.
 * @returns {string} The path/cased version of the input string.
 */
function pathCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.toLowerCase().replace(/\s+/g, '/')
}

export {
  camelCase,
  constantCase,
  dotCase,
  kebabCase,
  pascalCase,
  pathCase,
  sentanceCase,
  snakeCase,
  titleCase,
}
