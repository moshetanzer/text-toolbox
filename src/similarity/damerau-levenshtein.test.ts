import { describe, it, expect } from 'vitest';
import { damerauLevenshteinDistance } from './damerau-levenshtein';

describe('damerauLevenshteinDistance', () => {
  it('should return 0 steps for identical strings', () => {
    expect(damerauLevenshteinDistance('hello', 'hello').steps).toBe(0);
  });

  it('should return the correct distance for simple cases', () => {
    expect(damerauLevenshteinDistance('kitten', 'sitting').steps).toBe(3);
    expect(damerauLevenshteinDistance('sunday', 'saturday').steps).toBe(3);
  });

  it('should handle empty strings', () => {
    expect(damerauLevenshteinDistance('', '').steps).toBe(0);
    expect(damerauLevenshteinDistance('abc', '').steps).toBe(3);
    expect(damerauLevenshteinDistance('', 'xyz').steps).toBe(3);
  });

  it('should handle case sensitivity correctly', () => {
    expect(damerauLevenshteinDistance('hello', 'Hello').steps).toBe(1);
    expect(damerauLevenshteinDistance('WORLD', 'world').steps).toBe(5);
  });

  it('should handle special characters and numbers', () => {
    expect(damerauLevenshteinDistance('123', '1234').steps).toBe(1);
    expect(damerauLevenshteinDistance('hello!', 'hello?').steps).toBe(1);
    expect(damerauLevenshteinDistance('user@example.com', 'user@sample.com').steps).toBe(2);
  });

  it('should handle longer strings', () => {
    const str1 = 'the quick brown fox jumps over the lazy dog';
    const str2 = 'a quick brown fox jumped over a lazy dog';
    expect(damerauLevenshteinDistance(str1, str2).steps).toBe(8);
  });

  it('should treat transposition as 1 step in Damerau-Levenshtein', () => {
    const result = damerauLevenshteinDistance('ab', 'ba');
    expect(result.steps).toBe(1);
  });
  
});
