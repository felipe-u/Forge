export function getLocalDateString(date = new Date()): string {
  const offsetMs = date.getTimezoneOffset() * 60000
  const local = new Date(date.getTime() - offsetMs)
  return local.toISOString().slice(0, 10)
}

export function isSameLocalDay(
  dateA: Date | string,
  dateB: Date | string
): boolean {
  return (
    getLocalDateString(new Date(dateA)) === getLocalDateString(new Date(dateB))
  )
}

export function getStartOfLocalDay(date = new Date()): Date {
  const localStr = getLocalDateString(date)
  return new Date(localStr + 'T00:00:00')
}
