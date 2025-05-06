import type { SimilarityAlgorithm, SimilarityOptions, SimilarityResult } from '../types.js'
import { distanceToSimilarity, preprocessStrings } from '../utils.js'

function jaroWinklerInternal(a: string, b: string, options?: { caseSensitive?: boolean }): number {
  const defaults = { caseSensitive: true }
  const settings = { ...defaults, ...options }

  const s1 = settings.caseSensitive ? a : a.toUpperCase()
  const s2 = settings.caseSensitive ? b : b.toUpperCase()

  if (s1.length === 0 && s2.length === 0) {
    return 1
  }
  if (s1.length === 0 || s2.length === 0) {
    return 0
  }
  if (s1 === s2) {
    return 1
  }

  const matchDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1

  const s1Matches = Array.from({ length: s1.length }).fill(false)
  const s2Matches = Array.from({ length: s2.length }).fill(false)

  let matchingCharacters = 0
  for (let i = 0; i < s1.length; i++) {
    const low = Math.max(0, i - matchDistance)
    const high = Math.min(i + matchDistance + 1, s2.length)

    for (let j = low; j < high; j++) {
      if (!s1Matches[i] && !s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = true
        s2Matches[j] = true
        matchingCharacters++
        break
      }
    }
  }

  if (matchingCharacters === 0) {
    return 0
  }

  let transpositions = 0
  let j = 0

  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[j]) {
        j++
      }

      if (s1[i] !== s2[j]) {
        transpositions++
      }

      j++
    }
  }

  transpositions = Math.floor(transpositions / 2)

  const jaroSimilarity = (
    matchingCharacters / s1.length
    + matchingCharacters / s2.length
    + (matchingCharacters - transpositions) / matchingCharacters
  ) / 3

  let commonPrefixLength = 0
  const maxPrefixLength = Math.min(4, Math.min(s1.length, s2.length))

  for (let i = 0; i < maxPrefixLength; i++) {
    if (s1[i] === s2[i]) {
      commonPrefixLength++
    }
    else {
      break
    }
  }

  const winklerThreshold = 0.7
  const winklerScalingFactor = 0.1

  let jaroWinklerSimilarity = jaroSimilarity
  if (jaroSimilarity > winklerThreshold) {
    jaroWinklerSimilarity
      += commonPrefixLength * winklerScalingFactor * (1 - jaroSimilarity)
  }

  return jaroWinklerSimilarity
}

export class JaroWinkler implements SimilarityAlgorithm {
  private defaultOptions: SimilarityOptions = {
    caseSensitive: true,
  }

  public compare(str1: string, str2: string, options?: SimilarityOptions): SimilarityResult {
    const mergedOptions: SimilarityOptions = { ...this.defaultOptions, ...options }
    const [processedStr1, processedStr2] = preprocessStrings(str1, str2, mergedOptions)
    const distance = jaroWinklerInternal(processedStr1, processedStr2)
    const maxDistance = Math.max(processedStr1.length, processedStr2.length)
    const similarity = distanceToSimilarity(distance, maxDistance)
    return { distance, similarity }
  }

  public similarity(str1: string, str2: string, options?: SimilarityOptions): number {
    return this.compare(str1, str2, options).similarity
  }

  public distance(str1: string, str2: string, options?: SimilarityOptions): number {
    return this.compare(str1, str2, options).distance
  }
}

export const jaroWinkler = new JaroWinkler()
