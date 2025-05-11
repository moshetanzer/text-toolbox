export function isValidString(text: any): text is string {
  return typeof text === 'string' && text.trim().length > 0
}
