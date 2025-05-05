
import { describe, it, expect } from 'vitest';
import { levenshteinDistance } from './levenshtein';

describe('levenshteinDistance', () => {
  it('should return 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0);
  });

  it('should return the correct distance for simple cases', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('sunday', 'saturday')).toBe(3);
  });

  it('should handle empty strings', () => {
    expect(levenshteinDistance('', '')).toBe(0);
    expect(levenshteinDistance('abc', '')).toBe(3);
    expect(levenshteinDistance('', 'xyz')).toBe(3);
  });

  it('should handle case sensitivity correctly', () => {
    expect(levenshteinDistance('hello', 'Hello')).toBe(1);
    expect(levenshteinDistance('WORLD', 'world')).toBe(5);
  });

  it('should handle special characters and numbers', () => {
    expect(levenshteinDistance('123', '1234')).toBe(1);
    expect(levenshteinDistance('hello!', 'hello?')).toBe(1);
    expect(levenshteinDistance('user@example.com', 'user@sample.com')).toBe(2);
  });

  it('should handle longer strings', () => {
    const str1 = 'the quick brown fox jumps over the lazy dog';
    const str2 = 'a quick brown fox jumped over a lazy dog';
    expect(levenshteinDistance(str1, str2)).toBe(8);
  });
});