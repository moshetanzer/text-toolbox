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

export interface URLOptions {
  /**
   * Force HTTPS protocol.
   * Cannot be used with `forceHttp` option.
   * @default false
   */
  forceHttps?: boolean

  /**
   * Force HTTP protocol.
   * Cannot be used with `forceHttps` option.
   * @default false
   */
  forceHttp?: boolean

  /**
   * Strip the hash fragment from the URL.
   * @default false
   */
  stripHash?: boolean

  /**
   * Strip the `www.` subdomain from the URL.
   * @default true
   */
  stripWWW?: boolean

  /**
   * Strip the protocol from the URL.
   * @default false
   */
  stripProtocol?: boolean

  /**
   * Remove query parameters from the URL.
   * - Specify parameters to remove as an array of strings or RegExp objects
   * - Use ['*'] to remove all parameters
   * @default []
   */
  removeQueryParameters?: Array<string | RegExp>

  /**
   * Sort query parameters alphabetically by key.
   * @default true
   */
  sortQueryParameters?: boolean

  /**
   * Remove trailing slash from the URL.
   * @default true
   */
  removeTrailingSlash?: boolean

  /**
   * Remove standard directory index files (like index.html, index.php, etc).
   * - When set to true, removes common index files
   * - Can also provide a custom array of index files to remove
   * @default false
   */
  removeDirectoryIndex?: boolean | Array<string | RegExp>
}
