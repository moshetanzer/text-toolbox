export const bigram = nGram(2)
export const trigram = nGram(3)

/**
 * Factory returning a function that converts a value string to n-grams.
 *
 * @param {number} n - The size of each n-gram
 */
export function nGram(n: number) {
  if (
    typeof n !== 'number'
    || Number.isNaN(n)
    || n < 1
    || n === Number.POSITIVE_INFINITY
  ) {
    // @ts-expect-error: Intentionally passing wrong type
    if (Number.isNaN(n) || n === 'not a number') {
      throw new Error('`NaN` is not a valid argument for `n-gram`')
    }
    else {
      throw new Error(`\`${n}\` is not a valid argument for \`n-gram\``)
    }
  }

  /**
   * Create n-grams from a string value.
   *
   * @param {string | null | undefined} value - The string to create n-grams from
   * @returns {string[]} - Array of n-grams
   */
  function stringGrams(value?: string | null | undefined): string[] {
    if (value === null || value === undefined) {
      return []
    }

    const source = String(value)
    const result: string[] = []
    let index = source.length - n + 1

    if (index < 1) {
      return result
    }

    while (index--) {
      result[index] = source.slice(index, index + n)
    }

    return result
  }

  /**
   * Create n-grams from an array value.
   *
   * @template T - The type of elements in the array
   * @param {readonly T[] | null | undefined} value - The array to create n-grams from
   * @returns {T[][]} - Array of n-grams
   */
  function arrayGrams<T>(value?: readonly T[] | null | undefined): T[][] {
    if (value === null || value === undefined) {
      return []
    }

    const result: T[][] = []
    let index = value.length - n + 1

    if (index < 1) {
      return result
    }

    while (index--) {
      result[index] = value.slice(index, index + n) as T[]
    }

    return result
  }

  /**
   * Create n-grams from a given value.
   *
   * @template T - Type of the input value
   * @param {T} [value] - The value to create n-grams from
   * @returns {string[] | T[][]} - Array of n-grams
   */
  return function grams<T>(value?: T): T extends readonly unknown[] ? T[][] : string[] {
    if (value === null || value === undefined) {
      return [] as unknown as T extends readonly unknown[] ? T[][] : string[]
    }

    if (typeof value === 'string') {
      return stringGrams(value) as T extends readonly unknown[] ? T[][] : string[]
    }

    if (Array.isArray(value)) {
      return arrayGrams(value) as T extends readonly unknown[] ? T[][] : string[]
    }

    // For other types, convert to string
    return stringGrams(String(value)) as T extends readonly unknown[] ? T[][] : string[]
  }
}
