import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { getLocalDateString } from '../utils/date'
import { formatString } from '../utils/stringFormatter'
import type { HabitType } from '../types'

interface Props {
  habit: HabitType
  onComplete: (id: number) => Promise<void>
  triggerSpark: () => void
}

export const Habit: React.FC<Props> = ({ habit, onComplete, triggerSpark }) => {
  const { theme } = useTheme()
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const today = getLocalDateString()
    if (habit.completedDates.includes(today)) setCompleted(true)
  }, [habit])

  const onCompleteHabit = async () => {
    if (completed) return
    await onComplete(habit.id as number)
    triggerSpark()
    setCompleted(true)
  }

  return (
    <div
      className={`habit-container ${theme} ${completed ? 'completed' : ''}`}
      onClick={onCompleteHabit}
    >
      <h3>{formatString(15, habit.name)}</h3>
      <div className='streak'>
        <p>🔥</p>
        <p>
          {habit.streak} day{habit.streak === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  )
}
