import type { SimilarityOptions } from './types'

/**
 * Process strings according to specified options
 */
export function preprocessStrings(
  str1: string,
  str2: string,
  options?: SimilarityOptions,
): [string, string] {
  // Apply case sensitivity option
  if (options?.caseSensitive !== true) {
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
  }

  // Handle empty strings
  if (str1 === str2) {
    return [str1, str2]
  }

  return [str1, str2]
}

/**
 * Calculate the maximum possible distance between two strings
 * for normalization purposes (algorithm specific)
 */
export function getMaxDistance(
  str1: string,
  str2: string,
  algorithm: 'levenshtein' | 'damerau-levenshtein' | 'cosine' | 'dice' | 'jaro-winkler',
): number {
  switch (algorithm) {
    case 'levenshtein':
    case 'damerau-levenshtein':
      // Max distance is the length of the longer string
      return Math.max(str1.length, str2.length)

    case 'cosine':
    case 'dice':
      // These are already normalized between 0-1
      return 1

    case 'jaro-winkler':
      // Jaro-Winkler is already normalized between 0-1
      return 1

    default:
      return 1
  }
}

/**
 * Convert distance to similarity score (0-1)
 */
export function distanceToSimilarity(
  distance: number,
  maxDistance: number,
): number {
  // Handle edge cases
  if (distance === 0)
    return 1
  if (maxDistance === 0)
    return 1

  // Convert distance to similarity (0-1)
  const similarity = 1 - (distance / maxDistance)

  // Ensure value is between 0 and 1
  return Math.max(0, Math.min(1, similarity))
}

/**
 * Convert similarity to distance
 */
export function similarityToDistance(
  similarity: number,
  maxDistance: number,
): number {
  // Convert similarity (0-1) to distance
  return maxDistance * (1 - similarity)
}

export function isValidString(text: any): text is string {
  return typeof text === 'string' && text.trim().length > 0
}
