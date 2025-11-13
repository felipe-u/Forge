import '../../styles/Calendar.css'
import { useEffect, useState } from 'react'
import { useHabits } from '../../hooks/useHabits'
import {
  DAYS,
  getCompletedDays,
  getFirstDayOfMonth,
  getMonthDays,
  monthNames,
} from '../../utils/calendar'
import { NextIcon, PrevIcon } from '../../components/Icons'
import { type HabitType } from '../../types'

export default function Calendar() {
  const { habits, get } = useHabits()
  const [selectedHabit, setSelectedHabit] = useState<HabitType>()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const totalDays = getMonthDays(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const completedDays = selectedHabit
    ? getCompletedDays(year, month + 1, selectedHabit.completedDates)
    : []

  useEffect(() => {
    if (habits.length > 0 && !selectedHabit) {
      handleHabitSelect(habits[0].id as number)
    }
  }, [habits, selectedHabit])

  const handleHabitSelect = async (habitId: number) => {
    if (!habitId) return
    const habit = await get(habitId.toString())
    if (habit) {
      setSelectedHabit(habit)
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const habitId = Number(e.target.value)
    if (habitId) {
      handleHabitSelect(habitId)
    }
  }

  const changeMonth = (offset: number) => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + offset)
    })
  }

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`blank-${i}`} className='day-cell blank' />
  ))

  const days = Array.from({ length: totalDays }, (_, index) => {
    const day = index + 1
    const isCompleted = completedDays.includes(day.toString())

    return (
      <div key={day} className={`day-cell ${isCompleted ? 'completed' : ''}`}>
        <p>{day}</p>
      </div>
    )
  })

  return (
    <section className='calendar-section'>
      <div className='habit-selector'>
        <select
          name='habit'
          id='habit'
          value={selectedHabit?.id ?? ''}
          onChange={handleSelectChange}
          disabled={habits.length === 0}
        >
          {habits.length === 0 ? (
            <option value=''>No habits yet</option>
          ) : (
            habits.map((habit) => (
              <option key={habit.id} value={habit.id}>
                {habit.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className='calendar-container'>
        <div className='month-selector'>
          <div className='prev-month' onClick={() => changeMonth(-1)}>
            <PrevIcon />
          </div>
          <div className='month'>
            <h2>{monthNames[month]}</h2>
            <p>{year}</p>
          </div>
          <div className='next-month' onClick={() => changeMonth(1)}>
            <NextIcon />
          </div>
        </div>
        <div className='calendar'>
          {DAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
          {[...blanks, ...days]}
        </div>
      </div>
    </section>
  )
}
