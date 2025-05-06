// based on https://github.com/ka-weihe/fast-dice-coefficient

import type { SimilarityAlgorithm, SimilarityOptions, SimilarityResult } from '../types'
import { preprocessStrings } from '../utils'

function diceCoefficientInternal(a: string, b: string): number {
  let i, j, k, match, ref, ref1, sub
  if (a.length < 2 || b.length < 2) {
    return 0
  }
  const map = new Map()
  for (i = j = 0, ref = a.length - 2; (ref >= 0 ? j <= ref : j >= ref); i = ref >= 0 ? ++j : --j) {
    sub = a.slice(i, i + 2)
    if (map.has(sub)) {
      map.set(sub, map.get(sub) + 1)
    }
    else {
      map.set(sub, 1)
    }
  }
  match = 0
  for (i = k = 0, ref1 = b.length - 2; (ref1 >= 0 ? k <= ref1 : k >= ref1); i = ref1 >= 0 ? ++k : --k) {
    sub = b.slice(i, i + 2)
    if (map.get(sub) > 0) {
      match++
      map.set(sub, map.get(sub) - 1)
    }
  }
  return 2.0 * match / (a.length + b.length - 2)
};

export class DiceCoefficient implements SimilarityAlgorithm {
  private defaultOptions: SimilarityOptions = {
    caseSensitive: false,
  }

  public compare(str1: string, str2: string, options?: SimilarityOptions): SimilarityResult {
    const mergedOptions: SimilarityOptions = { ...this.defaultOptions, ...options }
    const [processedStr1, processedStr2] = preprocessStrings(str1, str2, mergedOptions)
    const similarity = diceCoefficientInternal(processedStr1, processedStr2)
    const distance = 1 - similarity
    return { distance, similarity }
  }

  public similarity(str1: string, str2: string, options?: SimilarityOptions): number {
    return this.compare(str1, str2, options).similarity
  }

  public distance(str1: string, str2: string, options?: SimilarityOptions): number {
    return this.compare(str1, str2, options).distance
  }
}

export const diceCoefficient = new DiceCoefficient()
