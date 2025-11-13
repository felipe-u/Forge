export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export function getMonthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export function getCompletedDays(
  year: number,
  month: number,
  completedDates: string[]
) {
  const currentYear = completedDates.filter(
    (date) => Number(date.slice(0, 4)) === year
  )
  const currentMonth = currentYear.filter(
    (date) => Number(date.slice(5, 7)) === month
  )
  const completedDays = currentMonth.map((date) => date.slice(8, 10))

  return completedDays
}

export function getFirstDayOfMonth(year: number, month: number) {
  const date = new Date(year, month, 1)
  return date.getDay()
}
