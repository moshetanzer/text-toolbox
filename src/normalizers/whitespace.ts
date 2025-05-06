function removeDoubleSpaces(text: string): string {
  return text.replace(/\s{2,}/g, ' ').trim()
}
function removeAllSpaces(text: string): string {
  return text.replace(/\s+/g, '')
}
function removeLeadingSpaces(text: string): string {
  return text.split('\n').map(line => line.replace(/^\s+/, '')).join('\n')
}
function removeTrailingSpaces(text: string): string {
  return text.split('\n').map(line => line.replace(/\s+$/, '')).join('\n')
}
function removeWhitespaceAroundPunctuation(text: string): string {
  return text
    .replace(/\s+([.,!?:;])/g, '$1') // remove space before punctuation
    .replace(/([.,!?:;])(?=\S)/g, '$1 ') // ensure one space after punctuation
    .replace(/([!?.])(?:\s*\1)+/g, '$1$1$1') // collapse repeated punctuation (max 3 for !?.)
    .replace(/\s{2,}/g, ' ') // collapse multiple spaces
    .trim()
}

export {
  removeAllSpaces,
  removeDoubleSpaces,
  removeLeadingSpaces,
  removeTrailingSpaces,
  removeWhitespaceAroundPunctuation,
}
