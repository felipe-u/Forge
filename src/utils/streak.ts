export function calculateStreak(completedDates: string[]): number {
  const dates = new Set(completedDates)
  let streak = 0
  const current = new Date()

  while (true) {
    const key = current.toISOString().slice(0, 10)

    if (dates.has(key)) {
      streak++
      current.setDate(current.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}
