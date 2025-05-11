// based on https://github.com/ka-weihe/fast-dice-coefficient

import { isValidString } from '../utils'

/**
 * Calculates the Dice Coefficient between two strings.
 * This measures the similarity between two strings based on the number of bigrams (two-character combinations) they share.
 * The value ranges from 0 (no similarity) to 1 (identical strings).
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns The Dice Coefficient as a number between 0 and 1
 */
function diceCoefficient(a: string, b: string): number {
  if (!isValidString(a) || !isValidString(b)) {
    return 0
  }
  a = a.toLowerCase()
  b = b.toLowerCase()
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
}
export { diceCoefficient }
