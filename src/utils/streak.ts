import { getLocalDateString } from "./date"

export function calculateStreak(completedDates: string[]): number {
  const dates = new Set(completedDates)
  let streak = 0
  const current = new Date()

  const today = getLocalDateString(current)
  const startDate = dates.has(today)
    ? new Date(current)
    : new Date(current.setDate(current.getDate() - 1))

  while (true) {
    const key = getLocalDateString(startDate)
    if (dates.has(key)) {
      streak++
      startDate.setDate(startDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}
