import type { StringVectorizationOptions, Vector } from '../types'
import { stringToVector } from '../utils'

function cosine(a: Vector, b: Vector): number {
  if (a.length !== b.length)
    throw new Error('The given vectors are not of the same dimension.')

  let xx = 0
  let xy = 0
  let yy = 0

  for (let i = 0, l = a.length; i < l; i++) {
    const x = a[i]
    const y = b[i]

    if (x !== undefined && y !== undefined) {
      xx += x * x
      yy += y * y
      xy += x * y
    }
  }

  // Handle zero vectors to avoid division by zero
  if (xx === 0 || yy === 0)
    return 0

  return xy / Math.sqrt(xx * yy)
}

function cosineSimilarity(
  a: string,
  b: string,
  options: StringVectorizationOptions = {},
): number {
  // Handle empty strings
  if (!a && !b)
    return 1 // Two empty strings are identical
  if (!a || !b)
    return 0 // One empty string has no similarity with non-empty

  const { tokenizeBy = 'word', caseSensitive = false } = options

  const processedStr1 = caseSensitive ? a : a.toLowerCase()
  const processedStr2 = caseSensitive ? b : b.toLowerCase()

  const terms1 = tokenizeBy === 'word'
    ? processedStr1.split(/\s+/).filter(Boolean)
    : processedStr1.split('')

  const terms2 = tokenizeBy === 'word'
    ? processedStr2.split(/\s+/).filter(Boolean)
    : processedStr2.split('')

  const vocabulary = new Set<string>([...terms1, ...terms2])

  // If both strings tokenize to empty arrays, they're considered identical
  if (terms1.length === 0 && terms2.length === 0)
    return 1

  const vector1 = stringToVector(processedStr1, vocabulary, options)
  const vector2 = stringToVector(processedStr2, vocabulary, options)

  return cosine(vector1, vector2)
}

function cosineDistance(
  a: string,
  b: string,
  options: StringVectorizationOptions = {},
): number {
  return 1 - cosineSimilarity(a, b, options)
}

export { cosineDistance, cosineSimilarity }
