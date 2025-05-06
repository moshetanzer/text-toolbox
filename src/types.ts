export interface SimilarityOptions {
  caseSensitive?: boolean
  normalize?: boolean
}

/**
 * Result of a similarity calculation
 */
export interface SimilarityResult {
  /**
   * Distance between strings (higher = more different)
   * Ranges vary by algorithm
   */
  distance: number

  /**
   * Similarity between strings (higher = more similar)
   * Normalized to range from 0 to 1
   */
  similarity: number
}

/**
 * Base interface for all similarity algorithms
 */
export interface SimilarityAlgorithm {
  /**
   * Calculate both similarity and distance metrics
   *
   * @param str1 First string to compare
   * @param str2 Second string to compare
   * @param options Optional configuration
   * @returns Object containing both similarity and distance
   */
  compare: (str1: string, str2: string, options?: SimilarityOptions) => SimilarityResult

  /**
   * Calculate similarity score (0-1, higher is more similar)
   *
   * @param str1 First string to compare
   * @param str2 Second string to compare
   * @param options Optional configuration
   * @returns Similarity score from 0 to 1
   */
  similarity: (str1: string, str2: string, options?: SimilarityOptions) => number

  /**
   * Calculate distance (higher is more different)
   *
   * @param str1 First string to compare
   * @param str2 Second string to compare
   * @param options Optional configuration
   * @returns Distance value
   */
  distance: (str1: string, str2: string, options?: SimilarityOptions) => number
}
