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

export {
  removeAllSpaces,
  removeDoubleSpaces,
  removeLeadingSpaces,
  removeTrailingSpaces,
}
