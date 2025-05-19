import { titleCase } from '../normalizers/string-case'
import { normalizePunctuationSpacing } from '../normalizers/whitespace'

function formatName(text: string): string {
  text = text.toLowerCase()
  text = normalizePunctuationSpacing(text)
  text = titleCase(text)
  return text
}

export { formatName }
