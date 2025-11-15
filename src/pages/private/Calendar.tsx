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
import { useTheme } from '../../hooks/useTheme'

export default function Calendar() {
  const { habits, get } = useHabits()
  const { theme } = useTheme()
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
      setCurrentDate(new Date())
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
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    const isCompletedPrev = completedDays.includes((day - 1).toString())
    const isCompletedNext = completedDays.includes((day + 1).toString())

    const isStart = isCompleted && !isCompletedPrev
    const isEnd = isCompleted && !isCompletedNext
    const isMiddle = isCompleted && isCompletedPrev && isCompletedNext
    const isSingle = isCompleted && !isCompletedPrev && !isCompletedNext
    return (
      <div
        key={day}
        className={`day-cell 
         ${theme}
         ${isCompleted ? 'completed' : ''}
         ${isToday ? 'today' : ''} 
         ${isStart ? 'completed-start' : ''} 
         ${isMiddle ? 'completed-middle' : ''}
         ${isEnd ? 'completed-end' : ''}
         ${isSingle ? 'completed-single' : ''}`}
      >
        <p>{day}</p>
      </div>
    )
  })

  return (
    <section className='calendar-section'>
      <div className={`habit-selector ${theme}`}>
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
        <div className={`month-selector ${theme}`}>
          <div
            className={`month-selector-btn ${theme}`}
            onClick={() => changeMonth(-1)}
          >
            <PrevIcon />
          </div>
          <div className={`month ${theme}`}>
            <h2>{monthNames[month]}</h2>
            <p>{year}</p>
          </div>
          <div
            className={`month-selector-btn ${theme}`}
            onClick={() => changeMonth(1)}
          >
            <NextIcon />
          </div>
        </div>
        <div className={`calendar ${theme}`}>
          {DAYS.map((day) => (
            <div className={`day-cell day-name ${theme}`} key={day}>
              {day}
            </div>
          ))}
          {[...blanks, ...days]}
        </div>

        <button
          className={`today-btn ${theme}`}
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </button>
      </div>
    </section>
  )
}
