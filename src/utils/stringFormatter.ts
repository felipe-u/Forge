export function formatString(max: number, text: string) {
  return text.length > max ? `${text.slice(0, max)}...` : text
}
