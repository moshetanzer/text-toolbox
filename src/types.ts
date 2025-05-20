export type Vector = number[] | Float32Array | Float64Array
export type DateLike = Date | number | string | undefined

export interface StringVectorizationOptions {
  tokenizeBy?: 'char' | 'word'
  caseSensitive?: boolean
}

export interface Metaphone3Config {
  encodeExact?: boolean
  encodeVowels?: boolean
}

export interface NormalizePunctuationOptions {
  removeExtraSpacesAfterPunctuation?: boolean
  tightPunctuation?: string[]
}

export interface CapitalizeOptions {
  separators?: string[]
}

export interface UseDateFormatOptions {
  locales?: Intl.LocalesArgument
  customMeridiem?: (hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) => string
}
