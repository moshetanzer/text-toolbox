type Vector = number[] | Float32Array | Float64Array;
interface StringVectorizationOptions {
  tokenizeBy?: 'char' | 'word';
  caseSensitive?: boolean;
}

/**
 * Calculate cosine similarity between two vectors
 * @returns similarity value between 0 and 1
 */
function cosine(a: Vector, b: Vector): number {
  if (a.length !== b.length)
    throw new Error('The given vectors are not of the same dimension.');

  let xx = 0,
    xy = 0,
    yy = 0;

  for (let i = 0, l = a.length; i < l; i++) {
    const x = a[i],
      y = b[i];

    xx += x * x;
    yy += y * y;
    xy += x * y;
  }

  // Handle zero vectors to avoid division by zero
  if (xx === 0 || yy === 0) return 0;

  return xy / Math.sqrt(xx * yy);
}

/**
 * Calculate cosine distance between two vectors
 * @returns distance value between 0 and 1
 */
export function distance(a: Vector, b: Vector): number {
  return 1 - cosine(a, b);
}

/**
 * Convert a string to a vector based on term frequencies
 */
export function stringToVector(
  str: string,
  vocabulary: Set<string>,
  options: StringVectorizationOptions = {}
): number[] {
  const { tokenizeBy = 'word', caseSensitive = false } = options;

  if (!str) return Array(vocabulary.size).fill(0);

  const processedStr = caseSensitive ? str : str.toLowerCase();

  const terms = tokenizeBy === 'word'
    ? processedStr.split(/\s+/).filter(Boolean)
    : processedStr.split('');

  const termFrequency: Record<string, number> = {};
  for (const term of terms) {
    termFrequency[term] = (termFrequency[term] || 0) + 1;
  }

  const vector: number[] = [];
  for (const term of vocabulary) {
    vector.push(termFrequency[term] || 0);
  }

  return vector;
}

/**
 * Calculate cosine similarity between two strings
 * @returns similarity value between 0 and 1
 */
function cosineStringSimilarity(
  str1: string,
  str2: string,
  options: StringVectorizationOptions = {}
): number {
  // Handle empty strings
  if (!str1 && !str2) return 1; // Two empty strings are identical
  if (!str1 || !str2) return 0; // One empty string has no similarity with non-empty

  const { tokenizeBy = 'word', caseSensitive = false } = options;

  const processedStr1 = caseSensitive ? str1 : str1.toLowerCase();
  const processedStr2 = caseSensitive ? str2 : str2.toLowerCase();

  const terms1 = tokenizeBy === 'word'
    ? processedStr1.split(/\s+/).filter(Boolean)
    : processedStr1.split('');

  const terms2 = tokenizeBy === 'word'
    ? processedStr2.split(/\s+/).filter(Boolean)
    : processedStr2.split('');

  const vocabulary = new Set<string>([...terms1, ...terms2]);

  // If both strings tokenize to empty arrays, they're considered identical
  if (terms1.length === 0 && terms2.length === 0) return 1;

  const vector1 = stringToVector(processedStr1, vocabulary, options);
  const vector2 = stringToVector(processedStr2, vocabulary, options);

  return cosine(vector1, vector2);
}

/**
 * Calculate cosine distance between two strings
 * @returns distance value between 0 and 1
 */
export function stringDistance(
  str1: string,
  str2: string,
  options: StringVectorizationOptions = {}
): number {
  return 1 - cosineStringSimilarity(str1, str2, options);
}

export { cosine, cosineStringSimilarity };