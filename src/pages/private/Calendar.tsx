import '../../styles/Calendar.css'
import { useEffect, useState } from 'react'
import { useHabits } from '../../hooks/useHabits'
// import { type HabitType } from '../../types'
import {
  getCompletedDays,
  getMonthDays,
  monthNames,
} from '../../utils/calendar'

export default function Calendar() {
  const { habits, get } = useHabits()
  // const [habitToShow, setHabitToShow] = useState<HabitType | null>(null)
  const [completedDays, setCompletedDays] = useState<string[]>([])
  const currentDate = new Date()
  const monthDays = getMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  )

  useEffect(() => {
    if (habits.length > 0) {
      fetchHabit(habits[0].id)
    }
    console.log(monthDays)
  }, [])

  const fetchHabit = async (id: number | undefined) => {
    if (!id) return
    const result = await get(id?.toString())
    if (!result) return
    // setHabitToShow(result)
    setCompletedDays(
      getCompletedDays(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        result.completedDates
      )
    )
    console.log(result)
    console.log(completedDays)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetchHabit(Number(event.target.value))
  }

  return (
    <section className='calendar-section'>
      <div className='habit-selector'>
        <select name='habit' id='habit' onChange={handleSelect}>
          {habits.map((habit) => (
            <option key={habit.id} value={habit.id}>
              {habit.name}
            </option>
          ))}
        </select>
      </div>

      <div className='calendar-container'>
        <h2>{monthNames[currentDate.getMonth()]}</h2>

        <div className='calendar'>
          {Array.from({ length: monthDays }, (_, index) => index + 1).map(
            (day) => (
              <div
                className={`day-cell ${
                  completedDays.find((date) => Number(date) === day)
                    ? 'completed'
                    : ''
                }`}
                key={day}
              >
                <p>{day}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
