export interface damerauLevenshteinDistance {
    steps: number;
    relative: number;
    similarity: number;
  }

export type Vector = number[] | Float32Array | Float64Array;

export interface StringVectorizationOptions {
  tokenizeBy?: 'char' | 'word';
  caseSensitive?: boolean;
}
