import { isValidString } from '../utils'

interface CapitalizeOptions {
  separators?: string[]
}
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
function sentanceCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  text = text.toLowerCase()
  return text && text.length > 0 && text[0] ? text[0].toUpperCase() + text.slice(1) : ''
}
function toCase(text: string, separator: string, capitalize: boolean = false): string {
  return text
    .split(' ')
    .map((word, index) =>
      capitalize || index > 0 ? sentanceCase(word) : word.toLowerCase(),
    )
    .join(separator)
}
function camelCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '', false)
}
function pascalCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '', true)
}
function snakeCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '_').toLowerCase()
}
function kebabCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return toCase(text, '-').toLowerCase()
}
function constantCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.toUpperCase().replace(/\s+/g, '_')
}
function dotCase(text: string): string {
  if (!isValidString(text)) {
    return text
  }
  return text.toLowerCase().replace(/\s+/g, '.')
}
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
