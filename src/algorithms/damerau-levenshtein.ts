import { isValidString } from '../utils'

/**
 * Calculates the Damerau-Levenshtein distance between two strings.
 * This measures the minimum number of operations (insertions, deletions, substitutions, or transpositions)
 * required to change one string into the other.
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @param limit - Optional upper limit for distance calculation (defaults to max length of a or b + 1)
 * @returns The Damerau-Levenshtein distance as a number
 */
function damerauLevenshtein(a: string, b: string, limit?: number): number {
  if (!isValidString(a) && !isValidString(b)) {
    return 0
  }
  const lenA = a.length
  const lenB = b.length
  const matrix: number[][] = []

  limit = (limit || ((lenB > lenA ? lenB : lenA))) + 1

  for (let i = 0; i < limit; i++) {
    matrix[i] = [i]
    matrix[i].length = limit
  }
  for (let i = 0; i < limit; i++) {
    matrix[0][i] = i
  }

  if (Math.abs(lenA - lenB) > (limit || 100)) {
    return limit || 100
  }
  if (lenA === 0) {
    return lenB
  }
  if (lenB === 0) {
    return lenA
  }

  // Calculate matrix.
  let j, this_i, that_j, cost, min, t
  for (let i = 1; i <= lenA; ++i) {
    this_i = a[i - 1]

    // Step 4
    for (j = 1; j <= lenB; ++j) {
      // Check the jagged ld total so far
      if (i === j && matrix[i][j] > 4)
        return lenA

      that_j = b[j - 1]
      cost = (this_i === that_j) ? 0 : 1 // Step 5
      // Calculate the minimum (much faster than Math.min(...)).
      min = matrix[i - 1][j] + 1 // Deletion.

      t = matrix[i][j - 1] + 1 // Insertion.
      if (t < min)
        min = t

      t = matrix[i - 1][j - 1] + cost // Substitution.
      if (t < min)
        min = t

      // Update matrix.
      // Check for transposition
      if (i > 1 && j > 1 && this_i === b[j - 2] && a[i - 2] === that_j) {
        t = matrix[i - 2][j - 2] + cost
        if (t < min)
          min = t // Transposition.
      }

      matrix[i][j] = min
    }
  }

  return matrix[lenA][lenB]
}

export { damerauLevenshtein }
