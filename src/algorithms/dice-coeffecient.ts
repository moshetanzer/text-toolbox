import { bigram } from '../tokenizers/n-gram'

export interface DiceCoefficientOptions {
  caseSensitive?: boolean
}

/**
 * Calculate Dice coefficient distance between two strings
 * Returns a value between 0 (identical) and 1 (completely different)
 */
function diceCoefficientDistance(
  a: string,
  b: string,
  options: DiceCoefficientOptions = {}
): number {
  // Special case for empty strings - they are considered identical
  if (a === '' && b === '') {
    return 0
  }
  
  // If either string is empty, there is no similarity
  if (a === '' || b === '') {
    return 1
  }

  // For single character strings, compare them directly
  if (a.length === 1 && b.length === 1) {
    const caseSensitive = options.caseSensitive ?? false
    if (!caseSensitive && a.toLowerCase() === b.toLowerCase()) {
      return 0
    }
    return a === b ? 0 : 1
  }

  // Calculate the similarity coefficient first
  const similarity = diceCoefficientSimilarity(a, b, options)
  
  // Distance is the inverse of similarity
  return 1 - similarity
}

/**
 * Calculate Dice coefficient similarity between two strings
 * Returns a value between 0 (completely different) and 1 (identical)
 */
function diceCoefficientSimilarity(
  a: string, 
  b: string, 
  options: DiceCoefficientOptions = {}
): number {
  const caseSensitive = options.caseSensitive ?? false
  
  const left = toPairs(a, caseSensitive)
  const right = toPairs(b, caseSensitive)
  
  // Handle edge cases to avoid division by zero
  if (left.length === 0 && right.length === 0) {
    return 1 // Both strings have no bigrams (identical)
  }
  if (left.length === 0 || right.length === 0) {
    return 0 // One string has no bigrams (completely different)
  }
  
  let index = -1
  let intersections = 0
  const rightCopy = [...right] // Create a copy to mark matched pairs

  while (++index < left.length) {
    const leftPair = left[index]
    let offset = -1

    while (++offset < rightCopy.length) {
      const rightPair = rightCopy[offset]

      if (leftPair === rightPair) {
        intersections++;

        // Make sure this pair never matches again
        rightCopy[offset] = ''
        break
      }
    }
  }

  return (2 * intersections) / (left.length + right.length)
}

function toPairs(value: string | string[], caseSensitive: boolean = false): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => normalize(item, caseSensitive))
  }

  const normal = normalize(value, caseSensitive)
  return normal.length === 1 ? [normal] : bigram(normal)
}

function normalize(value: string, caseSensitive: boolean = false): string {
  if (caseSensitive) {
    return String(value)
  }
  return String(value).toLowerCase()
}

export { diceCoefficientDistance, diceCoefficientSimilarity }