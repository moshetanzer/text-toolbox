const WHITE_SPACE_REGEX = /\p{White_Space}+/gu
interface NormalizePunctuationOptions {
  removeExtraSpacesAfterPunctuation?: boolean
}

function removeAllWhitespace(text: string): string {
  return text.replace(WHITE_SPACE_REGEX, '')
}
function removeLeadingWhitespace(text: string): string {
  return text.split('\n').map(line => line.replace(/^\s+/, '')).join('\n')
}
function removeTrailingWhitespace(text: string): string {
  return text.split('\n').map(line => line.replace(/\s+$/, '')).join('\n')
}
function normalizeWhitespace(text: string): string {
  return text.replace(WHITE_SPACE_REGEX, ' ').trim()
}
function removeExtraSpaces(text: string): string {
  return text.replace(/\s{2,}/g, ' ').trim()
}
function removeWhitespaceBeforePunctuation(text: string): string {
  return text.replace(/\s+(\p{P})/gu, '$1')
}
function ensureSpaceAfterPunctuation(text: string): string {
  return text.replace(/(\p{P})(?=\S)/gu, '$1 ')
}
function removeExtraSpacesAfterPunctuation(text: string): string {
  return text.replace(/(\p{P})\s{2,}/gu, '$1 ')
}
function normalizePunctuationSpacing(text: string, options?: NormalizePunctuationOptions): string {
  const removeExtra = options?.removeExtraSpacesAfterPunctuation !== false
  let result = ensureSpaceAfterPunctuation(text)
  result = removeWhitespaceBeforePunctuation(result)
  if (removeExtra) {
    result = removeExtraSpacesAfterPunctuation(result)
  }
  return result
}

export {
  ensureSpaceAfterPunctuation,
  normalizePunctuationSpacing,
  normalizeWhitespace,
  removeAllWhitespace,
  removeExtraSpaces,
  removeLeadingWhitespace,
  removeTrailingWhitespace,
  removeWhitespaceBeforePunctuation,
}
