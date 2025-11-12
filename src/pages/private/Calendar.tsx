import '../../styles/Calendar.css'
import { useEffect, useState } from 'react'
import { useHabits } from '../../hooks/useHabits'
import {
  getCompletedDays,
  getFirstDayOfMonth,
  getMonthDays,
  monthNames,
} from '../../utils/calendar'
import { NextIcon, PrevIcon } from '../../components/Icons'
import { type HabitType } from '../../types'

export default function Calendar() {
  const { habits, get } = useHabits()
  const [habitToShow, setHabitToShow] = useState<HabitType>()
  const [completedDays, setCompletedDays] = useState<string[]>([])
  const [displayedDate, setDisplayedDate] = useState(new Date())

  useEffect(() => {
    if (habits.length > 0) {
      fetchHabit(habits[0].id)
    }
  }, [habits])

  const monthDays = getMonthDays(
    displayedDate.getFullYear(),
    displayedDate.getMonth()
  )
  const firstDayOfMonth = getFirstDayOfMonth(
    displayedDate.getFullYear(),
    displayedDate.getMonth()
  )

  const fetchHabit = async (id: number | undefined) => {
    if (!id) return
    const result = await get(id?.toString())
    if (!result) return
    setHabitToShow(result)
    setCompletedDays(
      getCompletedDays(
        displayedDate.getFullYear(),
        displayedDate.getMonth() + 1,
        result.completedDates
      )
    )
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetchHabit(Number(event.target.value))
  }

  const prevMonth = () => {
    const newDate = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth() - 1
    )
    setDisplayedDate(newDate)
    setCompletedDays(
      getCompletedDays(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        habitToShow?.completedDates as string[]
      )
    )
  }

  const nextMonth = () => {
    const newDate = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth() + 1
    )
    setDisplayedDate(newDate)
    setCompletedDays(
      getCompletedDays(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        habitToShow?.completedDates as string[]
      )
    )
  }

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`blank-${i}`} className='day-cell blank' />
  ))

  const days = Array.from({ length: monthDays }, (_, index) => {
    const day = index + 1
    const isCompleted = completedDays.find((date) => Number(date) === day)
    return (
      <div className={`day-cell ${isCompleted ? 'completed' : ''}`} key={day}>
        <p>{day}</p>
      </div>
    )
  })

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
        <div className='month-selector'>
          <div className='prev-month' onClick={prevMonth}>
            <PrevIcon />
          </div>
          <div className='month'>
            <h2>{monthNames[displayedDate.getMonth()]}</h2>
            <p>{displayedDate.getFullYear()}</p>
          </div>
          <div className='next-month' onClick={nextMonth}>
            <NextIcon />
          </div>
        </div>
        <div className='calendar'>
          <div>SU</div>
          <div>MO</div>
          <div>TU</div>
          <div>WE</div>
          <div>TH</div>
          <div>FR</div>
          <div>SA</div>
          {[...blanks, ...days]}
        </div>
      </div>
    </section>
  )
}
