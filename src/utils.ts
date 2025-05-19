import type { StringVectorizationOptions } from './types'

export function isValidString(text: any): text is string {
  return typeof text === 'string' && text.trim().length > 0
}

export function stringToVector(
  str: string,
  vocabulary: Set<string>,
  options: StringVectorizationOptions = {},
): number[] {
  const { tokenizeBy = 'word', caseSensitive = false } = options

  if (!str)
    // eslint-disable-next-line unicorn/no-new-array
    return new Array(vocabulary.size).fill(0)

  const processedStr = caseSensitive ? str : str.toLowerCase()

  const terms = tokenizeBy === 'word'
    ? processedStr.split(/\s+/).filter(Boolean)
    : processedStr.split('')

  const termFrequency: Record<string, number> = {}
  for (const term of terms) {
    termFrequency[term] = (termFrequency[term] || 0) + 1
  }

  const vector: number[] = []
  for (const term of vocabulary) {
    vector.push(termFrequency[term] || 0)
  }

  return vector
}
