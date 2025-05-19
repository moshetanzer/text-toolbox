import { titleCase } from '../normalizers/string-case'
import { normalizePunctuationSpacing } from '../normalizers/whitespace'

function normalizeName(text: string): string {
  text = text.toLowerCase().trim()
  text = normalizePunctuationSpacing(text)
  text = titleCase(text)
  return text
}
function normalizeEmail(text: string): string {
  text = text.toLowerCase().trim()
  return text
}
function normalizeDate(text: string): string {
  text = text.trim()
  return text
}
function normalizeUrl(text: string): string {
  text = text.trim()
  return text
}

export {
  normalizeDate,
  normalizeEmail,
  normalizeName,
  normalizeUrl,
}
